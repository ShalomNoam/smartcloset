
# SmartCloset

🔗 [Live App](https://smartcloset-beta.vercel.app) | [GitHub](https://github.com/ShalomNoam/smartcloset)

---
## What is SmartCloset?

SmartCloset is an app that helps you put together great outfits from the clothes already in your wardrobe.
Instead of wasting time every morning thinking about what to wear, the app creates outfit options for you - tailored to the occasion and season.

---

## The Problem

Most people stand in front of a full wardrobe and feel like they have nothing to wear. The problem isn't a lack of clothes — it's the inability to combine them quickly and creatively. SmartCloset solves this with smart, personalized outfit recommendations based on your actual clothes.

---

## Who Is It For?

Busy people who want to look good without spending time on it — especially those who feel their wardrobe isn't being used to its full potential.

---

## Competitors & Differentiation

| Competitor | Limitation |
|------------|------------|
| Choosing manually in front of the mirror | Time-consuming, depends on inspiration |
| Pinterest / Instagram | Shows outfits with clothes you don't own |
| Stylebook / Cladwell | Complex UI, not localized |

**SmartCloset's edge:** Generates outfits from clothes you actually own, with a clean and simple interface.

---

## Key Features

-  Upload clothing items with photos
-  AI-powered outfit recommendations
-  Save your favorite outfits
-  Filter by occasion (work, party, wedding, sport)
-  Personal account — each user sees only their own wardrobe

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React + Vite |
| Backend | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| Storage | Supabase Storage |
| Deploy | Vercel |

<img width="636" height="311" alt="Screenshot at Jun 19 23-54-41" src="https://github.com/user-attachments/assets/0b8b657f-3d83-4a08-a4a6-910e975c334d" />
<img width="637" height="314" alt="Screenshot at Jun 19 23-54-33" src="https://github.com/user-attachments/assets/90d7226d-4c8b-49d4-99e6-4eae06ef552e" />
<img width="547" height="731" alt="Screenshot at Jun 19 23-54-24" src="https://github.com/user-attachments/assets/22253869-cbff-4cd1-a779-563890fcf332" />
<img width="638" height="297" alt="Screenshot at Jun 19 23-54-12" src="https://github.com/user-attachments/assets/782e20ba-c88e-4ff7-ae36-95ac7bcb30b4" />

## External Services & Integrations

| Service | Type | Purpose |
|---------|------|---------|
| Supabase Auth | Authentication | User sign-up, login and logout |
| Supabase Database | Database | Storing clothing items and outfits |
| Supabase Storage | File storage | Uploading clothing item images |
| Vercel | Deployment | Hosting the frontend |
| Claude AI (Anthropic) | API | Generating smart outfit recommendations |

---

## Data Model (ERD)

Database tables:

- **profiles** — User profile (user_id, full_name, avatar_url, city)
- **clothing_items** — Clothing items (name, category, season, color, image_url)
- **outfits** — Outfits (name, occasion, items, saved, ai_score)
- **outfit_items** — Junction table between outfits and items
- **saved_outfits** — User's saved outfits

> Full ERD available in Supabase Dashboard → Database → Schema Visualizer
<img width="350" height="653" alt="Screenshot at Jun 20 00-03-49" src="https://github.com/user-attachments/assets/d00beac5-0454-4689-b98a-3f27709646ac" />
---

## How to Run Locally

```bash
git clone https://github.com/ShalomNoam/smartcloset
cd smartcloset
npm install
```

Create a `.env` file:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

```bash
npm run dev
```

---

## Demo

You can sign up with any new email and password directly in the app.
