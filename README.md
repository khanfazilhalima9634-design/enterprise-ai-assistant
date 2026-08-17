# Enterprise AI Software Assistant

A GitHub-ready, static enterprise software tutorials and troubleshooting platform built with HTML, CSS, vanilla JavaScript, and JSON.

## Included

- Premium responsive SaaS-style UI
- Software directory
- Tutorial library
- Troubleshooting database
- Error code database
- Software comparisons
- Learning paths with browser progress
- AI Assistant demo mode
- Search and filters
- SEO metadata
- Sitemap and robots.txt
- No API keys in frontend

## Run locally

Because the app loads JSON files with `fetch()`, use a local HTTP server instead of opening `index.html` directly.

Examples:

### Python
```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

### VS Code
Use the Live Server extension.

## GitHub Pages

1. Create a repository.
2. Upload the contents of this folder to the repository root.
3. Go to Settings → Pages.
4. Choose GitHub Actions or Deploy from a branch.
5. Select the main branch and root folder.
6. Save and wait for deployment.

## Cloudflare Pages

Connect the GitHub repository in Cloudflare Pages and deploy as a static site. No build command is required.

## Live AI backend

The current AI Assistant intentionally runs in DEMO MODE. For live AI:

Browser → secure backend → AI provider.

Never place an API key in HTML, JavaScript, CSS, or JSON. Store it as a server-side environment variable.

## Before production

Replace `example.com` in canonical URLs, Open Graph metadata, sitemap.xml, and robots.txt with the real domain. Review legal/privacy text, add real analytics only after deciding your privacy requirements, and validate current vendor documentation before publishing technical claims.

## Important

This is an independent educational platform. It is not affiliated with the software vendors referenced in the content.
