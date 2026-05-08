# AdminPanel — React + TypeScript Admin Dashboard

A full-featured admin panel built with React 19, TypeScript, Vite, and Tailwind CSS. Features a complete authentication flow, protected routing, data visualizations, and an AG Grid data table.

---

## Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| React | 19 | UI framework |
| TypeScript | 6 | Type safety |
| Vite | 8 | Build tool & dev server |
| Tailwind CSS | 4 | Styling |
| React Router DOM | 7 | Client-side routing |
| react-hot-toast | 2 | Toast notifications |
| Recharts | 3 | Line & bar charts |
| AG Grid Community | 35 | Data table |
| Lucide React | 1 | Icon library |

---

## Project Structure

```
admin-panel/
├── .vscode/
│   └── settings.json          # Suppress Tailwind CSS lint warning
├── src/
│   ├── components/
│   │   ├── ConfirmDialog.tsx   # Reusable confirmation modal
│   │   ├── ProtectedRoute.tsx  # Auth guard for protected pages
│   │   └── Toast.tsx           # Reusable toast notification wrapper
│   ├── contexts/
│   │   └── AuthContext.tsx     # Global authentication state
│   ├── layouts/
│   │   └── DashboardLayout.tsx # Shared layout with header for dashboard pages
│   ├── pages/
│   │   ├── LoginPage.tsx       # Login form with confirm dialog + spinner
│   │   ├── SignUpPage.tsx      # Sign up form with same UX flow as login
│   │   ├── DashboardPage.tsx   # Stats, AG Grid, and charts
│   │   ├── SettingsPage.tsx    # Settings page with save toast
│   │   └── ProfilePage.tsx     # Profile page with update toast
│   ├── App.tsx                 # Root component — all routing defined here
│   ├── main.tsx                # React DOM entry point
│   └── index.css               # Global styles + Tailwind directives
├── index.html
├── vite.config.ts              # Vite config with path aliasing
├── tsconfig.json               # Root TS config (references only)
├── tsconfig.app.json           # App TS config with path aliasing
├── tsconfig.node.json          # Node/Vite TS config
├── package.json
└── eslint.config.js
```

---

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm 9 or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/admin-panel.git
cd admin-panel

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
```

Output is in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

---

## Git Branches

This project uses two branches with a deliberate split of concerns:

| Branch | Purpose |
|---|---|
| `main` | Authentication layout — login, sign up, routing, auth context |
| `dev` | Dashboard layout — stats, charts, AG Grid, toast, settings, profile |

`dev` was branched off `main` after the auth layer was complete.

```bash
# Switch to auth branch
git checkout main

# Switch to dashboard branch
git checkout dev
```

---

## Path Aliasing

All local imports use the `@/` alias instead of relative paths like `../../`.

**How it works:** configured in two places so both TypeScript and Vite resolve it correctly.

`tsconfig.app.json`:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

`vite.config.ts`:
```ts
resolve: {
  alias: {
    '@': path.resolve(__dirname, './src'),
  },
}
```

**Usage example:**
```ts
import ConfirmDialog from '@/components/ConfirmDialog';
import { useAuth } from '@/contexts/AuthContext';
import { showToast } from '@/components/Toast';
```

---

## Routing

All routes are defined in a single place: `src/App.tsx`.

```
/           → LoginPage       (public)
/signup     → SignUpPage      (public)
/dashboard  → DashboardPage   (protected)
/settings   → SettingsPage    (protected)
/profile    → ProfilePage     (protected)
```

Protected routes are wrapped with `<ProtectedRoute />` which reads from `AuthContext`. If the user is not authenticated, they are redirected to `/`.

The nesting structure in `App.tsx`:

```tsx
<ProtectedRoute>           // checks isAuthenticated
  <DashboardLayout>        // renders header + <Outlet />
    <DashboardPage />
    <SettingsPage />
    <ProfilePage />
  </DashboardLayout>
</ProtectedRoute>
```

---

## Authentication

Authentication state is managed globally via React Context in `src/contexts/AuthContext.tsx`.

```ts
// Available anywhere via useAuth()
const { isAuthenticated, login, logout } = useAuth();
```

**Note:** This is a frontend-only auth simulation. There is no backend or token validation. `login()` sets `isAuthenticated` to `true` in memory. Refreshing the page resets the state and redirects back to `/`.

---

## Login & Sign Up Flow

Both pages share the exact same UX pattern:

1. User fills in the form and clicks the submit button
2. A **confirmation modal** (`ConfirmDialog`) appears asking for confirmation
3. User clicks **Yes** → modal closes, full-screen spinner appears
4. After **3 seconds**, `login()` is called and the user is navigated to `/dashboard`
5. User clicks **Cancel** → modal closes, nothing happens

The `ConfirmDialog` component is reusable and takes `isOpen`, `title`, `onConfirm`, and `onCancel` as props.

```tsx
<ConfirmDialog
  isOpen={isDialogOpen}
  title="Are you sure you want to log in?"
  onConfirm={handleConfirm}
  onCancel={() => setIsDialogOpen(false)}
