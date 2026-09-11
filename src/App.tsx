import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import { FadeUpReveal, HighlightedWord, MaskedLine, PAGE_EXIT_TRANSITION, ScrollReveal } from './components/TextReveal'
import { StickerPlayground } from './components/StickerPlayground'
import { getImageDimensions, getOptimizedImageUrl, getResponsiveSrcSet, PROJECT_IMAGE_SIZES } from './utils/image'
import { usePortfolioRouter } from './router'

type Project = {
  id: string
  slug: string
  aliases?: string[]
  title: string
  category?: string
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
  images?: string[]
  mobileThumbnail?: string
  platform?: string
  status?: string
  hidden?: boolean
}

const projects: Project[] = [
  {
    id: 'alphy',
    slug: 'alphy',
    title: 'Alphy',
    category: 'Crypto social trading',
    description: 'Connecting social insights with crypto trading.',
    tags: ['Trading', 'Perp', 'AI Signal'],
    year: '2026',
    role: 'Product Designer',
    platform: 'Web & Extension',
    status: 'Launched',
    problem: 'Crypto traders face fragmented workflows and high friction switching between social channels, alpha signals, and disconnected DEX interfaces.',
    solution: 'I designed an embedded Web3 layer integrating real-time AI signals, perp trading, and fast execution directly into platforms like Twitter, Telegram, Pump Fun, and Dexscreener.',
    impact: 'A robust, secure, and unified trading experience that makes complex on-chain execution effortless for both beginner and veteran crypto users.',
    accent: '#ffffff',
    mark: 'A',
    logo: '/alphy.png?v=3',
    image: 'https://res.cloudinary.com/jzcct3wg/image/upload/v1788842950/Alphy.webp',
    mobileThumbnail: 'https://res.cloudinary.com/jzcct3wg/image/upload/v1789116842/phone_Alphy.webp',
    images: [
      'https://res.cloudinary.com/jzcct3wg/image/upload/v1788842950/Alphy.webp',
      'https://res.cloudinary.com/jzcct3wg/image/upload/v1788844336/Alphy_2.webp',
    ],
  },
  {
    id: 'paywithcrypto',
    slug: 'pay-with-crypto',
    aliases: ['paywithcrypto'],
    title: 'PaywithCrypto',
    category: 'Everyday crypto payments',
    description: 'Bringing crypto into everyday payments.',
    tags: ['Wallet', 'Payment'],
    year: '2026',
    role: 'Design Lead',
    platform: 'iOS & Android',
    status: 'Launched',
    problem: 'Users and merchants face high friction, confusing blockchain addresses, and fragmented fiat on/off ramp services.',
    solution: 'I designed a streamlined payment checkout, embedded smart wallet flows, and transparent on/off ramp interactions.',
    impact: 'Reduced transaction drop-off, clearer fee breakdowns, and a trustworthy payment flow for everyday crypto transactions.',
    accent: '#030b14',
    mark: 'P',
    logo: '/paywithcrypto.png?v=4',
    logoFull: true,
    image: 'https://res.cloudinary.com/jzcct3wg/image/upload/v1788841377/PWC.webp',
    mobileThumbnail: 'https://res.cloudinary.com/jzcct3wg/image/upload/v1789116844/phone_PWC.webp',
    images: [
      'https://res.cloudinary.com/jzcct3wg/image/upload/v1788841377/PWC.webp',
      'https://res.cloudinary.com/jzcct3wg/image/upload/v1788841520/PWC_2.webp',
    ],
  },
  {
    id: 'alixpay',
    slug: 'alix-pay',
    aliases: ['alixpay'],
    title: 'Alix Pay',
    category: 'Seamless QR payments',
    description: 'Seamless crypto payments anytime, anywhere.',
    tags: ['Scan QR', 'Payment'],
    year: '2025',
    role: 'Product Designer',
    platform: 'Mini-App',
    status: 'Live',
    problem: 'Important signals were buried inside dense dashboards designed around data structures instead of user decisions.',
    solution: 'I reframed the experience around questions, alerts, and actionable summaries while preserving access to deeper analysis.',
    impact: 'Faster scanning, clearer priorities, and a product that better supported day-to-day decision making.',
    accent: '#0066ff',
    mark: 'A',
    logo: '/alixpay.png?v=4',
    logoFull: true,
    image: 'https://res.cloudinary.com/jzcct3wg/image/upload/v1788849676/Alix.webp',
    mobileThumbnail: 'https://res.cloudinary.com/jzcct3wg/image/upload/v1789116843/phone_Alix.webp',
    images: [
      'https://res.cloudinary.com/jzcct3wg/image/upload/v1788849676/Alix.webp',
      'https://res.cloudinary.com/jzcct3wg/image/upload/v1788849667/Alix_2.webp',
    ],
  },
  {
    id: 'meyfi',
    slug: 'mey-fi',
    aliases: ['meyfi'],
    title: 'MeyFi',
    description: 'a mobile service experience designed around trust',
    tags: ['RWA', 'Staking'],
    year: '2025',
    role: 'UX / UI Designer',
    platform: 'iOS & Android',
    status: 'Launched',
    hidden: true,
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
    slug: 'herb-viet',
    aliases: ['herbviet'],
    title: 'HerbViet',
    description: 'human-centered workflows for an ai-assisted product',
    tags: ['Healthy', 'App'],
    year: '2025',
    role: 'Product Designer',
    platform: 'iOS & Android',
    status: 'Launched',
    hidden: true,
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
    slug: 'aptos-social-fi',
    aliases: ['aptossocialfi'],
    title: 'AptosSocialFi',
    description: 'a design system built for scaling product teams',
    tags: ['Quest', 'Newsfeed', 'UX'],
    year: '2024',
    role: 'Product Designer',
    platform: 'Web & Mobile',
    status: 'Launched',
    hidden: true,
    problem: 'Product surfaces had drifted apart as teams shipped quickly with inconsistent components and patterns.',
    solution: 'I audited the interface, defined foundations and reusable components, and documented contribution rules for the team.',
    impact: 'More consistent product quality and a faster path from design decisions to implementation.',
    accent: '#e6f723',
    mark: 'A',
    logo: '/aptossocialfi.png?v=2',
    logoFull: true,
  },
]

