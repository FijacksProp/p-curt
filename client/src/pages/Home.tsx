import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  ChevronDown,
  HeartHandshake,
  Menu,
  MessageCircle,
  Send,
  Sparkles,
  Twitter,
  Wallet,
  X,
} from 'lucide-react';

const storyImage =
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663398889538/SznYvnhVS5rDFmCwpuZP37/hero-father-son-UVeBdy7DxNwuAzPf9BoEVo.webp';

type CounterProps = {
  target: number;
  duration?: number;
};

type RevealKey =
  | 'hero'
  | 'story'
  | 'mission'
  | 'tokenomics'
  | 'how-to-buy'
  | 'roadmap'
  | 'community';

const missionPillars = [
  {
    title: 'Human First',
    description:
      'Papa Curt begins with Curtis, his family, and a deeply personal fight. The project is designed to keep that human reality at the center of everything.',
    icon: HeartHandshake,
  },
  {
    title: 'Hope As Momentum',
    description:
      'The token transforms helplessness into action, giving supporters a way to rally around resilience, awareness, and forward movement.',
    icon: Sparkles,
  },
  {
    title: 'Community Action',
    description:
      'Every holder is invited into something larger than a trade: a shared movement built on empathy, visibility, and collective support.',
    icon: Wallet,
  },
];

const tokenStats = [
  { label: 'Total Supply', value: 1000000000, suffix: ' PPC' },
  { label: 'Buy / Sell Tax', value: 0, suffix: '%' },
  { label: 'Chain', value: 'Solana' },
  { label: 'Liquidity', value: 'Burned' },
];

const roadmapPhases = [
  {
    phase: '01',
    title: 'Foundation',
    status: 'Current',
    body: 'Launch the token, establish the website, and build the first wave of believers around the Papa Curt story and mission.',
  },
  {
    phase: '02',
    title: 'Expansion',
    status: 'Upcoming',
    body: 'Grow visibility through listings, partnerships, and community expansion, while introducing a dedicated fund connected to Papa Curt’s cause.',
  },
  {
    phase: '03',
    title: 'Legacy',
    status: 'Future',
    body: 'Move toward broader adoption, major exchange integrations, and a charitable initiative in Curtis’s name that extends beyond the token itself.',
  },
];

