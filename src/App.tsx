import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useRef, useState } from 'react'

type Project = {
  id: string
  title: string
  description: string
  tags: string[]
  year: string
  role: string
  problem: string
  solution: string
  impact: string
  accent: string
  mark: string
  logo?: string
  logoFull?: boolean
  image?: string
}

const projects: Project[] = [
  {
    id: 'alphy',
    title: 'Alphy',
    description: 'seamless web3 trading across twitter, telegram & dex',
    tags: ['Trading', 'Perp', 'AI Signal'],
    year: '2026',
    role: 'product designer',
    problem: 'Crypto traders face fragmented workflows and high friction switching between social channels, alpha signals, and disconnected DEX interfaces.',
    solution: 'I designed an embedded Web3 layer integrating real-time AI signals, perp trading, and fast execution directly into platforms like Twitter, Telegram, Pump Fun, and Dexscreener.',
    impact: 'A robust, secure, and unified trading experience that makes complex on-chain execution effortless for both beginner and veteran crypto users.',
    accent: '#ffffff',
    mark: 'A',
    logo: '/alphy.png?v=3',
    image: 'https://res.cloudinary.com/jzcct3wg/image/upload/v1788579397/alphy01.webp',
  },
  {
    id: 'paywithcrypto',
    title: 'PaywithCrypto',
    description: 'seamless crypto payments & unified wallet experience',
    tags: ['Wallet', 'Payment'],
    year: '2026',
    role: 'lead product designer',
    problem: 'Users and merchants face high friction, confusing blockchain addresses, and fragmented fiat on/off ramp services.',
    solution: 'I designed a streamlined payment checkout, embedded smart wallet flows, and transparent on/off ramp interactions.',
    impact: 'Reduced transaction drop-off, clearer fee breakdowns, and a trustworthy payment flow for everyday crypto transactions.',
    accent: '#030b14',
    mark: 'P',
    logo: '/paywithcrypto.png?v=4',
    logoFull: true,
  },
  {
    id: 'alixpay',
    title: 'Alix Pay',
    description: 'decision support for people working with complex data',
    tags: ['Scan QR', 'Payment'],
    year: '2025',
    role: 'product designer',
    problem: 'Important signals were buried inside dense dashboards designed around data structures instead of user decisions.',
    solution: 'I reframed the experience around questions, alerts, and actionable summaries while preserving access to deeper analysis.',
    impact: 'Faster scanning, clearer priorities, and a product that better supported day-to-day decision making.',
    accent: '#0066ff',
    mark: 'A',
    logo: '/alixpay.png?v=4',
    logoFull: true,
  },
  {
    id: 'meyfi',
    title: 'MeyFi',
    description: 'a mobile service experience designed around trust',
    tags: ['RWA', 'Staking'],
    year: '2025',
    role: 'ux / ui designer',
    problem: 'Users did not know what would happen after submitting a request, creating anxiety and repeat support contacts.',
    solution: 'I redesigned the end-to-end status model, notifications, and service timeline to make progress visible at every stage.',
    impact: 'A more transparent journey with clearer expectations and fewer ambiguous states.',
    accent: '#0b0c0f',
    mark: 'M',
    logo: '/meyfi.png?v=2',
    logoFull: true,
  },
  {
    id: 'herbviet',
    title: 'HerbViet',
    description: 'human-centered workflows for an ai-assisted product',
    tags: ['Healthy', 'App'],
    year: '2025',
    role: 'product designer',
    problem: 'The first concept exposed too much system complexity and made users responsible for writing perfect prompts.',
    solution: 'I designed guided starting points, editable assumptions, and visible reasoning checkpoints to keep users in control.',
    impact: 'A more approachable workflow that focused on outcomes rather than prompt engineering.',
    accent: '#0b0c0f',
    mark: 'H',
    logo: '/herbviet.png?v=2',
    logoFull: true,
  },
  {
    id: 'aptossocialfi',
    title: 'AptosSocialFi',
    description: 'a design system built for scaling product teams',
    tags: ['Quest', 'Newsfeed', 'UX'],
    year: '2024',
    role: 'product designer',
    problem: 'Product surfaces had drifted apart as teams shipped quickly with inconsistent components and patterns.',
    solution: 'I audited the interface, defined foundations and reusable components, and documented contribution rules for the team.',
    impact: 'More consistent product quality and a faster path from design decisions to implementation.',
    accent: '#e6f723',
    mark: 'A',
    logo: '/aptossocialfi.png?v=2',
    logoFull: true,
  },
]

function BrandCard({ onHome }: { onHome: () => void }) {
  return (
    <button className="brand-card" onClick={onHome} aria-label="Show About me">
      <span className="brand-mark">
        <img src="/avatar.png?v=2" alt="About me" className="brand-logo-img" />
      </span>
      <span className="brand-name">About me</span>
      <span className="brand-copy">i design digital products that make complex things feel clear, useful and memorable.</span>
    </button>
  )
}

function WorkCard({ project, active, onClick }: { project: Project; active: boolean; onClick: () => void }) {
  return (
    <button
      className={`work-card ${active ? 'is-active' : ''}`}
      onClick={onClick}
      aria-pressed={active}
    >
      <span
        className="work-icon"
        style={{
          background: project.accent,
          border: project.logoFull ? 'none' : project.logo ? '1px solid #e8e8ea' : undefined,
        }}
      >
        {project.logo ? (
          <img
            src={project.logo}
            alt={project.title}
            className={`work-logo-img ${project.logoFull ? 'is-full' : ''}`}
          />
        ) : (
          project.mark
        )}
      </span>
      <span className="work-card-copy">
        <strong>{project.title}</strong>
        <span>{project.description}</span>
        <span className="tag-row">
          {project.tags.map((tag) => <em key={tag}>{tag}</em>)}
        </span>
      </span>
      <span className="work-arrow">↗</span>
    </button>
  )
}

