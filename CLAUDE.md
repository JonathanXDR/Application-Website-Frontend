# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website built with Nuxt 4, TypeScript, and TailwindCSS. It features internationalization (i18n), GitHub API integration, Apple MusicKit integration, and advanced animations. The site is deployed on Vercel with a Bun runtime.

## Essential Commands

### Development

```bash
# Start development server with environment variables
bun run dev

# Build for production
bun run build

# Generate static files
bun run generate

# Preview production build
bun run preview

# Type checking
bun run typecheck
```

### Code Quality

```bash
# Run ESLint
bun run lint

# Fix ESLint issues
bun run lint:fix

# Check Prettier formatting
bun run format

# Fix Prettier formatting
bun run format:fix
```

### Testing & Validation

```bash
# Check build integrity
bun run check:build

# Clean up SF Symbols icons
bun run cleanup:icons
```

## Architecture

### Directory Structure

- `app/` - Main Nuxt 4 application code
  - `components/common/` - Reusable UI components
  - `components/containers/` - Page-section container components (auto-imported globally)
  - `composables/` - Vue composables for shared logic
  - `layouts/` - Nuxt layout components
  - `pages/` - File-based routing pages
  - `plugins/` - Nuxt plugins
  - `utils/` - Utility functions
- `server/api/` - Nitro server API routes
  - `github/` - GitHub API endpoints
  - `musickit/` - Apple MusicKit endpoints
- `shared/types/` - TypeScript type definitions
- `i18n/` - Internationalization files
- `public/` - Static assets

### Key Technologies

- **Framework**: Nuxt 4 with TypeScript and Vue 3 Composition API
- **Styling**: TailwindCSS 4.x with custom CSS variables
- **Runtime**: Bun for build and production
- **Deployment**: Vercel with image optimization
- **APIs**: GitHub GraphQL API, Apple MusicKit API
- **Internationalization**: @nuxtjs/i18n with German as default, English/French/Italian support
- **Security**: nuxt-security with strict CSP policies
- **Analytics**: Vercel Analytics and Speed Insights

### Component Architecture

- Components in `components/common/` are auto-imported
- Container components in `components/containers/` are globally available
- Uses Vue 3 `<script setup>` syntax throughout
- TypeScript with strict mode enabled
- Custom icon collections including SF Symbols

### State Management

- No external state management - uses Vue 3 composables and Nuxt's built-in reactivity
- Theme management via `useTheme()` composable with cookie persistence
- Color scheme management with system preference detection
- Navigation state managed through `useNavbar()` composable

### API Integration

- GitHub API integration for repositories, gists, and user data
- Apple MusicKit integration for music library access
- Server-side API routes with proper authentication handling
- JWT token generation for Apple services

## Development Workflow

### Environment Configuration

- Development uses `.env.local` file
- Production uses `.env.production` file
- Key environment variables: SITE_URL, SITE_NAME, GITHUB_TOKEN, Apple Music credentials

### Code Quality

- ESLint with neostandard config and Nuxt integration
- TypeScript strict mode enabled
- Prettier for code formatting
- Husky for git hooks
- Commitlint for conventional commit messages
- Lint-staged for pre-commit validation

### Testing

- No formal test framework currently configured
- Build validation via `check:build` script
- Type checking via `nuxt typecheck`

## Important Notes

### Security Features

- Strict Content Security Policy configured
- CSRF protection enabled
- Secure headers for production
- Environment-specific security configurations

### Performance Optimizations

- Vercel image optimization with custom breakpoints
- Client-side bundle scanning for icons
- Server-side icon externalization
- Viewport-based responsive breakpoints

### Internationalization

- Default locale: German (de)
- Supported locales: German, English, French, Italian
- Prefix strategy except for default locale
- Cookie-based language detection with fallback

### Development Features

- Development favicon changes color randomly
- Meticulous AI integration for testing
- Nuxt DevTools disabled by default
- Hot module replacement in development

## Common Tasks

When working on this codebase:

1. **Adding new components**: Place in `components/common/` for reusable components or `components/containers/` for page-specific containers
2. **Adding new pages**: Create `.vue` files in `pages/` directory (file-based routing)
3. **API endpoints**: Add to `server/api/` with proper TypeScript typing
4. **Styling**: Use TailwindCSS classes with custom CSS variables for theming
5. **Internationalization**: Add strings to `i18n/lang/` JSON files
6. **Types**: Define shared types in `shared/types/` directory

Always run `bun run lint` and `bun run typecheck` before committing changes.
