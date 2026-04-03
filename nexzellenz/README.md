# Nexzellenz Technologies LLP — Website

A modern, CMS-powered website built with **Next.js 14** + **Sanity CMS** for static hosting on cPanel/shared hosting.

---

## 🏗️ Tech Stack

| Layer | Technology | Why |
|---|---|---|
| Frontend | **Next.js 14** (App Router) | Fast, SEO-friendly React framework |
| Styling | **Tailwind CSS** | Utility-first, easy to maintain |
| CMS | **Sanity.io** | Cloud-hosted, non-technical friendly editor |
| Images | **Sanity CDN** | Auto-optimized, free image hosting |
| Forms | **Formspree** | Serverless form handling (no backend needed) |
| Hosting | **cPanel / Shared Hosting** | Static HTML export |

---

## 📁 Project Structure

```
nexzellenz/
├── app/                         # Next.js App Router pages
│   ├── layout.tsx               # Root layout (Navbar + Footer)
│   ├── page.tsx                 # Home page (fetches all Sanity data)
│   └── services/[slug]/page.tsx # Individual service detail pages
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx           # Navigation bar
│   │   └── Footer.tsx           # Footer with social links
│   ├── sections/                # All page sections
│   │   ├── HeroSection.tsx      # ← editable via Sanity (tagline, headline, stats)
│   │   ├── ServicesSection.tsx  # ← fully editable via Sanity
│   │   ├── GallerySection.tsx   # ← editable via Sanity (portfolio images)
│   │   ├── TestimonialsSection.tsx # ← editable via Sanity
│   │   ├── AboutSection.tsx     # ← editable via Sanity (paragraphs, highlights)
│   │   ├── ContactSection.tsx   # ← editable via Sanity (phone, email, address)
│   │   ├── StatsSection.tsx     # ← editable via Sanity
│   │   ├── ProcessSection.tsx   # Static (rarely changes)
│   │   ├── WhySection.tsx       # Static (rarely changes)
│   │   └── CapabilitiesSection.tsx # Static (rarely changes)
│   └── ui/
│       ├── CustomCursor.tsx     # Custom cursor effect
│       └── ScrollReveal.tsx     # Scroll-triggered animations
├── sanity/
│   ├── schemas/
│   │   ├── siteSettings.ts      # Hero, About, Contact, SEO fields
│   │   ├── service.ts           # Individual service documents
│   │   ├── galleryItem.ts       # Portfolio / gallery photos
│   │   ├── testimonial.ts       # Client reviews
│   │   └── index.ts             # Registers all schemas
│   └── lib/
│       ├── client.ts            # Sanity API client
│       ├── image.ts             # Image URL builder
│       └── queries.ts           # All GROQ data-fetching queries
├── sanity.config.ts             # Sanity Studio configuration
├── next.config.js               # Static export config for cPanel
├── tailwind.config.ts           # Design tokens
└── .env.example                 # Environment variables template
```

---

## 🚀 One-Time Setup (Developer)

### Step 1 — Install Dependencies
```bash
npm install
```

### Step 2 — Create Sanity Project
1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Click **"Create new project"**
3. Name it `nexzellenz`
4. Copy the **Project ID**

### Step 3 — Configure Environment
```bash
cp .env.example .env.local
```
Edit `.env.local`:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_copied_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_FORMSPREE_ID=your_formspree_form_id
```

### Step 4 — Configure Formspree (for the contact form)
1. Go to [formspree.io](https://formspree.io) → Create free account
2. Click **"+ New Form"** → name it "Nexzellenz Contact"
3. Copy the form ID (e.g. `xpzgkrwb`)
4. Paste into `.env.local` as `NEXT_PUBLIC_FORMSPREE_ID`

### Step 5 — Add your Project ID to Sanity Config
Edit `sanity.config.ts` line 17:
```ts
projectId: "your_project_id_here",   // ← paste your ID
```

### Step 6 — Deploy Sanity Studio
```bash
npm run deploy:studio
```
This gives you a URL like: `https://nexzellenz.sanity.studio`
→ **Share this URL with your client**

