import { writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const REPO_OWNER = 'selfishprimate'
const REPO_NAME = 'curated-design-resources'

async function fetchGitHubData() {
  try {
    console.log('Fetching GitHub stats...')

    // Fetch repository data, contributors, and stargazers in parallel
    const [repoRes, contributorsRes, stargazersRes] = await Promise.all([
      fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}`),
      fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contributors`),
      fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/stargazers?per_page=30`, {
        headers: { 'Accept': 'application/vnd.github.v3.star+json' }
      })
    ])

    if (!repoRes.ok || !contributorsRes.ok || !stargazersRes.ok) {
      throw new Error('Failed to fetch data from GitHub API')
    }

    const repoData = await repoRes.json()
    const contributorsData = await contributorsRes.json()
    const stargazersData = await stargazersRes.json()

    // Filter out bot accounts from contributors
    const filteredContributors = contributorsData
      .filter(contributor =>
        contributor.type !== 'Bot' &&
        !contributor.login.includes('[bot]')
      )
      .map(contributor => ({
        id: contributor.id,
        login: contributor.login,
        avatar_url: contributor.avatar_url,
        html_url: contributor.html_url,
        contributions: contributor.contributions,
        type: 'contributor'
      }))

    // Filter out bot accounts from stargazers and format
    const filteredStargazers = stargazersData
      .filter(item =>
        item.user.type !== 'Bot' &&
        !item.user.login.includes('[bot]')
      )
      .map(item => ({
        id: item.user.id,
        login: item.user.login,
        avatar_url: item.user.avatar_url,
        html_url: item.user.html_url,
        starred_at: item.starred_at,
        type: 'stargazer'
      }))
      .sort((a, b) => new Date(b.starred_at) - new Date(a.starred_at)) // Sort by date, newest first

    // Combine and deduplicate (contributors take priority)
    const contributorIds = new Set(filteredContributors.map(c => c.id))
    const uniqueStargazers = filteredStargazers.filter(s => !contributorIds.has(s.id))

    // Combine all people (contributors first, then stargazers sorted by date)
    const allPeople = [...filteredContributors, ...uniqueStargazers]

    const githubStats = {
      stars: repoData.stargazers_count,
      forks: repoData.forks_count,
      watchers: repoData.watchers_count,
      people: allPeople, // All contributors and stargazers
      displayedPeople: allPeople.slice(0, 10), // First 10 for quick display
      totalPeople: allPeople.length,
      lastUpdated: new Date().toISOString()
    }

    // Write to JSON file
    const outputPath = join(__dirname, '../src/data/github-stats.json')
    writeFileSync(outputPath, JSON.stringify(githubStats, null, 2), 'utf-8')

    console.log('✓ GitHub stats updated successfully')
    console.log(`  - Stars: ${githubStats.stars}`)
    console.log(`  - Contributors: ${filteredContributors.length}`)
    console.log(`  - Stargazers: ${uniqueStargazers.length}`)
    console.log(`  - Total people: ${githubStats.totalPeople}`)
    console.log(`  - Last updated: ${githubStats.lastUpdated}`)
  } catch (error) {
    console.error('Error fetching GitHub data:', error.message)
    process.exit(1)
  }
}

fetchGitHubData()
