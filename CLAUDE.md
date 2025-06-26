# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an AI Chip Navigator web application - a professional platform for AI chip information, comparisons, and technical specifications. Built with Next.js 15 and designed for static export deployment.

**Key Features:**
- Multi-language support (Chinese, English, Japanese, Korean, German, French)
- AI chip database with detailed specifications and comparisons
- Category-based navigation (by application, hardware type, deployment location)
- Responsive design with shadcn/ui components
- SEO-optimized with static export capability

## Development Commands

### Core Commands
```bash
# Development server
pnpm dev

# Production build
pnpm build

# Static export build (for deployment)
pnpm build:export

# Type checking
pnpm type-check

# Linting
pnpm lint
pnpm lint:fix

# Full check (type + lint + build)
pnpm check

# Preview static build locally
pnpm preview
```

### Development Workflow
Always run these commands before committing:
```bash
pnpm type-check && pnpm lint && pnpm build
```

## Architecture

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS + shadcn/ui components
- **Icons**: Lucide React
- **Package Manager**: pnpm (required - see engines in package.json)

### Project Structure
```
app/                    # Next.js App Router pages
├── categories/         # Chip categories page
├── globals.css        # Global styles with CSS variables
├── layout.tsx         # Root layout with metadata
└── page.tsx           # Homepage with search and categories

components/            # Reusable React components
├── ui/               # shadcn/ui components (auto-generated)
├── language-switcher.tsx  # Multi-language selector
└── theme-provider.tsx     # Theme context provider

hooks/                # Custom React hooks
├── use-mobile.tsx    # Mobile device detection
├── use-toast.ts      # Toast notifications
└── useLanguage.ts    # Language state management

lib/                  # Utilities and configuration
├── constants.ts      # Chip data, categories, site config
├── i18n.ts          # Translation system and language definitions
└── utils.ts         # Utility functions (cn, etc.)
```

### Key Configuration Files
- `next.config.mjs` - Next.js config with static export settings
- `tailwind.config.ts` - Tailwind with shadcn/ui theme variables
- `components.json` - shadcn/ui CLI configuration
- `tsconfig.json` - TypeScript config with strict mode

## Internationalization (i18n)

The app uses a custom i18n solution located in `lib/i18n.ts`:

- **Languages**: zh (Chinese), en (English), ja (Japanese), ko (Korean), de (German), fr (French)
- **Hook**: Use `useLanguage()` hook to access translations
- **Structure**: Nested translation objects with typed keys
- **Usage**: `const { t } = useLanguage()` then access with `t.title`, `t.nav.home`, etc.

When adding new features, always add translations for all supported languages.

## Data Management

Chip data is managed in `lib/constants.ts`:

- **CHIP_DATA**: Array of AI chip specifications with detailed technical info
- **CHIP_CATEGORIES**: Hierarchical category structure (application, hardware, deployment, vendor)
- **SITE_CONFIG**: SEO metadata and site configuration
- **STATS**: Platform statistics displayed on homepage

## Component Architecture

### UI Components
All UI components use shadcn/ui (located in `components/ui/`). These are auto-generated and should not be manually modified.

### Custom Components
- **LanguageSwitcher**: Dropdown for language selection with flags
- **Pages**: Use client-side rendering with "use client" directive

### Styling Approach
- Tailwind CSS with CSS custom properties for theming
- Color system based on HSL values defined in `globals.css`
- Responsive design with mobile-first approach
- Hover effects and transitions for better UX

## Static Export Configuration

The app is configured for static export deployment:

- `output: 'export'` in next.config.mjs
- `basePath` and `assetPrefix` configured for GitHub Pages deployment
- `images: { unoptimized: true }` for static hosting compatibility
- SEO files: `robots.ts`, `sitemap.ts` for automatic generation

## Deployment

**Current Configuration: Static Export for GitHub Pages + Cloudflare Pages**

The project is optimized for static deployment:

1. **GitHub Pages** (configured) - Automatic deployment via GitHub Actions
2. **Cloudflare Pages** (recommended) - Connect to GitHub repo for auto-deployment with custom domain
3. **Self-hosted** - Serve static files from `out/` directory

### Quick Deploy Commands
```bash
# Build static site
pnpm build

# Test static build locally  
pnpm preview

# Build with custom script
./scripts/build-static.sh
```

See `CLOUDFLARE_SETUP.md` for detailed Cloudflare Pages + custom domain instructions.

## Development Guidelines

### Code Style
- Use TypeScript strict mode
- Follow existing naming conventions
- Prefer functional components with hooks
- Use proper semantic HTML elements for accessibility

### Adding New Features
1. Update data in `lib/constants.ts` if needed
2. Add translations to all languages in `lib/i18n.ts`
3. Create components following existing patterns
4. Test responsive design on multiple screen sizes
5. Run full check: `pnpm type-check && pnpm lint && pnpm build`

### Performance Considerations
- Components use proper React patterns (avoid unnecessary re-renders)
- Images are handled with Next.js optimization (or unoptimized for static export)
- CSS is optimized with Tailwind's purge functionality
- Static generation provides optimal loading performance

## Troubleshooting

### Common Issues
- **Build errors**: Check TypeScript types and ensure all imports are correct
- **Styling issues**: Verify Tailwind classes and CSS custom properties
- **i18n problems**: Ensure all translation keys exist in all language objects
- **Static export**: Verify no dynamic features that require server-side rendering

### Testing Locally
Always test static export before deployment:
```bash
pnpm build:export
pnpm serve  # Serves from out/ directory on port 3000
```