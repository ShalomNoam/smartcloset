import { useNavigate, Link } from 'react-router-dom'
import { Shirt, Sparkles, Cloud, Calendar, Camera, Bot, Wand2 } from 'lucide-react'
import styles from './LandingPage.module.css'

const FEATURES = [
  {
    Icon: Wand2,
    title: 'מהבגדים שלך בלבד',
    desc: 'מהבגדים שכבר יש לך — לא קטלוג, לא קניות. ה-AI בונה לוקים מושלמים מהארון הפרטי שלך.',
  },
  {
    Icon: Cloud,
    title: 'מותאם למזג האוויר',
    desc: 'ה-AI בוחר מהבגדים שלך בדיוק לפי מזג האוויר — לא תצא עם סוודר ביום חם לעולם.',
  },
  {
    Icon: Calendar,
    title: 'לכל אירוע',
    desc: 'לכל אירוע, מהארון שלך — עבודה, מסיבה, חתונה, ספורט. תמיד הלוק הנכון מהבגדים שכבר יש לך.',
  },
]

const STEPS = [
  { num: '01', Icon: Camera,   title: 'צלם את הארון',    desc: 'צלם כל בגד פעם אחת. ה-AI מזהה אוטומטית צבע, סגנון וקטגוריה מהבגדים שהעלית.' },
  { num: '02', Icon: Bot,      title: 'ה-AI לומד אותך',  desc: 'האלגוריתם מנתח את הסגנון שלך, מזג האוויר, והאירועים ביומן — ובונה לוקים מהבגדים שהעלית.' },
  { num: '03', Icon: Sparkles, title: 'קבל לוק כל יום',  desc: 'בבוקר מחכה לך לוק מוכן מהבגדים שהעלית. לחץ רענון לקבל אפשרות אחרת.' },
]