/>
```

---

## Toast Notifications

Toasts use `react-hot-toast` wrapped in a custom component at `src/components/Toast.tsx`.

**Setup:** `<Toaster />` is mounted once in `App.tsx` at the root level so it's available on every page.

**Usage:**
```ts
import { showToast } from '@/components/Toast';

showToast.success('Settings saved successfully!');
showToast.error('Something went wrong.');
showToast.info('Here is some information.');
```

All toasts appear in the top-right corner with a 3-second duration and match the indigo/slate color palette.

---

## Dashboard

The dashboard (`/dashboard`) is composed of three sections rendered top to bottom:

### 1. Statistics Cards

Four KPI cards in a responsive grid (`1 col → 2 col → 4 col`):

- Total Users
- Revenue
- Active Sessions
- Conversion Rate

Each card shows a label, value, percentage change (green for positive, red for negative), and a Lucide icon on an indigo background.

### 2. AG Grid — Recent Orders Table

An AG Grid Community table placed between the stats and the charts sections. Features:

- 10 mock order rows with 5 columns: Order ID, Customer, Amount, Status, Date
- Pagination with page size selector (5 / 10 / 20)
- `ag-theme-quartz` theme
- Amount column uses a `valueFormatter` to display currency

The column definitions are fully typed using `ColDef<Order>[]` to satisfy AG Grid v35's strict `NestedFieldPaths` type requirement:

```ts
type Order = {
  id: string;
  customer: string;
  amount: number;
  status: string;
  date: string;
};

const colDefs = useMemo<ColDef<Order>[]>(() => [...], []);
```

### 3. Charts

Two Recharts charts in a side-by-side responsive grid:

- **Line chart** — Revenue Overview (Jan–Jun)
- **Bar chart** — User Signups (Jan–Jun)

Both charts use the indigo/slate color palette, clean grid lines, and custom tooltip styling.

---

## Dashboard Layout & Header

`DashboardLayout.tsx` wraps all protected pages with a sticky header containing:

- **Left:** `AdminPanel` logo linking back to `/dashboard`
- **Right:** Settings icon button (→ `/settings`) and Profile icon button (→ `/profile`)

The layout uses `<Outlet />` from React Router so nested routes render inside the main content area.

---

## Color Palette

The entire app uses a consistent indigo + slate palette:

| Role | Color | Tailwind Class |
|---|---|---|
| Primary action | Indigo 600 | `bg-indigo-600` |
| Primary hover | Indigo 700 | `hover:bg-indigo-700` |
| Icon background | Indigo 50 | `bg-indigo-50` |
| Icon color | Indigo 600 | `text-indigo-600` |
| Page background | Slate 50 | `bg-slate-50` |
| Card background | White | `bg-white` |
| Card border | Slate 200 | `border-slate-200` |
| Body text | Slate 900 | `text-slate-900` |
| Muted text | Slate 500 | `text-slate-500` |
| Positive change | Green 600 | `text-green-600` |
| Negative change | Red 600 | `text-red-600` |

---

## Known Issues & Notes

- **Auth is in-memory only.** Refreshing the page logs the user out. Persisting auth state (e.g. with `localStorage` or a real backend) is outside the scope of this project.
- **No form validation.** The login and sign up forms use HTML5 `required` attributes only. No password strength checks or email format validation beyond the browser default.
- **AG Grid CSS warning.** AG Grid v35 may emit a deprecation warning about legacy CSS imports (`ag-grid.css`, `ag-theme-quartz.css`). This does not affect functionality.
- **Tailwind `@tailwind` VS Code warning.** VS Code's built-in CSS linter does not recognize `@tailwind` directives. Install the **Tailwind CSS IntelliSense** extension or add `"css.lint.unknownAtRules": "ignore"` to `.vscode/settings.json` to suppress it.

---

## Commit History

| Commit | Branch | Description |
|---|---|---|
| `chore: initialize project with Vite, Tailwind, and path aliasing` | main | Project scaffold, tsconfig, vite.config |
| `feat: configure routing in App.tsx` | main | All routes defined, AuthProvider, Toaster |
| `feat: build login page with confirm dialog and loading spinner` | main | LoginPage, ConfirmDialog component |
| `feat: build sign up page reusing ConfirmDialog and spinner` | main | SignUpPage reusing same UX flow |
| `feat: add reusable Toast component with react-hot-toast` | dev | Toast.tsx wrapper, Toaster in App.tsx |
| `feat: build dashboard layout with settings and profile header buttons` | dev | DashboardLayout, header, Outlet |
| `feat: add statistics cards to dashboard` | dev | 4 KPI cards, responsive grid |
| `feat: add Recharts line and bar charts to dashboard` | dev | Revenue + signups charts |
| `feat: integrate AG Grid between charts and stats` | dev | Typed ColDef, pagination, quartz theme |
| `feat: add settings and profile pages with toast feedback` | dev | SettingsPage, ProfilePage, toast on save |

https://claude.ai/share/ae1f7e55-884c-4a64-94d8-997862fea29f

https://gemini.google.com/share/762f55b6c9ae