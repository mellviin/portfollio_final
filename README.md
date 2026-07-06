# Mel Portfolio

A premium, content-driven personal portfolio showcasing projects, technical experience, and professional work. Built with modern web technologies and designed with a luxury editorial aesthetic inspired by Apple, Vercel, Linear, and Notion.

**[View Live](https://mellviin.com)** • **[GitHub](https://github.com/mellviin/portfollio_final)** • **[LinkedIn](https://linkedin.com/in/mellviin)**

---

## ✨ Features

- **Premium Design System** — Geometric sans-serif typography (Space Grotesk), monochrome luxury palette, 8px spacing grid, responsive scales (72px → 42px mobile)
- **Content-Driven Architecture** — MDX-powered projects, build logs, and case studies with frontmatter management
- **Rich Project Pages** — Detailed case studies with screenshots, tech stacks, links, and editorial layouts
- **Build Log Feed** — Technical reflections, wins, and learnings with searchable, categorized entries
- **Skills & Experience** — Real-time GitHub integration (27+ public repos), categorized technical skills, professional experience timeline
- **Command Palette** — Keyboard-first navigation (Cmd/Ctrl + K) with fuzzy search
- **Accessibility First** — WCAG contrast compliance, prefers-reduced-motion support, semantic HTML
- **Contact Integration** — Ready-to-deploy contact form with Resend email integration
- **Performance Optimized** — Next.js 16 with automatic font optimization, lazy-loaded images, minimal JS

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | Next.js 16 (App Router) + React 19 |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS v4 + PostCSS |
| **Fonts** | Space Grotesk (Google Fonts), Geist, Consolas |
| **Content** | MDX (next-mdx-remote), gray-matter |
| **Animation** | Framer Motion |
| **Forms** | Resend (email), API routes |
| **Navigation** | cmdk (command palette) |
| **Deployment** | Vercel (CI/CD via GitHub Actions) |

---

## 📁 Project Structure

```
mel-portfolio/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Homepage with hero, projects, CTA
│   ├── projects/[slug]           # Individual project case studies
│   ├── log/[slug]                # Build log detail pages
│   ├── experience/               # Professional experience timeline
│   ├── skills/                   # Skills & GitHub stats
│   ├── contact/                  # Contact form page
│   ├── resume/                   # Resume viewer
│   ├── api/contact               # Contact form API endpoint
│   ├── api/command-palette       # Command palette data endpoint
│   ├── layout.tsx                # Root layout with fonts & metadata
│   └── globals.css               # Global styles & typography utilities
├── components/                   # Reusable UI components
│   ├── hero/                     # Hero section with animations
│   ├── project/                  # Project card components
│   ├── build-log/                # Log feed & entry cards
│   ├── layout/                   # Navigation, footer, shell
│   ├── resume/                   # Resume viewer
│   └── command-palette/          # Search & navigation
├── content/                      # MDX content files
│   ├── projects/                 # Project case studies (*.mdx)
│   └── log/                      # Build log entries (*.mdx)
├── lib/                          # Utilities & helpers
│   ├── projects.ts               # Project content parsing
│   ├── portfolio.ts              # Portfolio metadata
│   └── log.ts                    # Build log content parsing
├── public/                       # Static assets
│   ├── fonts/                    # Local font files
│   ├── videos/                   # Background videos
│   ├── SpideR_pics/              # Project screenshots
│   └── hirescope_pics/           # Project screenshots
├── styles/                       # Design tokens
│   └── tokens.css                # CSS variables (colors, spacing, typography)
├── .github/workflows/            # CI/CD pipelines
│   └── deploy.yml                # Vercel deployment workflow
├── package.json                  # Dependencies & scripts
├── tsconfig.json                 # TypeScript configuration
├── next.config.ts                # Next.js configuration
└── tailwind.config.ts            # Tailwind configuration
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20+ 
- **npm** (included with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/mellviin/portfollio_final.git
cd mel-portfolio

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

```bash
npm run dev      # Start development server (port 3000)
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

---

## 📝 Content Management

### Adding a Project

1. Create an MDX file in `content/projects/project-name.mdx`:

```mdx
---
title: "Project Title"
date: "2025-01-15"
summary: "Brief one-liner description"
tags: ["React", "Next.js", "TypeScript"]
stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"]
links:
  - label: "Live"
    url: "https://example.com"
  - label: "GitHub"
    url: "https://github.com/user/project"
screenshots:
  - path: "/project-1.png"
    alt: "Project screenshot 1"
  - path: "/project-2.png"
    alt: "Project screenshot 2"
---

# Project Title

Your detailed case study content here using Markdown...
```

2. Add screenshots to `public/` folder
3. The project automatically appears on `/projects` page and in command palette

### Adding a Build Log Entry

1. Create an MDX file in `content/log/entry-name.mdx`:

```mdx
---
title: "Learning Next.js 16"
date: "2025-01-10"
tags: ["Next.js", "Learning"]
---

# Learning Next.js 16

Your technical reflection or learning here...
```

2. Entry appears on `/log` page with full-text search support

### Updating Experience & Skills

- **Experience**: Edit `app/experience/page.tsx` (static array)
- **Skills**: Real-time GitHub stats fetched from `@mellviin`
- **Resume**: Update PDF in `public/` and reference in `app/resume/page.tsx`

---

## 🎨 Design System

### Typography

| Class | Size | Weight | Usage |
|-------|------|--------|-------|
| `.display` | 72px (responsive) | 800 | Hero headlines |
| `.heading` | 42px | 700 | Page titles |
| `.heading-2` | 32px | 700 | Section headers |
| `.heading-3` | 26px | 700 | Subsection headers |
| `.heading-4` | 22px | 600 | Card titles |
| `.body` | 18px | 400 | Body text |
| `.body-sm` | 16px | 400 | Secondary text |
| `.label` | 15px | 500 | Navigation, buttons |
| `.caption` | 14px | 400 | Metadata, timestamps |

### Color Palette

- **Primary**: `#FFFFFF` (pure white)
- **Secondary**: `rgba(255, 255, 255, 0.82)` (text on hover)
- **Tertiary**: `rgba(255, 255, 255, 0.60)` (secondary text)
- **Muted**: `rgba(255, 255, 255, 0.45)` (disabled text)
- **Border**: `rgba(255, 255, 255, 0.12)` (subtle borders)
- **Card**: `rgba(255, 255, 255, 0.05)` (card backgrounds)

### Spacing Grid

All spacing uses an 8px base unit:
- `--sp-1` through `--sp-24` (4px to 192px increments)
- Applied consistently across components
- Enables rhythmic, professional layouts

---

## 🌐 Deployment

### Vercel (Recommended)

Vercel is the optimal platform for Next.js applications with automatic optimizations and zero-config deployments.

#### Option 1: Auto-Deploy from GitHub (Recommended)

1. Connect repo at [vercel.com/new](https://vercel.com/new)
2. Select `mellviin/portfollio_final`
3. Vercel auto-detects Next.js configuration
4. Click **Deploy**
5. Site goes live instantly! 🚀

**Subsequent deployments**: Every push to `main` automatically deploys.

#### Option 2: CI/CD with GitHub Actions

GitHub Actions workflow automatically tests and deploys on push to `main`.

**Setup**:

1. Get your Vercel secrets:
   - Go to [vercel.com/settings/tokens](https://vercel.com/settings/tokens) → Create token
   - Copy: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`

2. Add GitHub Secrets:
   - Go to repo **Settings** → **Secrets and variables** → **Actions**
   - Add the 3 secrets from step 1

3. Workflow runs automatically on `git push`:
   - Installs dependencies
   - Runs ESLint
   - Builds project
   - Deploys to Vercel

**Status**: Check GitHub **Actions** tab to monitor deployments.

### Other Platforms

**Netlify**: Connect repo → auto-deploy
**Railway**: `railway up` after linking repo  
**Render**: Connect repo → auto-deploy
**Self-Hosted**: `npm run build && npm start`

---

## 📧 Contact Form Setup

The contact form is wired to send emails via Resend.

### Enable Email Delivery

1. Sign up at [resend.com](https://resend.com)
2. Generate API key
3. Add environment variable:
   ```bash
   RESEND_API_KEY=your_api_key_here
   ```
4. In `app/api/contact/route.ts`, replace stub with Resend integration

### Example Contact Route

```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { name, email, message } = await request.json();
  
  try {
    await resend.emails.send({
      from: 'contact@yourdomain.com',
      to: email,
      subject: `Message received from ${name}`,
      html: `<p>${message}</p>`,
    });
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error }, { status: 400 });
  }
}
```

---

## 🔧 Customization

### Update Homepage

Edit `app/page.tsx` to customize:
- Hero headline & tagline
- Project showcase
- Call-to-action sections

### Update Navigation & Footer

Edit `components/layout/SiteShell.tsx`:
- Navigation links
- Footer content
- Social media links

### Update Design System

All design tokens in `styles/tokens.css`:
- Colors
- Typography
- Spacing
- Animations

Changes automatically cascade to entire site.

---

## 📊 Performance

- **Fonts**: Auto-optimized via `next/font/google` (zero CLS, preloaded)
- **Images**: Lazy-loaded with `next/image`, responsive srcsets
- **Animations**: Framer Motion with GPU acceleration, prefers-reduced-motion support
- **Build**: ~45KB gzipped JS, <100ms First Contentful Paint

---

## 🎯 Roadmap

- [ ] Real-time Raindrop.io reading list integration
- [ ] Dynamic project showcase with filtering
- [ ] Build log analytics dashboard
- [ ] Newsletter signup
- [ ] Expanded resume with timeline visualization
- [ ] Dark/light mode toggle
- [ ] Internationalization (i18n)

---

## 📄 License

This project is open source. Feel free to fork and adapt!

---

## 👤 About

Built by **Mel** • [GitHub](https://github.com/mellviin) • [Twitter](https://twitter.com/mellviin) • [Email](mailto:hello@mellviin.com)

Last updated: January 2026