function findProjectBySlug(slug: string): Project | undefined {
  const s = slug.toLowerCase()
  return projects.find((p) => p.slug === s || p.id === s || p.aliases?.includes(s))
}

function BrandCard({ onHome }: { onHome: () => void }) {
  return (
    <button className="brand-card" onClick={onHome} aria-label="Show About me">
      <span className="brand-mark">
        <img
          src="/avatar.png?v=3"
          alt="About me"
          className="brand-logo-img"
          width={44}
          height={44}
          loading="eager"
          {...{ fetchpriority: 'high' }}
          decoding="async"
        />
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
            width={40}
            height={40}
            loading="eager"
            decoding="async"
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

function MobileProjectCard({
  project,
  index,
  onSelect,
}: {
  project: Project
  index: number
  onSelect: () => void
}) {
  const [isLoaded, setIsLoaded] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)
  const heroImage = project.mobileThumbnail || project.image || project.images?.[0]
  const optimizedSrc = heroImage ? getOptimizedImageUrl(heroImage, 800) : ''
  const srcSet = heroImage ? getResponsiveSrcSet(heroImage, [400, 600, 800]) : undefined

  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true)
    }
  }, [])

  return (
    <article className="mobile-project-card" onClick={onSelect}>
      <span className="mobile-project-eyebrow">0{index + 1}</span>
      {heroImage && (
        <div className={`mobile-project-img-wrap ${isLoaded ? 'is-loaded' : ''}`}>
          <img
            ref={imgRef}
            src={optimizedSrc}
            srcSet={srcSet}
            sizes="(max-width: 768px) 100vw, 800px"
            alt={project.title}
            className="mobile-project-image"
            loading="lazy"
            decoding="async"
            onLoad={() => setIsLoaded(true)}
          />
        </div>
      )}
      <h3 className="mobile-project-title">{project.title}</h3>
      <p className="mobile-project-desc">{project.description}</p>
      <div className="mobile-project-tags">
        {project.tags.map((tag) => (
          <span key={tag} className="mobile-project-tag">{tag}</span>
        ))}
      </div>
      <span className="mobile-project-cta">View project ↗</span>
    </article>
  )
}

