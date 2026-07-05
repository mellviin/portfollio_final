# Mel Portfolio

A polished portfolio site built with Next.js 16, TypeScript, Tailwind CSS, MDX, Framer Motion, and a lightweight command palette for fast navigation.

## What this project includes

- A content-first portfolio experience with sections for projects, build log, skills, experience, resume, and contact
- MDX-powered project and log entries stored in the content folder
- A keyboard-driven command palette triggered by Ctrl/Cmd+K
- A contact form wired to a server API route with a Resend integration stub
- A responsive editorial layout with motion affordances and reduced-motion support

## Tech stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- MDX via next-mdx-remote
- Framer Motion
- cmdk for the command palette
- gray-matter for frontmatter parsing

## Project structure

- app/ — routes and app-level pages
  - app/page.tsx — homepage hero and intro
  - app/projects/[slug]/page.tsx — individual project case study pages
  - app/log/[slug]/page.tsx — individual build log entries
  - app/contact/page.tsx — contact page and form
  - app/api/contact/route.ts — contact form API endpoint
  - app/api/command-palette/route.ts — searchable palette data endpoint
- components/ — reusable UI building blocks
- content/ — MDX content for projects and build-log entries
- lib/ — file-loading helpers for content data
- public/ — static assets including the resume PDF and contact illustration
- styles/ — design tokens and global styling

## Getting started

### Prerequisites

- Node.js 20+
- npm

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Then open http://localhost:3000.

## Useful scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Content workflow

### Projects

Project case studies live under [content/projects](content/projects). Each MDX file can include frontmatter such as title, date, summary, tags, stack, and links.

### Build log

Build log entries live under [content/log](content/log). These are rendered as individual detail pages and appear in the main log feed.

## Contact form setup

The contact form is wired to a server route in [app/api/contact/route.ts](app/api/contact/route.ts). The current implementation is a stub that returns a successful response locally and includes comments showing where to plug in Resend.

To enable real email delivery:

1. Install the Resend SDK if needed.
2. Add a environment variable such as `RESEND_API_KEY`.
3. Replace the stub in [app/api/contact/route.ts](app/api/contact/route.ts) with a real send call.

## Deployment notes

This app is ready to deploy to Vercel or any Node-compatible host. For Vercel, the standard Next.js deployment flow applies.

## TODOs

The site is already functional, but the content is still partly scaffolded and should be replaced with your real stories, project details, and résumé asset:

- [app/page.tsx](app/page.tsx)
- [content/projects](content/projects)
- [content/log](content/log)
- [app/contact/page.tsx](app/contact/page.tsx)
- [public/resume.pdf](public/resume.pdf)
