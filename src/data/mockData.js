/* ── Clothing Items (Hebrew) ── */
export const clothingItems = [
  { id: 1,  name: 'חולצה לבנה',          category: 'Tops',        color: 'לבן',      seasons: ['Spring','Summer'] },
  { id: 2,  name: "ג'ינס כחול כהה",       category: 'Bottoms',     color: 'כחול כהה', seasons: ['Spring','Summer','Fall','Winter'] },
  { id: 3,  name: 'נעלי ספורט לבנות',    category: 'Shoes',       color: 'לבן',      seasons: ['Spring','Summer'] },
  { id: 4,  name: 'חולצה פרחונית',       category: 'Tops',        color: 'רב צבעי',  seasons: ['Spring','Summer'] },
  { id: 5,  name: 'בלייזר שחור',         category: 'Outer',       color: 'שחור',     seasons: ['Fall','Winter'] },
  { id: 6,  name: "ג'ינס כחול",           category: 'Bottoms',     color: 'כחול',     seasons: ['Spring','Summer','Fall','Winter'] },
  { id: 7,  name: 'צעיף משי',            category: 'Accessories', color: 'רב צבעי',  seasons: ['Fall','Winter'] },
  { id: 8,  name: 'מגפוני קרסול',        category: 'Shoes',       color: 'שחור',     seasons: ['Fall','Winter'] },
  { id: 9,  name: 'טישרט פסים',          category: 'Tops',        color: 'כחול-לבן', seasons: ['Spring','Summer'] },
  { id: 10, name: "מעיל טרנץ'",           category: 'Outer',       color: "בז'",      seasons: ['Fall','Winter','Spring'] },
]

/* ── Category keys (English for icon/logic) + Hebrew display labels ── */
export const categories = ['All', 'Tops', 'Bottoms', 'Shoes', 'Outer', 'Accessories']

export const CATEGORY_LABELS = {
  All:         'הכל',
  Tops:        'חולצות',
  Bottoms:     'מכנסיים',
  Shoes:       'נעליים',
  Outer:       'חיצוניות',
  Accessories: 'אביזרים',
}

/* ── Seasons ── */
export const seasons = ['Spring', 'Summer', 'Fall', 'Winter']

export const SEASON_LABELS = {
  Spring: 'אביב',
  Summer: 'קיץ',
  Fall:   'סתיו',
  Winter: 'חורף',
}

/* ── Event types ── */
export const eventTypes = [
  { key: 'Work',    label: 'עבודה'  },
  { key: 'Party',   label: 'מסיבה'  },
  { key: 'Wedding', label: 'חתונה'  },
  { key: 'Sport',   label: 'ספורט'  },
]

/* ── Outfits by event (Hebrew names & tags) ── */
export const outfitsByEvent = {
  Work: [
    { id:1,  name: 'לוק משרד מושלם',    items:[{category:'Tops',name:'חולצה לבנה'},{category:'Bottoms',name:"ג'ינס כחול כהה"}], tags:['עסקי','נקי','קלאסי'],       saved:false },
    { id:2,  name: 'הסטייל של הישיבה',  items:[{category:'Tops',name:'חולצה פרחונית'},{category:'Outer',name:'בלייזר שחור'}],   tags:['מקצועי','אלגנטי'],          saved:false },
    { id:3,  name: 'מקצועי בלי להשתדל', items:[{category:'Tops',name:'טישרט פסים'},{category:'Bottoms',name:"ג'ינס כחול"}],     tags:["קז'ואל",'נוח','יומיומי'],   saved:false },
  ],
  Party: [
    { id:4,  name: 'לילה בעיר',         items:[{category:'Tops',name:'חולצה לבנה'},{category:'Shoes',name:'מגפוני קרסול'}],     tags:['ליל שישי','סטייל','עירוני'],saved:false },
    { id:5,  name: 'שעת קוקטייל',       items:[{category:'Outer',name:'בלייזר שחור'},{category:'Accessories',name:'צעיף משי'}], tags:['אלגנטי','מסיבה'],          saved:true  },
    { id:6,  name: 'ליל שישי',          items:[{category:'Tops',name:'חולצה פרחונית'},{category:'Shoes',name:'נעלי ספורט לבנות'}],tags:['כיף',"קז'ואל"],          saved:false },
  ],
  Wedding: [
    { id:7,  name: 'מסיבת גן',          items:[{category:'Tops',name:'חולצה פרחונית'},{category:'Accessories',name:'צעיף משי'}], tags:['אלגנטי','גן'],             saved:false },
    { id:8,  name: 'אלגנטי קלאסי',      items:[{category:'Outer',name:'בלייזר שחור'},{category:'Shoes',name:'מגפוני קרסול'}],   tags:['קלאסי','אלגנטי'],          saved:false },
    { id:9,  name: 'בוהו שיק',          items:[{category:'Tops',name:'חולצה לבנה'},{category:'Outer',name:"מעיל טרנץ'"}],       tags:['בוהו','רומנטי'],           saved:false },
  ],
  Sport: [
    { id:10, name: 'מוכן לאימון',        items:[{category:'Tops',name:'טישרט פסים'},{category:'Shoes',name:'נעלי ספורט לבנות'}], tags:['ספורטיבי','נוח'],          saved:false },
    { id:11, name: 'ריצת בוקר',         items:[{category:'Tops',name:'טישרט פסים'},{category:'Bottoms',name:"ג'ינס כחול"}],     tags:['ריצה','בוקר'],             saved:false },
    { id:12, name: 'יוגה ופילאטיס',     items:[{category:'Tops',name:'חולצה לבנה'},{category:'Shoes',name:'נעלי ספורט לבנות'}], tags:['יוגה','מיינדפולנס'],       saved:false },
  ],
}

/* ── Daily looks for dashboard ── */
export const dailyLooks = [
  { label: "קז'ואל יומיומי", items:[{name:'חולצה לבנה',category:'Tops'},{name:"ג'ינס כחול כהה",category:'Bottoms'}] },
  { label: 'אלגנטי ונוח',    items:[{name:'בלייזר שחור',category:'Outer'},{name:"ג'ינס כחול",category:'Bottoms'}]   },
  { label: 'ספורטיבי',        items:[{name:'טישרט פסים',category:'Tops'},{name:'נעלי ספורט לבנות',category:'Shoes'}] },
]

/* ── Hebrew style tags & match scores for OutfitCard ── */
export const STYLE_TAGS_HE = ['טרנדי', 'קלאסי', 'נועז', 'מינימל', 'שיק', 'סטריט']
export const MATCH_SCORES   = [94, 88, 96, 82, 91, 85, 97, 89, 93, 87, 95, 90]
