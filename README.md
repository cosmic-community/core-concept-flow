# PixelChowk

![App Preview](https://imgix.cosmicjs.com/e33880a0-7451-11f1-a87f-d72293b1048a-autopilot-photo-1511512578047-dfb367046420-1782803047842.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A modern, dark-themed online gaming account store powered by [Cosmic](https://www.cosmicjs.com). PixelChowk sells Steam account activations with a budget-friendly slot-based pricing model, dynamic game filtering, a wallet top-up system with UPI QR code, a secure "My Library" credential reveal, and a complete admin dashboard for order verification and content management.

## Features

- 🎮 **Game Store** with dynamic filtering by Genre and Price brackets (Under ₹100, ₹100-₹149, ₹150 & Above)
- 🔄 **Sorting Options** — Default, Price Low→High, Price High→Low, Name A→Z
- 🎬 **Hero Slider** showing active events, sales & latest releases
- 🤖 **Recommended For You** + **Featured Deals** sections
- 💳 **Wallet Top-Up** with live UPI QR code and transaction ID submission
- 📚 **My Library** revealing Steam ID & Password after admin approval (copy buttons + show/hide)
- 🛡️ **Admin Dashboard** — Pending approvals, enter Steam credentials, manage games
- 📱 **Community Links** — Instagram + 3 WhatsApp admin routing buttons
- ✨ Glassmorphic UI with neon blue & purple accents, fully responsive

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6a436a00eef00fdac9d0d8aa&clone_repository=6a436b60eef00fdac9d0d8ef)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for: Core Concept & Flow (काम करने का तरीका) यह वेबसाइट कोई सीधे गेम फ़ाइल या की (Key) नहीं बेचती; यह Steam Client/Account Activation System पर काम करती है। User Journey: यूजर प्रोफाइल बनाता है ➔ गेम सिलेक्ट करता है ➔ वॉलेट में पैसे ऐड करता है (QR कोड से) ➔ गेम खरीदता है। Post-Purchase Flow: पेमेंट के बाद ऑर्डर वेरिफिकेशन के लिए एडमिन के पास जाता है (15-30 मिनट)। अप्रूव होने के बाद यूजर की Library में गेम पर टैप करते ही उसे Steam ID और Password मिल जाता है। ... Genres / Categories: Action & Adventure, RPG & Open World, Racing & Simulation, Sports & Fighting, Shooters. Price Filters Structure: Under ₹100, ₹100 - ₹149, ₹150 & Above. Build a Next.js full-stack web application for an online gaming account store with a dark theme (black and dark gray layout with neon blue and purple accents). It must include a user profile with custom avatar selectors, a wallet top-up modal with a UPI QR code display, an advanced game filtering setup (by Genre and Price brackets), and a specialized 'My Library' page that reveals Steam login credentials after order approval. Include a complete backend Admin Dashboard that lists pending payment activations, prompts the admin to input Steam credentials to unlock the games for users, and configures multiple WhatsApp support routing buttons."

### Code Generation Prompt

> Build a Next.js application for a website called "Core Concept Flow". The content is managed in Cosmic CMS with the following object types: games, orders, wallet-top-ups, hero-slides, site-settings. Create a beautiful, modern, responsive design with a homepage and pages for each content type. Dark theme with neon blue and purple accents, glassmorphic UI, game filtering, wallet top-up with UPI QR, My Library credential reveal, and admin dashboard.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- [Next.js 16](https://nextjs.org) (App Router)
- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Cosmic](https://www.cosmicjs.com/docs) headless CMS

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) or Node.js 18+
- A Cosmic account with a bucket containing the object types above

### Installation

```bash
bun install
```

Set your environment variables (these are provided automatically in the Cosmic dashboard):

```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

Run the dev server:

```bash
bun run dev
```

## Cosmic SDK Examples

```typescript
import { cosmic } from '@/lib/cosmic'

// Fetch all games with depth for connected objects
const { objects: games } = await cosmic.objects
  .find({ type: 'games' })
  .props(['id', 'slug', 'title', 'metadata'])
  .depth(1)

// Update an order with Steam credentials (admin approval)
await cosmic.objects.updateOne(orderId, {
  metadata: {
    status: 'Approved',
    steam_username: 'user@steam.com',
    steam_password: 'securepass123'
  }
})
```

## Cosmic CMS Integration

This app reads from and writes to your Cosmic bucket:

- **games** — title, poster, genre, price, price bracket, discount, featured/recommended flags
- **orders** — customer details, linked game, status, Steam credentials (revealed after approval)
- **wallet-top-ups** — top-up requests with transaction ID and approval status
- **hero-slides** — homepage banner carousel
- **site-settings** — brand text, logo, UPI QR, community links, live broadcast

Learn more in the [Cosmic docs](https://www.cosmicjs.com/docs).

## Deployment Options

- **Vercel**: Push to GitHub and import into Vercel. Add the three Cosmic environment variables.
- **Netlify**: Connect your repo, set build command `bun run build`, and add env vars.

<!-- README_END -->