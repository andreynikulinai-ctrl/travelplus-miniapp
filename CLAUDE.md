# CLAUDE.md - TravelPlus MiniApp

## Project Overview

TravelPlus MiniApp is a **B2B e-commerce catalog application** for selling disposable slippers, cosmetics, and accessories to hotels, spas, and travel businesses. It's a monorepo with separated frontend and backend, deployed on Vercel.

**Business Model**: Price-on-request catalog where customers browse products, select items, and submit quote requests via a form. Orders are sent to Telegram for processing.

## Architecture

```
travelplus-miniapp/
├── frontend/                 # React SPA (Vite + TypeScript)
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   ├── pages/           # Page components (Privacy.tsx)
│   │   ├── store/           # Zustand state management
│   │   ├── types/           # TypeScript type definitions
│   │   ├── data/            # Static product catalog
│   │   ├── App.tsx          # Main app component
│   │   └── main.tsx         # React entry point
│   ├── package.json         # Frontend dependencies
│   ├── vite.config.ts       # Vite bundler config
│   ├── tailwind.config.js   # Tailwind CSS config
│   └── tsconfig.*.json      # TypeScript configs
├── backend/                 # Express.js backend (dev server)
│   ├── server.js            # Express server for local dev
│   └── package.json         # Backend dependencies
├── api/                     # Vercel serverless functions
│   └── send.ts              # Order submission API handler
└── vercel.json              # Vercel deployment config
```

## Technology Stack

### Frontend
- **React 19.2** - UI library
- **TypeScript 5.9** - Type safety
- **Vite 7.2** - Build tool and dev server
- **React Router 7.13** - Client-side routing
- **Zustand 5.0** - State management
- **Tailwind CSS 3.4** - Utility-first CSS
- **ESLint 9** - Code linting

### Backend
- **Node.js** (ES modules)
- **Express.js 4.18** - Web framework
- **Vercel Serverless Functions** - Production API

### Deployment
- **Vercel** - Hosting and serverless functions

## Development Commands

### Frontend (from `/frontend` directory)
```bash
npm run dev      # Start Vite dev server with HMR
npm run build    # TypeScript compile + Vite build → dist/
npm run lint     # Run ESLint
npm run preview  # Preview production build locally
```

### Backend (from `/backend` directory)
```bash
npm run dev      # Start Express server on port 3001
```

### Root level
```bash
# Vercel automatically runs: cd frontend && npm install && npm run build
```

## Key Files Reference

| File | Purpose |
|------|---------|
| `frontend/src/App.tsx` | Main catalog UI, category filtering, modals |
| `frontend/src/components/OrderForm.tsx` | Order submission form with validation |
| `frontend/src/components/SelectedModal.tsx` | Selected products display |
| `frontend/src/store/selectedStore.ts` | Zustand store for cart state |
| `frontend/src/data/products.ts` | Product catalog (25+ items) |
| `frontend/src/types/product.ts` | Product/Category TypeScript interfaces |
| `api/send.ts` | Vercel serverless order handler |
| `backend/server.js` | Local Express dev server |

## API Endpoints

### POST `/api/send`
Submit order quote request.

**Request Body:**
```typescript
{
  name: string;           // Required
  phone: string;          // Required
  email: string;          // Required
  company?: string;       // Optional
  comment?: string;       // Optional
  contactMethod: 'telegram' | 'email' | 'phone';
  agreedToPolicy: boolean;
  items: Product[];
}
```

**Response:** `{ "success": true }`

**Integration:** Orders are forwarded to Telegram Bot API.

## State Management

Uses **Zustand** for lightweight state management.

### `useSelectedStore` (frontend/src/store/selectedStore.ts)
```typescript
interface SelectedStore {
  items: Product[];
  addItem: (product: Product) => void;    // Prevents duplicates
  removeItem: (productId: string) => void;
  clearItems: () => void;
}
```

## Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/` | App.tsx | Main product catalog |
| `/privacy` | Privacy.tsx | Privacy policy page |

## Data Structures

### Product Interface
```typescript
interface Product {
  id: string;
  name: string;
  description: string;
  category: 'slippers' | 'cosmetics' | 'accessories';
  price: number | null;  // null = "price on request"
  images: string[];
  packaging: string;
  inStock: boolean;
}
```

### Category Interface
```typescript
interface Category {
  id: string;
  name: string;
  icon?: string;
}
```

## Coding Conventions

### TypeScript
- Strict mode enabled
- Use interfaces for object shapes
- Avoid `any` type
- Target ES2022 for app code

### React
- Functional components only
- Use hooks for state and effects
- Component files in PascalCase (e.g., `OrderForm.tsx`)

### Styling
- Use Tailwind CSS utility classes
- Custom colors defined in `tailwind.config.js`:
  - Primary: sky blue (#0ea5e9, #0284c7)
  - Accent: amber (#f59e0b, #d97706)
- Responsive design with Tailwind breakpoints

### File Organization
- One component per file
- Co-locate types with usage when small
- Shared types in `src/types/`
- Static data in `src/data/`

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `TELEGRAM_BOT_TOKEN` | Yes (production) | Bot token for order notifications |

Set in Vercel dashboard for production deployment.

## Deployment

### Vercel Configuration (vercel.json)
- **Build Command**: `cd frontend && npm install && npm run build`
- **Output Directory**: `frontend/dist`
- **Rewrites**: Non-API routes → `index.html` (SPA routing)
- **API Routes**: `/api/*` handled by serverless functions

### Deployment Flow
1. Push to repository
2. Vercel triggers build
3. Frontend built to `dist/`
4. API functions deployed from `/api/`
5. SPA routing handles client-side navigation

## Testing

**Current Status**: No testing framework configured.

When adding tests, consider:
- **Vitest** for unit tests (Vite-native)
- **React Testing Library** for component tests
- **Playwright/Cypress** for E2E tests

## Security Notes

- TELEGRAM_BOT_TOKEN must be in environment variables, not hardcoded
- Form data validated on client and server
- CORS configured for cross-origin requests
- User data handling complies with privacy policy at `/privacy`

## Common Tasks

### Adding a New Product
1. Edit `frontend/src/data/products.ts`
2. Add product object with all required fields
3. Ensure unique `id` value

### Adding a New Route
1. Create page component in `frontend/src/pages/`
2. Add route in `frontend/src/main.tsx` or `App.tsx`

### Modifying Order Form
1. Edit `frontend/src/components/OrderForm.tsx`
2. Update API handler in `api/send.ts` if new fields

### Changing Styles
1. Use Tailwind classes in component files
2. For custom values, edit `tailwind.config.js`
3. Global styles in `frontend/src/index.css`

## Troubleshooting

### Build Fails
- Check TypeScript errors: `npm run build` shows type errors
- Ensure all imports resolve correctly

### API Not Working
- Verify `TELEGRAM_BOT_TOKEN` is set in Vercel
- Check Vercel function logs for errors
- Test locally with `backend/server.js`

### Styling Issues
- Clear browser cache
- Verify Tailwind classes are valid
- Check `tailwind.config.js` for custom configurations

## Project Language

The application UI is in **Russian** (targeting Russian B2B market). Code comments and documentation are in English.