function IntroPanel({
  onGoWork,
  workCount,
  projectsList,
  onSelectProject,
}: {
  onGoWork?: () => void
  workCount?: number
  projectsList?: Project[]
  onSelectProject?: (project: Project) => void
}) {
  const [videoLoaded, setVideoLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [copied, setCopied] = useState(false)

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault()
    navigator.clipboard.writeText('hello@tuans.work')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true
      videoRef.current.play().catch(() => {})
      if (videoRef.current.readyState >= 3) {
        setVideoLoaded(true)
      }
    }
  }, [])

  return (
    <motion.div
      className="detail-content intro-panel"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={PAGE_EXIT_TRANSITION}
    >
      <StickerPlayground>
        <div
          className={`intro-skeleton skeleton-shimmer ${videoLoaded ? 'is-hidden' : ''}`}
          aria-hidden="true"
        />
        <video
          ref={videoRef}
          className={`intro-bg-video ${videoLoaded ? 'is-loaded' : ''}`}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="https://res.cloudinary.com/jzcct3wg/video/upload/so_0,f_auto,q_80,w_1200/v1788859893/Mascot_working_at_desk_1080p_202609081630.jpg"
          onLoadedData={() => setVideoLoaded(true)}
          onPlaying={() => setVideoLoaded(true)}
          onCanPlay={() => setVideoLoaded(true)}
        >
          <source src="https://res.cloudinary.com/jzcct3wg/video/upload/v1788859893/Mascot_working_at_desk_1080p_202609081630.mp4" type="video/mp4" />
        </video>
      </StickerPlayground>

      <div className="intro-content-inner">
        <h1>
          <MaskedLine delay={0} yOffset={24} duration={0.8}>Designing <span className="heading-highlight" style={{ color: '#485CE3', fontStyle: 'italic', fontFamily: "'Caveat', cursive" }}>simple</span></MaskedLine>
          <MaskedLine delay={0.08} yOffset={24} duration={0.8}>useful experiences.</MaskedLine>
        </h1>
        <FadeUpReveal delay={0.2} yOffset={16} duration={0.6} className="intro-copy">
          <p>I’m Nguyen Van Tuan, a UI/UX Designer with 5+ years of experience. I enjoy turning complex ideas into simple, useful digital experiences.</p>
        </FadeUpReveal>
        <FadeUpReveal delay={0.28} yOffset={16} duration={0.6} className="contact-block">
          <span className="contact-supporting-text">If you'd like to say hi, feel free to send me a note at:</span>
          <div className="contact-email-group">
            <a href="mailto:hello@tuans.work" className="contact-email">hello@tuans.work</a>
            <button
              className={`copy-email-btn ${copied ? 'success' : ''}`}
              onClick={handleCopy}
              aria-label="Copy email address"
            >
              {copied ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              )}
            </button>
          </div>
        </FadeUpReveal>
        <FadeUpReveal delay={0.36} yOffset={16} duration={0.6} className="desktop-resume-btn-wrap">
          <a
            href="https://drive.google.com/file/d/1vNuQqXcLpxhTXmKPb1JN6oN1sbPgbf-Y/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="resume-btn"
          >
            Resume ↗
          </a>
        </FadeUpReveal>
        {onGoWork && (
          <div className="mobile-projects-section">
            <FadeUpReveal delay={0.36} yOffset={16} duration={0.6}>
              <h2 className="mobile-projects-heading">Selected Work</h2>
            </FadeUpReveal>
            {(projectsList ?? projects).filter(p => !p.hidden).slice(0, 3).map((project, idx) => (
              <ScrollReveal key={project.id} delay={0.1} yOffset={16}>
                <MobileProjectCard
                  project={project}
                  index={idx}
                  onSelect={() => onSelectProject?.(project)}
                />
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

interface ProjectImageWithSkeletonProps {
  imgSrc: string
  index: number
  total: number
  projectTitle: string
}

function ProjectImageWithSkeleton({ imgSrc, index, total, projectTitle }: ProjectImageWithSkeletonProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)
  const isFirst = index === 0
  const isLast = index === total - 1
  const isSingle = total === 1
  const positionClass = isSingle ? 'is-single' : isFirst ? 'is-first' : isLast ? 'is-last' : 'is-middle'

  const dims = useMemo(() => getImageDimensions(imgSrc), [imgSrc])
  const optimizedSrc = useMemo(() => getOptimizedImageUrl(imgSrc, 1600), [imgSrc])
  const srcSet = useMemo(() => getResponsiveSrcSet(imgSrc), [imgSrc])

  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true)
    }
  }, [imgSrc])

  return (
    <ScrollReveal
      delay={index === 0 ? 0.28 : 0.08}
      duration={0.7}
      yOffset={16}
    >
      <div
        className={`skeleton-image-wrapper ${positionClass} ${isLoaded ? 'is-loaded' : ''}`}
        style={{
          aspectRatio: dims?.aspectRatio,
        }}
      >
        <div
          className={`skeleton-placeholder skeleton-shimmer ${positionClass} ${isLoaded ? 'is-hidden' : ''}`}
          aria-hidden="true"
        />
        <img
          ref={imgRef}
          src={optimizedSrc}
          srcSet={srcSet}
          sizes={srcSet ? PROJECT_IMAGE_SIZES : undefined}
          alt={`${projectTitle} showcase ${index + 1}`}
          className={`project-illustration-img ${positionClass} ${isLoaded ? 'is-loaded' : ''}`}
          width={dims?.width}
          height={dims?.height}
          loading={isFirst ? 'eager' : 'lazy'}
          {...{ fetchpriority: isFirst ? 'high' : 'low' }}
          decoding={isFirst ? 'sync' : 'async'}
          onLoad={() => setIsLoaded(true)}
        />
      </div>
    </ScrollReveal>
  )
}