function IntroPanel({ onGoWork }: { onGoWork?: () => void }) {
  return (
    <motion.div
      className="detail-content intro-panel"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.28 }}
    >
      <div className="intro-bg-video-wrapper" aria-hidden="true">
        <video
          ref={(el) => {
            if (el) {
              el.muted = true
              el.play().catch(() => {})
            }
          }}
          className="intro-bg-video"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          <source src="/bg_test.mp4" type="video/mp4" />
          <source src="https://res.cloudinary.com/jzcct3wg/video/upload/v1788536691/bg_test.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="intro-content-inner">
        <h1>
          Designing simple, <br className="intro-title-br" />useful experiences.
        </h1>
        <div className="intro-copy">
          <p>I’m Nguyen Van Tuan, a UI/UX Designer with 5+ years of experience.</p>
          <p>I enjoy turning ideas into simple, thoughtful digital experiences.</p>
        </div>
        <div className="contact-block">
          <span className="contact-supporting-text">If you'd like to say hi, feel free to send me a note at:</span>
          <a href="mailto:tuannvfpt18@gmail.com" className="contact-email">tuannvfpt18@gmail.com</a>
        </div>
        {onGoWork && (
          <div className="mobile-work-cta-wrap">
            <button className="mobile-work-cta" onClick={onGoWork}>
              View Selected Work ({projects.length}) →
            </button>
          </div>
        )}
      </div>
    </motion.div>
  )
}

function ProjectPanel({ project }: { project: Project }) {
  return (
    <motion.div
      className="detail-content project-panel"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <header className="project-editorial-card">
        <div className="editorial-col-title">
          <h1 className="editorial-title">{project.title}</h1>
        </div>

        <div className="editorial-col-desc">
          <p className="editorial-description">{project.description}</p>
        </div>

        <div className="editorial-col-tags">
          <div className="editorial-tags">
            {project.tags.map((tag) => (
              <span key={tag} className="bento-tag">
                <span className="bento-hash">#</span>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      {project.image && (
        <div className="project-illustration">
          <img
            src={project.image}
            alt={project.title}
            className="project-illustration-img"
          />
        </div>
      )}
    </motion.div>
  )
}

function App() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [mobileTab, setMobileTab] = useState<'work' | 'intro'>('work')
  const selectedProject = useMemo(
    () => projects.find((project) => project.id === selectedId) ?? null,
    [selectedId],
  )
  const year = new Date().getFullYear()

  const railRef = useRef<HTMLDivElement>(null)
  const detailRef = useRef<HTMLDivElement>(null)

  const handleHome = () => {
    setSelectedId(null)
    setMobileTab('intro')
    railRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
    detailRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSelectProject = (id: string) => {
    setSelectedId(id)
    detailRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleBack = () => {
    if (selectedId) {
      setSelectedId(null)
      setMobileTab('work')
    } else {
      setMobileTab('intro')
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <main className="viewport-shell">
      {/* Mobile Navigation Bar matching reference image */}
      <header className="mobile-header" aria-label="Mobile Navigation">
        {selectedProject ? (
          <>
            <button className="mobile-back-btn" onClick={handleBack} aria-label="Back to work">
              ← back
            </button>
            <h2 className="mobile-header-title">{selectedProject.title}</h2>
            <div className="mobile-header-spacer" />
          </>
        ) : mobileTab === 'work' ? (
          <>
            <button className="mobile-back-btn" onClick={() => setMobileTab('intro')} aria-label="Back to intro">
              ← back
            </button>
            <h2 className="mobile-header-title">Work</h2>
            <div className="mobile-header-spacer" />
          </>
        ) : (
          <>
            <span className="mobile-header-brand">About me</span>
            <div className="mobile-header-spacer" />
            <button className="mobile-nav-pill" onClick={() => setMobileTab('work')} aria-label="View work">
              Work ({projects.length}) →
            </button>
          </>
        )}
      </header>

      <section className="portfolio-layout portfolio-frame">
        <aside
          className={`sidebar work-rail ${selectedProject ? 'mobile-hidden' : ''} ${!selectedProject && mobileTab === 'intro' ? 'mobile-hidden' : ''}`}
        >
          <div className="sidebar-top">
            <div className="brand-card-desktop-only">
              <BrandCard onHome={handleHome} />
            </div>
            <div className="work-section-title">Projects</div>
          </div>
          <div
            ref={railRef}
            className="projects-scroll work-list"
            aria-label="Selected work"
          >
            {projects.map((project) => (
              <WorkCard
                key={project.id}
                project={project}
                active={selectedId === project.id}
                onClick={() => handleSelectProject(project.id)}
              />
            ))}
          </div>
        </aside>

        <section
          className={`details detail-panel ${!selectedProject && mobileTab === 'work' ? 'mobile-hidden' : ''}`}
          aria-live="polite"
        >
          <div ref={detailRef} className="details-scroll">
            <AnimatePresence mode="wait">
              {selectedProject ? (
                <ProjectPanel
                  key={selectedProject.id}
                  project={selectedProject}
                />
              ) : (
                <IntroPanel key="intro" onGoWork={() => setMobileTab('work')} />
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {!selectedProject && (
              <motion.footer
                key="site-footer"
                className="site-footer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <span className="footer-status">
                  <span className="status-dot" aria-hidden="true" />
                  Open for work
                </span>
                <span>© Tuan Nguyen {year}</span>
              </motion.footer>
            )}
          </AnimatePresence>
        </section>
      </section>
    </main>
  )
}

export default App
