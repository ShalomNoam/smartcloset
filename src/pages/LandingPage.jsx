import { useNavigate, Link } from 'react-router-dom'
import { Shirt, Sparkles, Cloud, Heart, ArrowRight, Upload, Calendar } from 'lucide-react'
import styles from './LandingPage.module.css'

const FEATURES = [
  {
    Icon: Sparkles,
    title: 'Smart Recommendations',
    desc:  'AI analyses your wardrobe, mood and weather to suggest the perfect outfit every single morning.',
  },
  {
    Icon: Cloud,
    title: 'Weather-Based Looks',
    desc:  'Real-time weather integration ensures you are always dressed perfectly for the conditions outside.',
  },
  {
    Icon: Heart,
    title: 'Save Your Favorites',
    desc:  'Heart the looks you love and build a curated collection of outfits you can revisit anytime.',
  },
]

const STEPS = [
  { num: '01', Icon: Upload,   title: 'Upload your clothes',  desc: 'Add items from your wardrobe by category, colour and season in seconds.' },
  { num: '02', Icon: Calendar, title: 'Pick an occasion',     desc: 'Tell SmartCloset where you\'re headed — work, party, wedding or the gym.' },
  { num: '03', Icon: Sparkles, title: 'Get your look',        desc: 'Receive AI-curated outfit recommendations tailored just for you.' },
]

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className={styles.page}>

      {/* ── Landing Nav ── */}
      <nav className={styles.nav}>
        <div className={styles.navInner}>
          <Link to="/" className={styles.logo}>
            <div className={styles.logoIcon}>
              <Shirt size={18} strokeWidth={1.75} />
            </div>
            <span className={styles.logoText}>SmartCloset</span>
          </Link>
          <div className={styles.navActions}>
            <Link to="/login" className={styles.navSignIn}>Sign In</Link>
            <button className={styles.navCta} onClick={() => navigate('/register')}>
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroBadge}>
            <Sparkles size={12} strokeWidth={2} />
            AI-Powered Wardrobe
          </div>
          <h1 className={styles.heroHeading}>
            Dress Smarter,<br />Every Day.
          </h1>
          <p className={styles.heroSub}>
            Your AI-powered digital wardrobe — get outfit recommendations tailored
            to your style, weather, and occasion.
          </p>
          <div className={styles.heroCtas}>
            <button className={styles.ctaPrimary} onClick={() => navigate('/register')}>
              ✦ Get Started Free
            </button>
            <button className={styles.ctaGhost} onClick={() => navigate('/login')}>
              Sign In
            </button>
          </div>
        </div>
        <div className={styles.blob1} aria-hidden="true" />
        <div className={styles.blob2} aria-hidden="true" />
        <div className={styles.blob3} aria-hidden="true" />
      </section>

      {/* ── Features ── */}
      <section className={styles.features}>
        <div className={styles.sectionInner}>
          <p className={styles.sectionEyebrow}>Why SmartCloset?</p>
          <h2 className={styles.sectionTitle}>Everything your wardrobe needs</h2>
          <div className={styles.featureGrid}>
            {FEATURES.map(({ Icon, title, desc }) => (
              <div key={title} className={styles.featureCard}>
                <div className={styles.featureIconWrap}>
                  <Icon size={22} strokeWidth={1.75} className={styles.featureIcon} />
                </div>
                <h3 className={styles.featureTitle}>{title}</h3>
                <p className={styles.featureDesc}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className={styles.howItWorks}>
        <div className={styles.sectionInner}>
          <p className={styles.sectionEyebrow}>Simple as 1-2-3</p>
          <h2 className={styles.sectionTitle}>How it works</h2>
          <div className={styles.stepsRow}>
            {STEPS.map(({ num, Icon, title, desc }, i) => (
              <div key={num} className={styles.stepWrap}>
                <div className={styles.step}>
                  <div className={styles.stepNum}>{num}</div>
                  <div className={styles.stepIconWrap}>
                    <Icon size={22} strokeWidth={1.75} className={styles.stepIcon} />
                  </div>
                  <h3 className={styles.stepTitle}>{title}</h3>
                  <p className={styles.stepDesc}>{desc}</p>
                </div>
                {i < STEPS.length - 1 && (
                  <ArrowRight size={20} strokeWidth={1.5} className={styles.stepArrow} />
                )}
              </div>
            ))}
          </div>
          <div className={styles.howCta}>
            <button className={styles.ctaPrimary} onClick={() => navigate('/register')}>
              ✦ Start For Free
            </button>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerLogo}>
            <div className={styles.footerLogoIcon}>
              <Shirt size={14} strokeWidth={1.75} />
            </div>
            <span className={styles.footerLogoText}>SmartCloset</span>
          </div>
          <p className={styles.footerTagline}>Your AI-powered digital wardrobe</p>
          <p className={styles.footerCopy}>© 2026 SmartCloset. All rights reserved.</p>
        </div>
      </footer>

    </div>
  )
}