function AnimatedCounter({ target, duration = 2000 }: CounterProps) {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!countRef.current) return;

    const rect = countRef.current.getBoundingClientRect();
    if (rect.top >= window.innerHeight || hasAnimated.current) return;

    hasAnimated.current = true;
    let current = 0;
    const increment = target / (duration / 16);

    const timer = window.setInterval(() => {
      current += increment;

      if (current >= target) {
        setCount(target);
        window.clearInterval(timer);
        return;
      }

      setCount(Math.floor(current));
    }, 16);

    return () => window.clearInterval(timer);
  }, [duration, target]);

  return <div ref={countRef}>{count.toLocaleString()}</div>;
}

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Record<RevealKey, boolean>>({
    hero: false,
    story: false,
    mission: false,
    tokenomics: false,
    'how-to-buy': false,
    roadmap: false,
    community: false,
  });
  const sectionRefs = useRef<Partial<Record<RevealKey, HTMLElement | null>>>({});
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);

      (Object.entries(sectionRefs.current) as Array<[RevealKey, HTMLElement | null]>).forEach(
        ([key, ref]) => {
          if (!ref) return;

          const rect = ref.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight * 0.78;

          setVisibleSections((prev) =>
            prev[key] === isVisible
              ? prev
              : {
                  ...prev,
                  [key]: isVisible,
                }
          );
        }
      );
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const closeMenu = () => setMobileMenuOpen(false);
    window.addEventListener('resize', closeMenu);
    return () => window.removeEventListener('resize', closeMenu);
  }, []);

  const revealClass = (key: RevealKey) =>
    visibleSections[key]
      ? 'translate-y-0 opacity-100'
      : 'translate-y-10 opacity-0';

  return (
    <div className="page-shell">
      <div className="page-noise" />

      <nav className="fixed inset-x-0 top-0 z-50">
        <div className="container pt-4">
          <div className="nav-panel">
            <a
              href="#top"
              className="text-sm font-semibold uppercase tracking-[0.34em] text-[#f6efe6]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Papa Curt
            </a>

            <div className="hidden items-center gap-8 text-sm text-[#f6efe6]/72 md:flex">
              <a href="#story" className="nav-link">
                Story
              </a>
              <a href="#mission" className="nav-link">
                Direction
              </a>
              <a href="#tokenomics" className="nav-link">
                Token
              </a>
              <a href="#roadmap" className="nav-link">
                Roadmap
              </a>
            </div>

            <Button asChild className="btn-metal hidden md:inline-flex">
              <a href="#community">Join Community</a>
            </Button>

            <button
              type="button"
              className="mobile-menu-button md:hidden"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {mobileMenuOpen ? (
            <div className="mobile-menu md:hidden">
              {[
                ['#story', 'Story'],
                ['#mission', 'Direction'],
                ['#tokenomics', 'Token'],
                ['#roadmap', 'Roadmap'],
                ['#community', 'Join Community'],
              ].map(([href, label]) => (
                <a
                  key={href}
                  href={href}
                  className="mobile-menu-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {label}
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </nav>

      <main id="top">
        <section
          ref={(el) => {
            sectionRefs.current.hero = el;
          }}
          className="relative overflow-hidden px-0 pt-28 text-[#f6efe6] md:pt-32"
        >
          <div className="hero-backdrop">
            <div
              className="hero-image"
              style={{
                backgroundImage: `url(${storyImage})`,
                transform: `translateY(${scrollY * 0.18}px) scale(1.05)`,
              }}
            />
            <div className="hero-overlay" />
          </div>

          <div className="container relative z-10">
            <div
              className={`grid min-h-[86svh] items-end gap-12 pb-10 transition-all duration-1000 lg:grid-cols-[1.3fr_0.7fr] ${revealClass(
                'hero'
              )}`}
            >
              <div className="max-w-4xl">
                <div className="section-chip mb-8 flex-nowrap text-[0.52rem] sm:text-[0.9rem]">
                  <span>Community-driven project</span>
                  <span className="opacity-40">/</span>
                  <span>Built on Solana</span>
                </div>

                <h1 className="max-w-5xl text-6xl leading-[0.92] font-semibold tracking-[-0.05em] sm:text-7xl lg:text-[8.6rem]">
                  More than
                  <br />
                  a token.
                  <br />
                  A movement.
                </h1>

                <div className="mt-8 max-w-2xl space-y-5 text-base leading-7 text-[#f6efe6]/78 md:text-lg">
                  <p>
                    <span className="text-[#d6a067]">Papa Curt ($PPC)</span> is a
                    community-driven cryptocurrency project on Solana, shaped by a son’s
                    response to his father Curtis facing a serious illness.
                  </p>
                  <p>
                    Rather than acting like a typical meme coin, the project is built around
                    connection, support, awareness, and the belief that decentralized
                    technology can unite people around a real human story.
                  </p>
                </div>

                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <Button asChild className="btn-copper-sleek">
                    <a href="#story">
                      Read The Story
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button asChild className="btn-ghost-light">
                    <a href="#tokenomics">View Token Details</a>
                  </Button>
                </div>
              </div>

              <div className="grid gap-4 self-end lg:pb-8">
                <div className="hero-card">
                  <p className="hero-card-label">Core Idea</p>
                  <p className="hero-card-title">A token with a human center</p>
                  <p className="hero-card-body">
                    Behind every digital asset there can be a real story. Papa Curt is built
                    on family, resilience, and shared purpose.
                  </p>
                </div>

                <div className="hero-card hero-card-accent">
                  <p className="hero-card-label">Community Meaning</p>
                  <p className="hero-card-title">Support made visible</p>
                  <p className="hero-card-body">
                    Holding $PPC is framed as more than participation in a market. It is a
                    symbolic act of standing with Curtis and the community behind him.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-white/12 py-6 text-xs uppercase tracking-[0.26em] text-[#f6efe6]/58">
              <span>Built on hope. Powered by community.</span>
              <ChevronDown className="h-4 w-4 animate-bounce" />
            </div>
          </div>
        </section>

        <section
          id="story"
          ref={(el) => {
            sectionRefs.current.story = el;
          }}
          className="story-section relative px-0 py-24 md:py-32"
        >
          <div className="container">
            <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
              <div className={`transition-all duration-1000 ${revealClass('story')}`}>
                <div className="story-frame">
                  <img src={storyImage} alt="Papa Curt and family" className="story-image" />
                  <div className="story-tag">
                    <span>Editorial story</span>
                    <span>Real family stakes</span>
                  </div>
                </div>
              </div>

              <div
                className={`transition-all delay-100 duration-1000 ${revealClass('story')}`}
              >
                <p className="section-eyebrow section-eyebrow-light">What The Project Is</p>
                <h2 className="section-title section-title-light max-w-3xl">
                  Papa Curt is a Solana project rooted in family, resilience, and collective action.
                </h2>

                <div className="story-copy-grid story-copy-grid-light">
                  <p>
                    Papa Curt was not born in a boardroom and it was not designed merely to
                    follow market trends. Its identity comes from emotionally charged moments:
                    hospital visits, long nights, uncertainty, and the determination to turn
                    helplessness into something meaningful.
                  </p>
                  <p>
                    At its core, <strong>$PPC</strong> is a community-driven token on the
                    Solana blockchain, but the project positions itself as more than a meme
                    coin. It is meant to bring people together, raise awareness, and create a
                    shared sense of purpose through digital finance.
                  </p>
                  <p>
                    That story gives the project a grounded and authentic tone. It tells
                    people that behind the charts and wallets there is something real:
                    family, support, endurance, and the refusal to give up.
                  </p>
                </div>

                <blockquote className="quote-panel">
                  “Every holder is a prayer. Every buy is a battle cry.”
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        <section
          id="mission"
          ref={(el) => {
            sectionRefs.current.mission = el;
          }}
          className="mission-section relative px-0 py-24 md:py-32"
        >
          <div className="container">
            <div className="mb-12 flex flex-col gap-6 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
              <div className={`transition-all duration-1000 ${revealClass('mission')}`}>
                <p className="section-eyebrow section-eyebrow-light">Why It Exists</p>
                <h2 className="section-title section-title-light max-w-3xl">
                  The project exists to turn a personal struggle into a shared movement of support.
                </h2>
              </div>

              <p
                className={`max-w-xl text-sm leading-7 text-[#d7d2cc]/78 transition-all delay-100 duration-1000 md:text-base ${revealClass(
                  'mission'
                )}`}
              >
                Papa Curt aims to build an engaged community where every participant feels
                part of something larger than themselves. Technology here is not meant to
                replace human connection, but to amplify it.
              </p>
            </div>

            <div className="grid gap-5 lg:grid-cols-3">
              {missionPillars.map((pillar, index) => {
                const Icon = pillar.icon;

                return (
                  <article
                    key={pillar.title}
                    className={`mission-panel transition-all duration-1000 ${revealClass(
                      'mission'
                    )}`}
                    style={{ transitionDelay: `${index * 120}ms` }}
                  >
                    <div className="mission-icon-wrap">
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="mission-index">0{index + 1}</p>
                    <h3 className="mission-title">{pillar.title}</h3>
                    <p className="mission-body">{pillar.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section
          id="tokenomics"
          ref={(el) => {
            sectionRefs.current.tokenomics = el;
          }}
          className="relative overflow-hidden px-0 py-24 md:py-32"
        >
          <div className="container">
            <div className="stats-shell">
              <div className={`transition-all duration-1000 ${revealClass('tokenomics')}`}>
                <p className="section-eyebrow text-[#e2b483]">Token Snapshot</p>
                <h2 className="section-title max-w-3xl text-[#f6efe6]">
                  The structure is simple, transparent, and designed to encourage accessible participation.
                </h2>
              </div>

              <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {tokenStats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className={`stat-panel transition-all duration-1000 ${revealClass(
                      'tokenomics'
                    )}`}
                    style={{ transitionDelay: `${index * 80}ms` }}
                  >
                    <p className="stat-label">{stat.label}</p>
                    <div className="stat-value">
                      {typeof stat.value === 'number' ? (
                        <>
                          <AnimatedCounter target={stat.value} />
                          {stat.suffix ?? ''}
                        </>
                      ) : (
                        stat.value
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 grid gap-10 xl:grid-cols-[0.9fr_1.1fr]">
                <div
                  className={`transition-all duration-1000 ${revealClass('tokenomics')}`}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#f6efe6]/56">
                    Allocation
                  </p>
                  <div className="mt-6 space-y-5">
                    {[
                      { label: 'Community', value: 40 },
                      { label: 'Liquidity', value: 30 },
                      { label: 'Marketing', value: 20 },
                      { label: 'Reserve', value: 10 },
                    ].map((item, index) => (
                      <div key={item.label}>
                        <div className="mb-2 flex items-center justify-between text-sm text-[#f6efe6]/78">
                          <span>{item.label}</span>
                          <span className="font-mono text-[#f0b67c]">{item.value}%</span>
                        </div>
                        <div className="h-[2px] bg-white/10">
                          <div
                            className="h-[2px] bg-gradient-to-r from-[#f0b67c] via-[#c17c44] to-[#6f3f18] transition-all duration-1000"
                            style={{
                              width: visibleSections.tokenomics ? `${item.value}%` : '0%',
                              transitionDelay: `${index * 120}ms`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className={`token-copy-panel transition-all delay-100 duration-1000 ${revealClass(
                    'tokenomics'
                  )}`}
                >
                  <p>
                    Papa Curt operates on the Solana blockchain, chosen for speed, low
                    transaction costs, and ease of access for a broad community of
                    participants.
                  </p>
                  <p>
                    The total supply is set at 1,000,000,000 $PPC with zero percent buy and
                    sell tax, reinforcing accessibility and a smoother entry path for new and
                    existing holders alike.
                  </p>
                  <p>
                    Liquidity is intended to be burned to strengthen trust, while allocation
                    across community, liquidity, marketing, and reserve is designed to
                    support both growth and longer-term sustainability.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="how-to-buy"
          ref={(el) => {
            sectionRefs.current['how-to-buy'] = el;
          }}
          className="relative px-0 py-24 md:py-32"
        >
          <div className="container">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
              <div className={`transition-all duration-1000 ${revealClass('how-to-buy')}`}>
                <p className="section-eyebrow">Action Path</p>
                <h2 className="section-title max-w-xl text-[#10151b]">
                  Joining Papa Curt follows a familiar Solana flow designed to stay approachable.
                </h2>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                {[
                  ['01', 'Set up a wallet', 'Create a compatible Solana wallet such as Phantom or Solflare.'],
                  ['02', 'Acquire SOL', 'Buy SOL and keep enough in the wallet to cover the swap and network fees.'],
                  ['03', 'Connect to a DEX', 'Open Jupiter or Raydium and connect the wallet when the token is live.'],
                  ['04', 'Swap for $PPC', 'Use the official contract address at launch and swap into Papa Curt.'],
                ].map(([num, title, body], index) => (
                  <article
                    key={num}
                    className={`action-card transition-all duration-1000 ${revealClass(
                      'how-to-buy'
                    )}`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <p className="action-number">{num}</p>
                    <h3 className="action-title">{title}</h3>
                    <p className="action-body">{body}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="roadmap"
          ref={(el) => {
            sectionRefs.current.roadmap = el;
          }}
          className="relative px-0 py-24 md:py-32"
        >
          <div className="container">
            <div className={`mb-12 transition-all duration-1000 ${revealClass('roadmap')}`}>
              <p className="section-eyebrow">Progression</p>
              <h2 className="section-title max-w-3xl text-[#10151b]">
                The roadmap is built around launch, growth, and the long-term creation of a meaningful legacy.
              </h2>
            </div>

            <div className="roadmap-grid">
              {roadmapPhases.map((phase, index) => (
                <article
                  key={phase.phase}
                  className={`roadmap-card transition-all duration-1000 ${revealClass(
                    'roadmap'
                  )}`}
                  style={{ transitionDelay: `${index * 120}ms` }}
                >
                  <div className="roadmap-head">
                    <span className="roadmap-phase">{phase.phase}</span>
                    <span className="roadmap-status">{phase.status}</span>
                  </div>
                  <h3 className="roadmap-title">{phase.title}</h3>
                  <p className="roadmap-body">{phase.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="community"
          ref={(el) => {
            sectionRefs.current.community = el;
          }}
          className="relative px-0 pb-20 pt-24 md:pb-24 md:pt-32"
        >
          <div className="container">
            <div
              className={`community-shell transition-all duration-1000 ${revealClass(
                'community'
              )}`}
            >
              <div>
                <p className="section-eyebrow text-[#e2b483]">Community Layer</p>
                <h2 className="section-title max-w-2xl text-[#f6efe6]">
                  Papa Curt is positioned as a hybrid between a digital asset and a social movement.
                </h2>
                <p className="mt-6 max-w-xl text-base leading-7 text-[#f6efe6]/72">
                  Its success is not intended to be measured only by market performance, but
                  by the strength, authenticity, and compassion of the community around it.
                  The broader vision is to use decentralized technology as a tool for unity,
                  visibility, support, and eventually a charitable legacy in Curtis’s name.
                </p>
              </div>

              <div className="community-side">
                <div className="community-links">
                  {[
                    { label: 'Twitter', icon: <Twitter className="h-5 w-5" /> },
                    { label: 'Telegram', icon: <Send className="h-5 w-5" /> },
                    { label: 'Discord', icon: <MessageCircle className="h-5 w-5" /> },
                  ].map((item) => (
                    <a key={item.label} href="#" className="community-link">
                      {item.icon}
                      <span>{item.label}</span>
                    </a>
                  ))}
                </div>

                <div className="contract-panel">
                  <p className="contract-label">Contract Address</p>
                  <p className="contract-value">Planned for launch / announced through official channels</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 border-t border-[#1f2630] pt-6 text-sm text-[#4d5562] md:flex-row md:items-center md:justify-between">
              <p>$PPC is a community-driven Solana token built around a real human story. Not financial advice.</p>
              <p>&copy; {currentYear} Papa Curt Community.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
