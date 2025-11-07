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

    // Fetch repository data and contributors in parallel
    const [repoRes, contributorsRes] = await Promise.all([
      fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}`),
      fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contributors`)
    ])

    if (!repoRes.ok || !contributorsRes.ok) {
      throw new Error('Failed to fetch data from GitHub API')
    }

    const repoData = await repoRes.json()
    const contributorsData = await contributorsRes.json()

    // Filter out bot accounts and take max 8 contributors
    const filteredContributors = contributorsData
      .filter(contributor =>
        contributor.type !== 'Bot' &&
        !contributor.login.includes('[bot]')
      )
      .slice(0, 8)
      .map(contributor => ({
        id: contributor.id,
        login: contributor.login,
        avatar_url: contributor.avatar_url,
        html_url: contributor.html_url,
        contributions: contributor.contributions
      }))

    const githubStats = {
      stars: repoData.stargazers_count,
      forks: repoData.forks_count,
      watchers: repoData.watchers_count,
      contributors: filteredContributors,
      lastUpdated: new Date().toISOString()
    }

    // Write to JSON file
    const outputPath = join(__dirname, '../src/data/github-stats.json')
    writeFileSync(outputPath, JSON.stringify(githubStats, null, 2), 'utf-8')

    console.log('✓ GitHub stats updated successfully')
    console.log(`  - Stars: ${githubStats.stars}`)
    console.log(`  - Contributors: ${githubStats.contributors.length}`)
    console.log(`  - Last updated: ${githubStats.lastUpdated}`)
  } catch (error) {
    console.error('Error fetching GitHub data:', error.message)
    process.exit(1)
  }
}

fetchGitHubData()
