// All app data lives here — no backend, no hardcoded values in components.

export const clothingItems = [
  { id: 1,  name: 'White Linen Shirt', category: 'Tops',        color: 'White',         season: ['Spring', 'Summer'] },
  { id: 2,  name: 'Navy Chinos',        category: 'Bottoms',     color: 'Navy',          season: ['Spring', 'Fall', 'Winter'] },
  { id: 3,  name: 'White Sneakers',     category: 'Shoes',       color: 'White',         season: ['Spring', 'Summer', 'Fall'] },
  { id: 4,  name: 'Floral Blouse',      category: 'Tops',        color: 'Multicolor',    season: ['Spring', 'Summer'] },
  { id: 5,  name: 'Black Blazer',       category: 'Outer',       color: 'Black',         season: ['Fall', 'Winter'] },
  { id: 6,  name: 'Denim Jeans',        category: 'Bottoms',     color: 'Blue',          season: ['Spring', 'Fall', 'Winter'] },
  { id: 7,  name: 'Silk Scarf',         category: 'Accessories', color: 'Crimson',       season: ['Spring', 'Fall'] },
  { id: 8,  name: 'Ankle Boots',        category: 'Shoes',       color: 'Brown',         season: ['Fall', 'Winter'] },
  { id: 9,  name: 'Striped Tee',        category: 'Tops',        color: 'Blue & White',  season: ['Spring', 'Summer'] },
  { id: 10, name: 'Trench Coat',        category: 'Outer',       color: 'Camel',         season: ['Fall', 'Spring'] },
];

export const outfitsByEvent = {
  Work: [
    {
      id: 1, name: 'Boardroom Set',
      items: [{ name: 'White Linen Shirt', category: 'Tops' }, { name: 'Navy Chinos', category: 'Bottoms' }],
      tags: ['Smart Casual', 'Office Ready'], saved: false,
    },
    {
      id: 2, name: 'Smart Office',
      items: [{ name: 'Floral Blouse', category: 'Tops' }, { name: 'Black Blazer', category: 'Outer' }],
      tags: ['Formal', 'Chic'], saved: false,
    },
    {
      id: 3, name: 'Monday Pitch',
      items: [{ name: 'Striped Tee', category: 'Tops' }, { name: 'Trench Coat', category: 'Outer' }],
      tags: ['Business Casual', 'Relaxed'], saved: false,
    },
  ],
  Party: [
    {
      id: 4, name: 'Night Out',
      items: [{ name: 'Floral Blouse', category: 'Tops' }, { name: 'Ankle Boots', category: 'Shoes' }],
      tags: ['Trendy', 'Fun'], saved: false,
    },
    {
      id: 5, name: 'Cocktail Hour',
      items: [{ name: 'Black Blazer', category: 'Outer' }, { name: 'White Sneakers', category: 'Shoes' }],
      tags: ['Casual', 'Vibrant'], saved: false,
    },
    {
      id: 6, name: 'Girls Night',
      items: [{ name: 'Silk Scarf', category: 'Accessories' }, { name: 'Black Blazer', category: 'Outer' }],
      tags: ['Elegant', 'Statement'], saved: false,
    },
  ],
  Wedding: [
    {
      id: 7, name: 'Garden Party',
      items: [{ name: 'Floral Blouse', category: 'Tops' }, { name: 'Ankle Boots', category: 'Shoes' }],
      tags: ['Romantic', 'Floral'], saved: false,
    },
    {
      id: 8, name: 'Classic Chic',
      items: [{ name: 'Black Blazer', category: 'Outer' }, { name: 'White Linen Shirt', category: 'Tops' }],
      tags: ['Formal', 'Classic'], saved: false,
    },
    {
      id: 9, name: 'Boho Bride',
      items: [{ name: 'Silk Scarf', category: 'Accessories' }, { name: 'Floral Blouse', category: 'Tops' }],
      tags: ['Delicate', 'Feminine'], saved: false,
    },
  ],
  Sport: [
    {
      id: 10, name: 'Gym Ready',
      items: [{ name: 'Striped Tee', category: 'Tops' }, { name: 'White Sneakers', category: 'Shoes' }],
      tags: ['Sporty', 'Fresh'], saved: false,
    },
    {
      id: 11, name: 'Morning Run',
      items: [{ name: 'Denim Jeans', category: 'Bottoms' }, { name: 'White Sneakers', category: 'Shoes' }],
      tags: ['Active', 'Comfortable'], saved: false,
    },
    {
      id: 12, name: 'Yoga Flow',
      items: [{ name: 'Navy Chinos', category: 'Bottoms' }, { name: 'White Sneakers', category: 'Shoes' }],
      tags: ['Zen', 'Relaxed'], saved: false,
    },
  ],
};

export const dailyLooks = [
  {
    label: 'Fresh & Minimal',
    items: [{ name: 'White Linen Shirt', category: 'Tops' }, { name: 'Navy Chinos', category: 'Bottoms' }],
  },
  {
    label: 'Casual Chic',
    items: [{ name: 'Floral Blouse', category: 'Tops' }, { name: 'Denim Jeans', category: 'Bottoms' }],
  },
  {
    label: 'Smart Layer',
    items: [{ name: 'Black Blazer', category: 'Outer' }, { name: 'Striped Tee', category: 'Tops' }],
  },
  {
    label: 'Weekend Easy',
    items: [{ name: 'Trench Coat', category: 'Outer' }, { name: 'White Sneakers', category: 'Shoes' }],
  },
];

export const categories = ['All', 'Tops', 'Bottoms', 'Shoes', 'Outer', 'Accessories'];

export const seasons = ['Spring', 'Summer', 'Fall', 'Winter'];

export const eventTypes = [
  { key: 'Work',    label: 'Work'    },
  { key: 'Party',   label: 'Party'   },
  { key: 'Wedding', label: 'Wedding' },
  { key: 'Sport',   label: 'Sport'   },
];