### Step 7 — Add Client as Editor in Sanity
1. Go to [sanity.io/manage](https://sanity.io/manage) → your project
2. **Members** → **Invite** → enter client's email
3. Set role to **"Editor"**

---

## 🌐 Deploying to cPanel

### Build the static site:
```bash
npm run build
```
This creates an `out/` folder with static HTML/CSS/JS files.

### Upload to cPanel:
1. Open **cPanel** → **File Manager**
2. Navigate to `public_html` (or your domain's folder)
3. Delete existing files (or backup first)
4. Upload everything inside the `out/` folder
5. Done! Your site is live.

### Re-deploying after content changes:
Every time the client edits content in Sanity, you need to:
```bash
npm run build
# Then re-upload the out/ folder to cPanel
```

> **💡 Tip for automation:** If you later move to Netlify or Vercel (both have free tiers), you can connect a webhook from Sanity → Netlify/Vercel to auto-rebuild the site whenever the client saves content. Ask your developer to set this up.

---

## ✏️ Client CMS Guide — How to Edit Your Website

> Share this section with your client

### Accessing the Admin Panel
1. Go to: **https://nexzellenz.sanity.studio**
2. Sign in with your email (you'll be invited by your developer)
3. You'll see 4 sections in the left sidebar:
   - ⚙️ **Site Settings** — Hero text, company info, contact details, SEO
   - 🖨️ **Services** — Add/edit/remove your services
   - 🖼️ **Gallery / Portfolio** — Upload photos of finished prints
   - ⭐ **Testimonials** — Add client reviews

---

### ⚙️ Editing Site Settings
Click **"Site Settings"** → then click **"Site Settings"** in the list.

**What you can change:**
| Field | What it does |
|---|---|
| Hero Tagline | Small badge text above the big headline |
| Hero Headline | The 3 big words on the home page (PRINT / THE / FUTURE) |
| Hero Description | Paragraph below the headline |
| Hero Stats | 3 numbers shown on the right (e.g. 500+ Projects) |
| About Paragraphs | Each entry = one paragraph in the About section |
| About Highlights | Bullet points in the About section |
| Stats Bar | 4 numbers in the stats band (e.g. 500+ Projects) |
| Phone / Email / Address | Shown in the Contact section and footer |
| Operating Hours | Shown in the Contact section |
| Social Links | LinkedIn, Instagram, Twitter, WhatsApp URLs |
| SEO Title | Browser tab title (important for Google!) |
| SEO Description | Google search description (max 160 characters) |

**To save:** Click the **"Publish"** button (green button, top right).

---

### 🖨️ Adding / Editing a Service
1. Click **"Services"** in the sidebar
2. Click **"+ Create"** to add a new service, or click an existing one to edit
3. Fill in the fields:
   - **Service Title** — e.g. "SLA 3D Printing Services"
   - **Slug** — click "Generate" (auto-fills from the title)
   - **Service Code** — short label like "SVC_01"
   - **Short Description** — 2–3 sentences shown on the cards
   - **Full Description** — detailed text for the service detail page (supports bold, headings, images)
   - **Service Image** — upload a photo
   - **Feature Tags** — short labels like "High Resolution", "±0.1mm"
   - **Featured Service?** — toggle ON to make it span 2 columns (use for your most important service)
   - **Pricing** — starting price, unit, note
   - **Turnaround Time** — e.g. "24–48 hours"
   - **Display Order** — lower number = shown first
   - **Active?** — toggle OFF to hide without deleting

4. Click **"Publish"**

---

### 🖼️ Adding Portfolio Photos
1. Click **"Gallery / Portfolio"**
2. Click **"+ Create"**
3. Fill in:
   - **Project Title** — name of the piece
   - **Photo** — drag & drop or click to upload (min 800×800px recommended)
   - **Category** — select from the list
   - **Description** — short caption
   - **Material Used** — e.g. "UV Resin", "PLA"
   - **Visible on website?** — toggle to show/hide
4. Click **"Publish"**

---

### ⭐ Adding Testimonials
1. Click **"Testimonials"**
2. Click **"+ Create"**
3. Fill in the client's name, company, their review, and rating
4. Click **"Publish"**

---

### ⚠️ Important: After Editing, Notify Your Developer
Because the site is hosted as static files on cPanel, **a developer needs to rebuild and re-upload the site after you make changes** (takes 5–10 minutes).

**To request a rebuild:** WhatsApp/email your developer with "Please update the website" after you've finished making changes in Sanity.

> If you upgrade to Netlify hosting in the future, rebuilds can be automated so the site updates automatically within minutes of you saving in Sanity — ask your developer about this.

---

## 🛠️ Development Commands

```bash
npm run dev          # Start local dev server at localhost:3000
npm run studio       # Start Sanity Studio at localhost:3333
npm run build        # Build static site → creates out/ folder
npm run deploy:studio # Deploy Sanity Studio to the web
```

---

## 📦 Environment Variables Reference

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | ✅ Yes | From sanity.io/manage |
| `NEXT_PUBLIC_SANITY_DATASET` | ✅ Yes | Usually "production" |
| `NEXT_PUBLIC_FORMSPREE_ID` | ✅ Yes | From formspree.io |
| `NEXT_PUBLIC_SITE_URL` | Optional | Your domain URL |
| `SANITY_API_READ_TOKEN` | Optional | Only needed for draft preview |