function ProjectPanel({ project }: { project: Project }) {
  const projectImages = project.images ?? (project.image ? [project.image] : [])

  return (
    <motion.div
      className="detail-content project-panel"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={PAGE_EXIT_TRANSITION}
    >
      <header className="project-editorial-card">
        <div className="editorial-col-title">
          <h1 className="editorial-title">
            <MaskedLine delay={0.05}>{project.title}</MaskedLine>
          </h1>
        </div>

        <div className="editorial-col-desc">
          <div className="project-metadata-grid" aria-label="Project details">
            <FadeUpReveal delay={0.12}>
              <div className="metadata-item">
                <span className="metadata-label">Role</span>
                <span className="metadata-value">{project.role || 'Design Lead'}</span>
              </div>
            </FadeUpReveal>
            <FadeUpReveal delay={0.18}>
              <div className="metadata-item">
                <span className="metadata-label">Platform</span>
                <span className="metadata-value">{project.platform || 'iOS & Android'}</span>
              </div>
            </FadeUpReveal>
            <FadeUpReveal delay={0.24}>
              <div className="metadata-item">
                <span className="metadata-label">Status</span>
                <span className="metadata-value">{project.status || 'Launched'}</span>
              </div>
            </FadeUpReveal>
          </div>
        </div>

        <FadeUpReveal delay={0.3} className="editorial-col-tags">
          <div className="editorial-tags">
            {project.tags.map((tag) => (
              <span key={tag} className="bento-tag">
                <span className="bento-hash">#</span>
                {tag}
              </span>
            ))}
          </div>
        </FadeUpReveal>
      </header>

      {projectImages.length > 0 && (
        <div className="project-illustration">
          {projectImages.map((imgSrc, index) => (
            <ProjectImageWithSkeleton
              key={imgSrc}
              imgSrc={imgSrc}
              index={index}
              total={projectImages.length}
              projectTitle={project.title}
            />
          ))}
        </div>
      )}
    </motion.div>
  )
}

function getHoChiMinhTime(): string {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Ho_Chi_Minh',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(new Date())
  const hour = parts.find((p) => p.type === 'hour')?.value || '00'
  const minute = parts.find((p) => p.type === 'minute')?.value || '00'
  return `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`
}

