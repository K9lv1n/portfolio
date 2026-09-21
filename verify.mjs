import fs from 'node:fs'
import vm from 'node:vm'

const required = [
  'index.html','server.mjs','src/app.js','src/data.js','src/styles.css',
  'assets/hero-workspace.jpg','assets/aeris-preview.jpg','assets/resume-lens-preview.jpg','assets/arcanevault-preview.jpg',
  'assets/Kalvin_Chin_Resume.pdf','assets/dell-innovatedash-badge.png','assets/noai-bronze-certificate.png','assets/noai-award-photo.jpg','assets/directors-list-certificate.png',
  'assets/logo-anthropic.jpg','assets/logo-dell.jpg','assets/logo-python-institute.jpg','assets/logo-ibm.jpg','assets/logo-snowflake.jpg','assets/logo-knime.jpg','assets/logo-aisingapore.jpg','assets/logo-databricks.jpg','assets/logo-datacamp.jpg','assets/logo-aws.jpg','assets/logo-huggingface.jpg',
  'vendor/react.production.min.js','vendor/react-dom.production.min.js'
]
const missing = required.filter((p) => !fs.existsSync(new URL(p, import.meta.url)))
if (missing.length) {
  console.error('Missing files:', missing.join(', '))
  process.exit(1)
}

const app = fs.readFileSync(new URL('src/app.js', import.meta.url), 'utf8')
const data = fs.readFileSync(new URL('src/data.js', import.meta.url), 'utf8')
const css = fs.readFileSync(new URL('src/styles.css', import.meta.url), 'utf8')

for (const token of ['ThemeToggle','ProjectCard','MiniTerminal','Skills','Certifications','Competition','Dock','ScrollTop']) {
  if (!app.includes(token)) throw new Error('Missing app feature: ' + token)
}
for (const token of ['CareSwap','Tailwind','Docker','OCR','Advanced Git','AWS Cloud Quest','SnowPro Associate','AI Agents Fundamentals','Introduction to Kubernetes','Introduction to Docker','MLOps Fundamentals','End-to-End Machine Learning','Generative AI Fundamentals','AI4I®','Basic Proficiency in KNIME','PCEP™','Web Development Fundamentals','User Experience Design Fundamentals','Dell InnovateDash 2026 Finalist','AI Fluency Framework & Foundations']) {
  if (!data.includes(token)) throw new Error('Missing data: ' + token)
}
for (const token of ['.dock','.skill-grid','.competition-card','.recognition-grid','.cert-grid','.certificate-logo','.scroll-top','data-theme']) {
  if (!css.includes(token)) throw new Error('Missing style feature: ' + token)
}

const careIndex = data.indexOf("title: 'CareSwap · Community Care Platform'")
const aerisIndex = data.indexOf("title: 'AERIS · Cold-Chain Control Tower'")
if (!(careIndex >= 0 && aerisIndex >= 0 && careIndex < aerisIndex)) throw new Error('Experience order is not CareSwap before AERIS')

const certStart = data.indexOf('certifications: [')
const firstAdvanced = data.indexOf("title: 'Advanced Git'", certStart)
const firstAws = data.indexOf("title: 'AWS Cloud Quest: Cloud Practitioner'", certStart)
const firstSnow = data.indexOf("title: 'SnowPro Associate: Platform Certification'", certStart)
if (!(firstAdvanced < firstAws && firstAws < firstSnow)) throw new Error('Featured certification order is incorrect')

const forbiddenReactApis = ['React.Fragment','React.useState','React.useEffect','React.useMemo','ReactDOM.createRoot']
const usedForbidden = forbiddenReactApis.filter((token) => app.includes(token))
if (usedForbidden.length) throw new Error('Bundled React compatibility issue: ' + usedForbidden.join(', '))

new vm.Script(app, { filename: 'src/app.js' })
new vm.Script(data, { filename: 'src/data.js' })

if (!data.includes("resume: '/assets/Kalvin_Chin_Resume.pdf'")) throw new Error('Resume asset is not wired into portfolio data')
if (!app.includes("download:'Kalvin_Chin_Resume.pdf'")) throw new Error('Resume download attribute is missing')
if (!fs.readFileSync(new URL('server.mjs', import.meta.url), 'utf8').includes("'.pdf': 'application/pdf'")) throw new Error('PDF MIME type missing from server')

if (!data.includes('Hermes') || !data.includes('Telegram Email Assistant') || !data.includes('hermes-telegram-email-bot')) throw new Error('Missing Hermes project data')
if (!css.includes('grid-template-columns:repeat(2,1fr)')) throw new Error('Project grid is not configured for four-card layout')


if (data.includes("href: '#'")) throw new Error('Dead project href placeholders are still present')
if (!data.includes("access: 'Public GitHub repository'") || !data.includes("repo: 'https://github.com/K9lv1n/hermes-telegram-email-bot'")) throw new Error('Hermes public repository metadata missing')
if (!app.includes("className:'project-access'")) throw new Error('Standardized project access footer missing')

console.log('Verification passed: all 16 credentials, issuer logos, updated skills, CareSwap-before-AERIS experience order, project stack updates, recognition assets, dock, theme and back-to-top control are present.')
