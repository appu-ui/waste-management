# Zero-to-Hero Waste Management

A modern **Next.js 14** application for community-driven waste reporting, collection workflows, and reward tracking.

## Overview

Zero-to-Hero helps communities report waste issues, manage collection tasks, and reward environmental participation. The project combines a user-friendly web interface with data, notification, and reward logic backed by Drizzle ORM.

## Key Features

- **Waste reporting flow** for community users.
- **Collection task management** to support cleanup operations.
- **Reward and transaction tracking** for participation incentives.
- **Notification support** for user activity updates.
- **Dashboard widgets** for vehicle and eco-score data (DIMO-style integration scaffolding).
- **Map-based hotspot visualization** with lightweight analysis helpers.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **UI:** React + Tailwind CSS
- **Database Layer:** Drizzle ORM
- **Auth/Web3 Integrations:** Web3Auth + EVM ecosystem packages

## Project Structure

```text
src/
  app/                  # App Router entry points and layout
  components/           # UI and feature components
  hooks/                # Reusable client hooks
  lib/                  # Shared utilities
  utils/
    db/                 # DB schema and actions
    dimoApi.ts          # Vehicle data integration helpers
    litProtocol.ts      # Analysis/encryption helper utilities
    signSchemas.ts      # Schema creation helper
```

## Getting Started

### Prerequisites

- **Node.js 20+**
- **Yarn 4+**

### Installation

```bash
yarn install
```

### Development

```bash
yarn dev
```

Open `http://localhost:3000`.

### Quality Checks

```bash
yarn lint
yarn build
```

## Configuration Notes

- Update environment variables and DB configuration before production deployment.
- The repository includes integration scaffolding for external services. For production use, replace demo/fallback data providers with live API clients and secure key management.

## Deployment

The app is compatible with common Next.js hosts (e.g., Vercel, Netlify). Ensure environment configuration and build checks pass before release.

## Contributing

1. Create a feature branch.
2. Make and test your changes.
3. Open a PR with a clear summary and validation steps.

## License

Add your preferred license (e.g., MIT) if this project is intended for public distribution.
