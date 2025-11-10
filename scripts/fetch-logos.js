import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import https from 'https'
import http from 'http'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Paths
const dataDir = path.join(__dirname, '../src/data')
const logosDir = path.join(__dirname, '../public/logos')
const categoriesIndexPath = path.join(dataDir, 'categories-index.json')

// Logo services (in order of preference)
const LOGO_SERVICES = [
  { name: 'Clearbit', url: (domain) => `https://logo.clearbit.com/${domain}?size=128` }
]

// Extract domain from URL
function getDomainFromUrl(url) {
  try {
    const urlObj = new URL(url)
    return urlObj.hostname.replace('www.', '')
  } catch {
    return null
  }
}

// Download image from URL
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http

    protocol.get(url, (response) => {
      // Check if response is successful and is an image
      if (response.statusCode === 200 && response.headers['content-type']?.startsWith('image/')) {
        const fileStream = fs.createWriteStream(filepath)
        response.pipe(fileStream)

        fileStream.on('finish', () => {
          fileStream.close()
          resolve(true)
        })

        fileStream.on('error', (err) => {
          fs.unlinkSync(filepath)
          reject(err)
        })
      } else {
        reject(new Error(`Failed: ${response.statusCode}`))
      }
    }).on('error', reject)
  })
}

// Try to fetch logo from multiple services
async function fetchLogo(domain, targetPath) {
  for (const service of LOGO_SERVICES) {
    const url = service.url(domain)

    try {
      await downloadImage(url, targetPath)
      return service.name
    } catch (error) {
      // Try next service
      continue
    }
  }

  return null
}

// Main function
async function main() {
  console.log('🎨 Fetching logos for all resources...\n')

  // Create logos directory if it doesn't exist
  if (!fs.existsSync(logosDir)) {
    fs.mkdirSync(logosDir, { recursive: true })
  }

  // Read categories index
  const categoriesIndex = JSON.parse(fs.readFileSync(categoriesIndexPath, 'utf-8'))

  // Collect all unique domains
  const domainSet = new Set()
  const domainToResources = new Map()

  for (const category of categoriesIndex) {
    const categoryDataPath = path.join(dataDir, `${category.id}.json`)
    const categoryData = JSON.parse(fs.readFileSync(categoryDataPath, 'utf-8'))

    for (const resource of categoryData.resources) {
      const domain = getDomainFromUrl(resource.link)
      if (domain) {
        domainSet.add(domain)
        if (!domainToResources.has(domain)) {
          domainToResources.set(domain, [])
        }
        domainToResources.get(domain).push(resource.title)
      }
    }
  }

  console.log(`Found ${domainSet.size} unique domains\n`)

  // Stats
  let successCount = 0
  let failedCount = 0
  let skippedCount = 0
  const failed = []

  // Fetch logos
  let index = 0
  for (const domain of domainSet) {
    index++
    const logoPath = path.join(logosDir, `${domain}.png`)
    const resources = domainToResources.get(domain)

    // Skip if already exists
    if (fs.existsSync(logoPath)) {
      console.log(`[${index}/${domainSet.size}] ⏭️  ${domain} - Already exists`)
      skippedCount++
      continue
    }

    // Try to fetch
    const service = await fetchLogo(domain, logoPath)

    if (service) {
      console.log(`[${index}/${domainSet.size}] ✓ ${domain} - ${service}`)
      successCount++
    } else {
      console.log(`[${index}/${domainSet.size}] ✗ ${domain} - Failed (will use initials)`)
      failedCount++
      failed.push({ domain, resources })
    }

    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 100))
  }

  // Summary
  console.log('\n' + '='.repeat(60))
  console.log('📊 Summary')
  console.log('='.repeat(60))
  console.log(`✓ Successfully fetched: ${successCount}`)
  console.log(`⏭️  Already existed:     ${skippedCount}`)
  console.log(`✗ Failed (initials):   ${failedCount}`)
  console.log(`📁 Total domains:       ${domainSet.size}`)

  if (failed.length > 0) {
    console.log('\n⚠️  Failed domains (will show initials):')
    failed.forEach(({ domain, resources }) => {
      console.log(`   - ${domain} (${resources[0]})`)
    })
  }

  console.log('\n✅ Logo fetching complete!')
  console.log(`   Logos saved to: public/logos/`)
}

main().catch(console.error)
