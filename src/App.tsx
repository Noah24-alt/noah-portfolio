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
    logo: '/paywithcrypto.png?v=2',
    logoFull: true,
  },
  {
    id: 'northstar',
    title: 'northstar',
    description: 'decision support for people working with complex data',
    tags: ['data', 'dashboard', 'ux'],
    year: '2025',
    role: 'product designer',
    problem: 'Important signals were buried inside dense dashboards designed around data structures instead of user decisions.',
    solution: 'I reframed the experience around questions, alerts, and actionable summaries while preserving access to deeper analysis.',
    impact: 'Faster scanning, clearer priorities, and a product that better supported day-to-day decision making.',
    accent: '#FF7C55',
    mark: 'N',
  },
  {
    id: 'relay',
    title: 'relay mobile',
    description: 'a mobile service experience designed around trust',
    tags: ['mobile', 'service', 'research'],
    year: '2025',
    role: 'ux / ui designer',
    problem: 'Users did not know what would happen after submitting a request, creating anxiety and repeat support contacts.',
    solution: 'I redesigned the end-to-end status model, notifications, and service timeline to make progress visible at every stage.',
    impact: 'A more transparent journey with clearer expectations and fewer ambiguous states.',
    accent: '#56C8FF',
    mark: 'R',
  },
  {
    id: 'kinetic',
    title: 'kinetic ai',
    description: 'human-centered workflows for an ai-assisted product',
    tags: ['ai', 'interaction', 'prototype'],
    year: '2025',
    role: 'product designer',
    problem: 'The first concept exposed too much system complexity and made users responsible for writing perfect prompts.',
    solution: 'I designed guided starting points, editable assumptions, and visible reasoning checkpoints to keep users in control.',
    impact: 'A more approachable workflow that focused on outcomes rather than prompt engineering.',
    accent: '#FF9DD4',
    mark: 'K',
  },
  {
    id: 'foundation',
    title: 'foundation',
    description: 'a design system built for scaling product teams',
    tags: ['design system', 'ui', 'scale'],
    year: '2024',
    role: 'product designer',
    problem: 'Product surfaces had drifted apart as teams shipped quickly with inconsistent components and patterns.',
    solution: 'I audited the interface, defined foundations and reusable components, and documented contribution rules for the team.',
    impact: 'More consistent product quality and a faster path from design decisions to implementation.',
    accent: '#65E3AA',
    mark: 'D',
  },
]

