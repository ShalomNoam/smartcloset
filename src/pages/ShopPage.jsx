import styles from './ShopPage.module.css'

const featured = [
  { id: 1, icon: '👔', name: 'Linen Collection', brand: 'Spring Edit', price: '$49' },
  { id: 2, icon: '👖', name: 'Slim Chinos', brand: 'Everyday Basics', price: '$65' },
  { id: 3, icon: '🧥', name: 'Trench Coat', brand: 'Fall Must-Have', price: '$120' },
  { id: 4, icon: '👟', name: 'Clean Sneakers', brand: 'Street Style', price: '$85' },
]

export default function ShopPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Shop</h1>
          <p className={styles.subtitle}>Curated picks for your style</p>
        </div>
        <span className={styles.badge}>✦ AI Picks</span>
      </header>

      <div className={styles.banner}>
        <div>
          <p className={styles.bannerLabel}>This Week's Edit</p>
          <p className={styles.bannerTitle}>Spring Into Style</p>
          <p className={styles.bannerDesc}>Handpicked pieces to refresh your wardrobe</p>
        </div>
        <span className={styles.bannerEmoji}>🌸</span>
      </div>

      <h2 className={styles.sectionTitle}>Recommended For You</h2>
      <div className={styles.grid}>
        {featured.map((item) => (
          <div key={item.id} className={styles.card}>
            <div className={styles.iconBox}>{item.icon}</div>
            <p className={styles.itemName}>{item.name}</p>
            <p className={styles.itemBrand}>{item.brand}</p>
            <div className={styles.itemFooter}>
              <span className={styles.price}>{item.price}</span>
              <button className={styles.addBtn}>+</button>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.comingSoon}>
        <span>✦</span>
        <span>Full shop experience coming soon</span>
      </div>
    </div>
  )
}
