# SMS Web App

Frontend for the Bakrie Center Foundation **Stakeholder Management System (SMS)** — a dashboard for managing institutions, partnerships (IA/MoU/PKS/SPK/TOR), partnership networks, audiences, coordination groups, and research collaboration/potential-partner data.

Developed by Bakrie Center Tech Club.

## Tech Stack

- [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/) — state management
- [Tailwind CSS](https://tailwindcss.com/) — styling
- [React Router](https://reactrouter.com/) — routing

## Getting Started

### Prerequisites

- Node.js 18+
- A running instance of the [back-end-sms](https://github.com/bakrietechclub/sms-integrated-leaders-system) API

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_PROTOCOL=
VITE_API_HOST=
VITE_API_PORT=
VITE_APP_URL=
```

### Running

```bash
npm run dev            # local development
npm run dev:staging    # local development against staging mode/env
```

### Building

```bash
npm run build           # default build
npm run build:staging   # staging environment build
npm run build:prod      # production environment build
```

## Project Structure

```
src/
  components/
    pages/       # Route-level page components
    fragments/   # Reusable modals, forms, and UI fragments
    layouts/     # Page layout wrappers
    elements/    # Small shared UI primitives
  states/        # Redux slices, thunks, and selectors
  utils/api/     # API client and per-feature request helpers
  config/        # Sidebar menu and permission configuration
```

## Deployment

Deploys to Railway via GitHub Actions (`.github/workflows/railway-deploy-staging.yml` and `railway-deploy-production.yml`) — push to `staging` deploys to the staging environment, push to `main` deploys to production.