const TESTIMONIALS = [
  { initial: 'מ', name: 'מיכאל, 28', quote: 'חסכתי 20 דקות כל בוקר. הלוקים תמיד מדויקים לסגנון שלי.' },
  { initial: 'ד', name: 'דנה, 31',   quote: 'סוף סוף מנצלת את כל הבגדים שיש לי בארון. כל שבוע לוק חדש.' },
  { initial: 'י', name: 'יואב, 25',  quote: 'המרצה שלי שאל אם שכרתי סטייליסט. עניתי שיש לי AI.' },
]

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className={styles.page}>

      {/* ── Landing Nav ── */}
      <nav className={styles.nav}>
        <div className={styles.navInner}>
          <Link to="/" className={styles.logo}>
            <div className={styles.logoIcon}><Shirt size={18} strokeWidth={1.75} /></div>
            <span className={styles.logoText}>SmartCloset</span>
          </Link>
          <div className={styles.navActions}>
            <Link to="/login"    className={styles.navSignIn}>התחבר</Link>
            <button className={styles.navCta} onClick={() => navigate('/register')}>התחל בחינם</button>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className={styles.hero}>
        {/* Particles */}
        <div className={styles.particles} aria-hidden="true">
          <div className={styles.p1}/><div className={styles.p2}/><div className={styles.p3}/>
          <div className={styles.p4}/><div className={styles.p5}/><div className={styles.p6}/>
          <div className={styles.p7}/><div className={styles.p8}/><div className={styles.p9}/>
          <div className={styles.p10}/><div className={styles.p11}/><div className={styles.p12}/>
        </div>

        <div className={styles.heroGrid}>
          {/* Text — right side in RTL */}
          <div className={styles.heroText}>
            <div className={styles.heroBadge}>
              <Sparkles size={11} strokeWidth={2} />
              מבוסס בינה מלאכותית
            </div>
            <h1 className={styles.heroH1}>הלוקים שלך{'\n'}מחכים בארון</h1>
            <p className={styles.heroSubH2}>
              צלם את הבגדים שלך פעם אחת — ה-AI יבנה לך לוקים מושלמים כל יום מהארון הפרטי שלך
            </p>

            {/* Visual flow: wardrobe → AI → outfit */}
            <div className={styles.flowRow}>
              <div className={styles.flowBox}>
                <Shirt size={16} strokeWidth={1.75} className={styles.flowIcon} />
                <span>הבגדים שלך</span>
              </div>
              <span className={styles.flowArrow}>←</span>
              <div className={`${styles.flowBox} ${styles.flowBoxAi}`}>
                <Sparkles size={16} strokeWidth={1.75} className={styles.flowIconAi} />
                <span>✦ AI</span>
              </div>
              <span className={styles.flowArrow}>←</span>
              <div className={styles.flowBox}>
                <span>לוק מושלם</span>
              </div>
            </div>

            <div className={styles.heroCtas}>
              <button className={styles.ctaPrimary} onClick={() => navigate('/register')}>✦ התחל בחינם</button>
              <button className={styles.ctaGhost}   onClick={() => navigate('/login')}>צפה בהדגמה</button>
            </div>
            <p className={styles.trustLine}>⭐ 4.9 · 10,000+ משתמשים · ללא כרטיס אשראי</p>
          </div>

          {/* Phone mockup — left side in RTL */}
          <div className={styles.heroMockup}>
            <div className={styles.mockupWrap}>
              <div className={styles.phone}>
                <div className={styles.phoneNotch} />
                <div className={styles.phoneScreen}>
                  <div className={styles.mockGreeting}>בוקר טוב, נועם ✨</div>
                  <div className={styles.mockWeatherBar}>
                    <span>22° · תל אביב</span>
                    <span className={styles.mockWeatherBadge}>בהיר</span>
                  </div>
                  <div className={styles.mockCard}>
                    <div className={styles.mockAiBadge}>
                      <span className={styles.mockPulseDot} />
                      ✦ AI בחר עבורך · 94%
                    </div>
                    <div className={styles.mockItems}>
                      <div className={styles.mockItem}>
                        <div className={styles.mockItemIcon} />
                        <span>חולצה לבנה</span>
                      </div>
                      <div className={styles.mockDivider} />
                      <div className={styles.mockItem}>
                        <div className={styles.mockItemIcon} />
                        <span>ג'ינס כחול</span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.mockBtn}>✦ קבל את הלוק שלי</div>
                  <div className={styles.mockStats}>
                    <div className={styles.mockStat}>
                      <span className={styles.mockStatNum}>14</span>
                      <span className={styles.mockStatLabel}>פריטים</span>
                    </div>
                    <div className={styles.mockStat}>
                      <span className={styles.mockStatNum}>94%</span>
                      <span className={styles.mockStatLabel}>התאמה</span>
                    </div>
                    <div className={styles.mockStat}>
                      <span className={styles.mockStatNum}>7</span>
                      <span className={styles.mockStatLabel}>ימים</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.phoneGlow} aria-hidden="true" />
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className={styles.howItWorks}>
        <div className={styles.sectionInner}>
          <p className={styles.darkEyebrow}>פשוט כמו 1-2-3</p>
          <h2 className={styles.darkTitle}>איך זה עובד?</h2>
          <div className={styles.stepsRow}>
            {STEPS.map(({ num, Icon, title, desc }) => (
              <div key={num} className={styles.step}>
                <div className={styles.stepNum}>{num}</div>
                <div className={styles.stepIconWrap}>
                  <Icon size={26} strokeWidth={1.5} className={styles.stepIcon} />
                </div>
                <h3 className={styles.stepTitle}>{title}</h3>
                <p className={styles.stepDesc}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className={styles.features}>
        <div className={styles.sectionInner}>
          <p className={styles.lightEyebrow}>מהבגדים שלך בלבד — לא קטלוג, לא קניות</p>
          <h2 className={styles.lightTitle}>כל מה שהארון שלך צריך</h2>
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

      {/* ── Social Proof ── */}
      <section className={styles.socialProof}>
        <div className={styles.sectionInner}>
          <p className={styles.darkEyebrow}>לא רק אנחנו אומרים</p>
          <h2 className={styles.darkTitle}>הם כבר לובשים חכם</h2>
          <div className={styles.testimonialGrid}>
            {TESTIMONIALS.map(({ initial, name, quote }) => (
              <div key={name} className={styles.testimonialCard}>
                <div className={styles.avatarCircle}>{initial}</div>
                <div className={styles.starRow}>{'★★★★★'.split('').map((s, i) => <span key={i} className={styles.star}>{s}</span>)}</div>
                <p className={styles.testimonialName}>{name}</p>
                <p className={styles.testimonialQuote}>"{quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className={styles.finalCta}>
        <h2 className={styles.finalCtaTitle}>מוכן להתחיל?</h2>
        <p className={styles.finalCtaSub}>הצטרף לאלפי אנשים שלובשים חכם כל יום</p>
        <button className={styles.finalCtaBtn} onClick={() => navigate('/register')}>
          ✦ התחל עכשיו — בחינם
        </button>
      </section>

      {/* ── Footer ── */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerLogo}>
            <div className={styles.footerLogoIcon}><Shirt size={14} strokeWidth={1.75} /></div>
            <span className={styles.footerLogoText}>SmartCloset</span>
          </div>
          <p className={styles.footerTagline}>הארון החכם שלך</p>
          <p className={styles.footerCopy}>© 2025 SmartCloset · כל הזכויות שמורות</p>
        </div>
      </footer>

    </div>
  )
}
