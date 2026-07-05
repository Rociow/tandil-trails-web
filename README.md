# Tandil Trails Web

Frontend web application for **Tandil Trails**, a platform to discover hiking trails in Tandil, Argentina. Built with Angular and Angular Material, featuring interactive maps and an AI-powered natural language trail search.

> ⚙️ Looking for the backend? Check out [tandil-trails-api](https://github.com/Rociow/tandil-trails-api).

## Features

- **Authentication** — login and registration flows, with route protection via an auth guard and automatic token attachment through an HTTP interceptor.
- **Interactive trail map** — trail routes and waypoints rendered on an interactive map using Leaflet.
- **Natural language search** — a dedicated search component (`buscador-ia`) lets users describe what they're looking for in plain language (e.g. *"a short, easy trail"*), which the backend translates into structured filters using an LLM.
- **Trail listing & detail views** — browse all trails and view details for a specific one, including reviews, waypoints, and images.
- **User profile** (protected route) — manage favorite and visited trails.
- **Responsive UI** built with Angular Material, using a custom Cyan/Orange theme.
- **Standalone components** architecture (Angular 21) with lazy-loaded routes.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Angular 21 (standalone components) |
| UI Library | Angular Material |
| Maps | Leaflet |
| Styling | SCSS |
| HTTP | Angular `HttpClient` with interceptors |
| Testing | Vitest |
| Package Manager | npm |

## Application Structure

```
src/app/
├── core/
│   ├── guards/         # Route guards (auth-guard)
│   ├── interceptors/   # HTTP interceptors (auth token attachment)
│   ├── models/         # TypeScript interfaces (sendero, usuario, resena, etc.)
│   └── services/       # API communication services
├── features/
│   ├── auth/            # Login & register
│   ├── home/            # Landing page + AI-powered search (buscador-ia)
│   ├── senderos/         # Trail list & trail detail
│   └── perfil/           # User profile (protected)
└── shared/
    ├── navbar/           # App navigation bar
    └── sendero-card/     # Reusable trail card component
```

## Getting Started

### Prerequisites

- Node.js (LTS recommended) and npm
- The [tandil-trails-api](https://github.com/Rociow/tandil-trails-api) backend running locally (default: `http://localhost:8080`)

### 1. Clone the repository

```bash
git clone https://github.com/Rociow/tandil-trails-web.git
cd tandil-trails-web
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure the environment

The API base URL is set in `src/environments/environment.ts` (used for development builds):

```ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080'
};
```

Update `apiUrl` if your backend runs on a different host or port.

### 4. Run the development server

```bash
npm start
```

Navigate to `http://localhost:4200/`. The app will automatically reload on source changes.

### Running tests

```bash
npm test
```

### Building for production

```bash
npm run build
```

Build artifacts are output to the `dist/` directory.

## License

This project was built for educational and portfolio purposes.
