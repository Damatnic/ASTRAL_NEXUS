# Astral Nexus - Quick Start Guide

Get the Astral Nexus up and running in 5 minutes!

## Prerequisites

- Node.js 18 or higher
- npm or yarn

## Installation

```bash
# 1. Navigate to the project directory
cd astral-nexus

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

## View the Site

Open your browser to:
```
http://localhost:7777
```

## What You'll See

### Home Page
- Hero section with search bar
- Category cards (Wellness, Communication, Legal, etc.)
- Featured guides
- Stats section

### Explore Guides
Click "All Guides" or any category to browse available guides.

### Search
Use the search bar to find guides by topic, keyword, or content.

### Guide Details
Click any guide to see:
- Full formatted content
- Table of contents
- Related guides
- Astral Helper (floating assistant button)

## Adding Your First Guide

1. Create a new file in `guides/` directory:
```bash
guides/my-new-guide.md
```

2. Add frontmatter and content:
```markdown
---
title: "My New Guide"
description: "A comprehensive guide about..."
category: "Technology"
tags: ["coding", "tutorial", "beginner"]
difficulty: "Beginner"
---

# My New Guide

## Introduction

Your content here...
```

3. Refresh the site - your guide appears automatically!

## Build for Production

```bash
# Build the site
npm run build

# Start production server
npm start
```

## Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Follow the prompts, and your site is live!

## Common Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run linter |
| `npm run index-guides` | Regenerate guide index |

## Customization

### Change Colors

Edit `tailwind.config.ts`:
```typescript
colors: {
  primary: '#00ffcc',  // Your color here
  accent: '#1affd5',   // Your accent color
  background: '#0b0e11' // Your background
}
```

### Change Fonts

Edit `app/layout.tsx` to import different Google Fonts.

### Add Categories

Categories are automatically extracted from guide frontmatter. Just use new category names in your guides!

## Troubleshooting

### Port Already in Use
```bash
# Kill the process on port 3000
# Or use a different port:
npm run dev -- -p 3001
```

### Build Errors
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

### Missing Guides
```bash
# Regenerate the index
npm run index-guides
```

## Need Help?

- Check the full [README.md](README.md)
- Review [CONTRIBUTING.md](CONTRIBUTING.md)
- See [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)

## You're All Set!

The Astral Nexus is ready to use. Start exploring, searching, and learning!

**Where Knowledge Aligns with the Stars** ⭐