function BrandCard({ onHome }: { onHome: () => void }) {
  return (
    <button className="brand-card" onClick={onHome} aria-label="Show Noah introduction">
      <span className="brand-mark"><i /></span>
      <span className="brand-name">noah design</span>
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
          <source src="https://res.cloudinary.com/jzcct3wg/video/upload/v1788536691/bg_test.mp4" type="video/mp4" />
          <source src="/bg_test.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="intro-content-inner">
        <h1>designing useful<br />digital products</h1>
        <div className="intro-copy">
          <p>i work across product strategy, ux and interface design to turn ambiguous problems into focused digital experiences.</p>
          <p>my approach connects user needs, business context and thoughtful visual systems — from the first question to the final interaction.</p>
        </div>
        <div className="contact-block">
          <a href="mailto:hello@noah.design">hello@noah.design</a>
          <span>— tell me what you are building</span>
        </div>
        <div className="socials-block">
          <span className="socials-label">Connect on socials</span>
          <div className="socials-links">
            <a
              href="https://www.behance.net"
              target="_blank"
              rel="noreferrer"
              className="social-btn"
              aria-label="Behance"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M7.799 13.901c.421 0 .782-.047 1.082-.142.3-.095.545-.23.734-.406.19-.175.326-.388.41-.639.085-.252.127-.534.127-.847 0-.399-.074-.73-.223-.993a1.95 1.95 0 0 0-.58-.667c-.237-.168-.507-.291-.809-.37-.302-.078-.619-.117-.951-.117H4.514v4.181h3.285zm-.316-5.467c.307 0 .584-.04.832-.121.248-.08.455-.195.62-.345.166-.15.29-.331.373-.545.083-.214.125-.456.125-.726 0-.555-.166-.975-.499-1.26-.332-.284-.79-.427-1.374-.427H4.514v3.424h2.969zM8.01 2H2v20h6.666c1.077 0 2.016-.145 2.817-.435.8-.29 1.455-.705 1.965-1.246.51-.54.885-1.196 1.126-1.968.24-.772.361-1.638.361-2.597 0-.91-.122-1.706-.367-2.387a5.534 5.534 0 0 0-1.042-1.802 5.093 5.093 0 0 0-1.62-1.22c-.642-.298-1.385-.498-2.228-.6.549-.133 1.036-.339 1.46-.618.425-.28.777-.624 1.056-1.033.28-.409.489-.876.627-1.4.138-.524.208-1.096.208-1.716 0-.825-.125-1.572-.375-2.242a5.418 5.418 0 0 0-1.085-1.77 5.764 5.764 0 0 0-1.715-1.189C9.972 2.146 9.062 2 8.01 2zm8.799 6.223h5.795v1.654H16.81V8.223zm3.178 3.518c-.896 0-1.673.153-2.332.46-.659.306-1.206.73-1.64 1.272-.435.542-.756 1.183-.965 1.924-.208.74-.313 1.545-.313 2.414 0 .914.108 1.745.323 2.493.216.748.54 1.385.974 1.91.433.525.977.925 1.63 1.2.653.276 1.41.414 2.27.414.939 0 1.761-.157 2.466-.47.705-.314 1.282-.767 1.73-1.36l-1.92-1.396c-.307.391-.659.68-1.056.867-.397.186-.856.28-1.377.28-.68 0-1.237-.167-1.67-.5-.434-.333-.71-.818-.83-1.455h7.108c.045-.285.068-.587.068-.906 0-.853-.105-1.644-.316-2.373a5.044 5.044 0 0 0-.934-1.892 4.67 4.67 0 0 0-1.564-1.246c-.633-.284-1.388-.426-2.266-.426zm-2.036 4.316c.097-.565.347-1.01.75-1.336.404-.325.932-.488 1.586-.488.608 0 1.104.156 1.488.468.384.312.628.749.732 1.312l-4.556.044z" />
              </svg>
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noreferrer"
              className="social-btn"
              aria-label="Facebook"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              href="https://dribbble.com"
              target="_blank"
              rel="noreferrer"
              className="social-btn"
              aria-label="Dribbble"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm9.849 11.233c-.29-.028-2.613-.244-5.244.595-.145-.333-.298-.673-.459-1.02-.387-.83-.82-1.684-1.3-2.529 2.91-1.22 4.095-2.82 4.175-2.932 1.71 1.624 2.784 3.87 2.828 6.366v-.48zm-4.708-7.554c-.113.14-1.272 1.545-4.084 2.666-1.516-2.775-3.15-5.11-3.298-5.32 1.3-.435 2.7-.675 4.15-.675 1.18 0 2.31.164 3.232.47zm-9.014-2.12c.16.224 1.77 2.524 3.284 5.275-3.87 1.112-7.534.985-7.854.97A9.878 9.878 0 0 1 8.127 1.56zM2.15 12.001c0-.056 0-.112.002-.168.324.01 4.542.138 8.783-1.127.172.36.335.717.487 1.07-.37.106-.75.228-1.138.363-4.382 1.523-6.626 5.253-6.734 5.437A9.88 9.88 0 0 1 2.15 12zm3.328 6.945c.148-.224 2.115-3.486 6.368-5.014.283-.102.56-.192.831-.274.773 2.163 1.157 4.343 1.258 4.962a9.92 9.92 0 0 1-8.457.326zm10.228-.967c-.126-.643-.526-2.74-1.298-4.836 2.39-.77 4.52-.58 4.807-.552a9.914 9.914 0 0 1-3.509 5.388z" />
              </svg>
            </a>
          </div>
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
      <div className="project-bento-grid">
        {/* Tile 1: Hero (Title & Lead) */}
        <div className="bento-tile bento-hero">
          <div className="bento-eyebrow">
            <span>selected work / {project.year}</span>
          </div>
          <h1 className="bento-title">{project.title}</h1>
          <p className="bento-lead">{project.description}</p>
        </div>

        {/* Tile 2: Visual Identity / Logo */}
        <div className="bento-tile bento-visual">
          <div
            className="bento-visual-inner"
            style={{
              background: project.logoFull
                ? 'transparent'
                : project.logo
                ? '#ffffff'
                : project.accent,
              border: project.logo && !project.logoFull ? '1px solid #e8e8e8' : 'none',
            }}
          >
            {project.logo ? (
              <img
                src={project.logo}
                alt={project.title}
                className={`bento-logo-img ${project.logoFull ? 'is-full' : ''}`}
              />
            ) : (
              <span className="bento-mark" style={{ color: '#fff' }}>
                {project.mark}
              </span>
            )}
          </div>
        </div>

        {/* Tile 3: Role */}
        <div className="bento-tile bento-meta">
          <span className="bento-label">role</span>
          <strong className="bento-value">{project.role}</strong>
        </div>

        {/* Tile 4: Year */}
        <div className="bento-tile bento-meta">
          <span className="bento-label">year</span>
          <strong className="bento-value">{project.year}</strong>
        </div>

        {/* Tile 5: Scope */}
        <div className="bento-tile bento-scope">
          <span className="bento-label">scope</span>
          <div className="bento-tags">
            {project.tags.map((tag) => (
              <span key={tag} className="bento-tag">
                <span className="bento-hash">#</span>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

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
  const detailRef = useRef<HTMLElement>(null)

  const handleHome = () => {
    setSelectedId(null)
    setMobileTab('intro')
    railRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
    detailRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
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
            <span className="mobile-header-brand">noah design</span>
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
          ref={detailRef}
          className={`details detail-panel ${!selectedProject && mobileTab === 'work' ? 'mobile-hidden' : ''}`}
          aria-live="polite"
        >
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

          <footer className="site-footer">
            <span>◉ Ho Chi Minh City</span>
            <a href="mailto:hello@noah.design">↗ hello@noah.design</a>
            <span>© noah {year} — product design with clarity</span>
          </footer>
        </section>
      </section>
    </main>
  )
}

export default App