function HoChiMinhTime() {
  const [time, setTime] = useState(getHoChiMinhTime)

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>
    const update = () => setTime(getHoChiMinhTime())

    // Update when returning to tab from background
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        update()
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    // Synchronize to the next full minute boundary, then update every 60 seconds
    const now = new Date()
    const msUntilNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds() + 50
    const timeoutId = setTimeout(() => {
      update()
      intervalId = setInterval(update, 60000)
    }, Math.max(msUntilNextMinute, 1000))

    return () => {
      clearTimeout(timeoutId)
      if (intervalId) clearInterval(intervalId)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  return <span>Ho Chi Minh · {time}</span>
}

function App() {
  const router = usePortfolioRouter()
  const visibleProjects = useMemo(
    () => projects.filter((project) => !project.hidden),
    [],
  )

  const selectedProject = useMemo(() => {
    if (router.route.type === 'project' && router.route.slug) {
      return findProjectBySlug(router.route.slug) ?? null
    }
    return null
  }, [router.route])

  // Gracefully fallback to /work if invalid project slug is visited
  useEffect(() => {
    if (router.route.type === 'project' && router.route.slug && !selectedProject) {
      router.navigate('/work', { replace: true })
    }
  }, [router.route, selectedProject, router])

  const isMobileWork = router.route.type === 'work'
  const mobileTab: 'work' | 'intro' = isMobileWork || selectedProject ? 'work' : 'intro'

  const railRef = useRef<HTMLDivElement>(null)
  const detailRef = useRef<HTMLDivElement>(null)

  // Scroll restoration: restore saved scroll position upon returning to work list / home
  useEffect(() => {
    if (!selectedProject) {
      const saved = router.getSavedScroll()
      if (saved.railScroll !== undefined && railRef.current) {
        railRef.current.scrollTop = saved.railScroll
      }
      if (saved.windowScroll !== undefined) {
        window.scrollTo({ top: saved.windowScroll, behavior: 'auto' })
      }
    }
  }, [selectedProject, router])

  const handleHome = () => {
    router.navigate('/', {
      railScroll: railRef.current?.scrollTop,
      windowScroll: window.scrollY,
    })
    railRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
    detailRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSelectProject = (project: Project) => {
    router.navigate(`/work/${project.slug}`, {
      railScroll: railRef.current?.scrollTop,
      windowScroll: window.scrollY,
    })
    detailRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleGoWork = () => {
    router.navigate('/work', {
      railScroll: railRef.current?.scrollTop,
      windowScroll: window.scrollY,
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleBack = () => {
    if (selectedProject) {
      router.goBack('/work')
    } else if (mobileTab === 'work') {
      router.goBack('/')
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <main className="viewport-shell">
      {/* Mobile Navigation Bar matching reference image */}
      <header
        className={`mobile-header ${selectedProject || mobileTab === 'work' ? 'mobile-header-work' : 'mobile-header-home'}`}
        aria-label="Mobile Navigation"
      >
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
            <button className="mobile-back-btn" onClick={handleBack} aria-label="Back to intro">
              ← back
            </button>
            <h2 className="mobile-header-title">Work</h2>
            <div className="mobile-header-spacer" />
          </>
        ) : (
          <>
            <span className="mobile-header-brand">About me</span>
            <a
              href="https://drive.google.com/file/d/1vNuQqXcLpxhTXmKPb1JN6oN1sbPgbf-Y/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-header-resume"
              aria-label="View Resume"
            >
              Resume ↗
            </a>
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
            <FadeUpReveal delay={0.06} className="work-section-title">Projects</FadeUpReveal>
          </div>
          <div
            ref={railRef}
            className="projects-scroll work-list"
            aria-label="Selected work"
          >
            {visibleProjects.map((project, idx) => (
              <FadeUpReveal key={project.id} delay={0.1 + idx * 0.04} yOffset={8}>
                <WorkCard
                  project={project}
                  active={selectedProject?.id === project.id}
                  onClick={() => handleSelectProject(project)}
                />
              </FadeUpReveal>
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
                <IntroPanel
                  key="intro"
                  onGoWork={handleGoWork}
                  workCount={visibleProjects.length}
                  projectsList={visibleProjects}
                  onSelectProject={handleSelectProject}
                />
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
                <HoChiMinhTime />
              </motion.footer>
            )}
          </AnimatePresence>
        </section>
      </section>
    </main>
  )
}

export default App

