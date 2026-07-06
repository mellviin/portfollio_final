# Mel Portfolio

Mel Portfolio is a polished, content-driven personal website built with Next.js 16, TypeScript, Tailwind CSS, MDX, Framer Motion, and a lightweight command palette. It is designed to showcase a developer’s work, writing, technical experience, and contact information in a modern editorial layout.

## Overview

This portfolio is meant to feel both professional and expressive. It combines a clean visual system with rich content sections so you can present:

- project case studies with screenshots and links
- engineering build-log entries and reflections
- a skills and experience overview
- a resume section
- a contact form for inquiries

The site is structured to make updates easy: most content lives in Markdown or MDX files instead of hardcoded UI blocks.

## Key features

- Responsive, modern landing experience with a strong visual identity
- Project pages that render detailed case studies from MDX content
- Build-log entries with their own detail pages and feed-style browsing
- A keyboard-first command palette for quick navigation
- Smooth motion and reduced-motion support for accessibility
- A contact form backed by a server route and an easy path to real email delivery
- Static-friendly architecture that works well for Vercel and other Next.js hosts

## Tech stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- MDX via next-mdx-remote
- Framer Motion
- cmdk for the command palette
- gray-matter for frontmatter parsing
- Resend-ready contact route integration

## Project structure

- [app](app) — route-level pages and application entry points
  - [app/page.tsx](app/page.tsx) — homepage hero, intro, and primary navigation content
  - [app/projects/[slug]/page.tsx](app/projects/[slug]/page.tsx) — individual project case study pages
  - [app/log/[slug]/page.tsx](app/log/[slug]/page.tsx) — individual build-log detail pages
  - [app/contact/page.tsx](app/contact/page.tsx) — contact page and form UI
  - [app/api/contact/route.ts](app/api/contact/route.ts) — contact form API endpoint
  - [app/api/command-palette/route.ts](app/api/command-palette/route.ts) — searchable command palette data endpoint
- [components](components) — reusable UI building blocks for layout, project cards, hero content, and resume view
- [content](content) — MDX content for projects and build-log entries
- [lib](lib) — helper modules for reading and preparing portfolio content
- [public](public) — static assets such as images, PDFs, and illustrations
- [styles](styles) — design tokens and global styling

## Content workflow

### Projects

Project case studies live in [content/projects](content/projects). Each MDX file can include frontmatter such as:

- title
- date
- summary
- tags
- stack
- links
- screenshots

This makes it easy to add or update project stories without touching the UI components.

### Build log

Build-log entries live in [content/log](content/log). They are rendered as individual pages and also appear in the main log feed, making them suitable for documenting technical decisions, wins, and lessons learned over time.

### Screenshots

Project screenshots can be added through the project frontmatter using a screenshots array. Images should be placed in [public](public) and referenced from the MDX frontmatter.

## Getting started

### Prerequisites

- Node.js 20 or newer
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

## Contact form setup

The contact form is currently wired to a server route in [app/api/contact/route.ts](app/api/contact/route.ts). The existing implementation is a local stub that returns a successful response, and it is ready to be replaced with a real email-sending integration.

To enable real email delivery:

1. Install or confirm the Resend SDK is available.
2. Add an environment variable such as RESEND_API_KEY.
3. Replace the stub in [app/api/contact/route.ts](app/api/contact/route.ts) with a real send call.

## Deployment

This app is ready to deploy to Vercel or any other Node-compatible host. For Vercel, the standard Next.js deployment flow applies.

If you deploy to a platform with environment variables, make sure to provide any needed values for the contact form integration.

## Customization guide

To personalize the site:

- update the homepage copy in [app/page.tsx](app/page.tsx)
- add or revise project stories in [content/projects](content/projects)
- add build-log insights in [content/log](content/log)
- replace the resume asset in [public](public)
- update the visual theme in [styles](styles) and [app/globals.css](app/globals.css)

## Next steps

The portfolio is already functional, but it can be made even stronger by continuing to add:

- richer project case studies
- more build-log entries
- more polished screenshots and demos
- a real contact-form email integration
- a fully updated resume PDF and personal branding assets
