# 40K Imperial Data Terminal

Work Experience project for Harry Hudson — a Warhammer 40,000-themed data terminal UI built with React and Tailwind CSS.

## Features

- 🟢 Pip Boy-style green-on-dark terminal aesthetic with CRT scanline overlay
- 🖥️ Full terminal layout: header, left navigation, main data panels, status bar
- 🗺️ Inline SVG star map showing sub-sector systems and warp routes
- 📦 Built with React + Vite + Tailwind CSS v4
- 🚀 Deployed to GitHub Pages automatically on push to `main`

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

## Project Structure

```
src/
  App.jsx       ← Main terminal UI (all components live here)
  index.css     ← Global styles + Tailwind + CRT effect
  main.jsx      ← React entry point
index.html      ← HTML shell (loads Google Fonts)
vite.config.js  ← Vite + Tailwind + GH Pages base path
```

## Deployment

The site is automatically deployed to GitHub Pages when changes are pushed to the `main` branch via the `.github/workflows/deploy.yml` workflow.

Live URL: `https://<your-username>.github.io/40k-imperial-data-terminal/`
