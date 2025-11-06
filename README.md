# Jam2Course

Jam2Course turns a Nullshot Jam thread into a structured, hour-long micro-course. This repository contains the frontend UI that accepts a Jam thread URL, calls the local course generation service, and displays the generated outline, checkpoint plan, and review quiz for learners.

## Features
- Clean Tailwind-based UI with branded theming
- Guided flow for entering a Jam thread URL and triggering course generation
- Loading, error, and empty states to support the full user journey
- Modular component structure for headers, footers, previews, and icons

## Tech Stack
- [React 19](https://react.dev/) with functional components and hooks
- [TypeScript](https://www.typescriptlang.org/) for static typing
- [Vite](https://vitejs.dev/) for lightning-fast dev server and builds
- [Tailwind CSS](https://tailwindcss.com/) via CDN for utility-first styling

## Getting Started
### Prerequisites
- Node.js 18 or newer (LTS recommended)
- npm 9+ (ships with Node.js 18)

### Installation
```bash
npm install
```

### Environment Variables
Create a `.env.local` file if you need to override defaults. Available variables:

| Variable | Description |
| --- | --- |
| `VITE_JAM2COURSE_API_KEY` | Optional API key forwarded to any backend service you wire up. |
| `VITE_JAM2COURSE_API_BASE_URL` | Override the default API endpoint if you host a custom backend. |

> These variables are optional—by default the app runs entirely in the browser with mocked data.

### Run the Development Server
```bash
npm run dev
```
Visit the printed local URL (typically `http://localhost:5173`) to interact with the app.

### Build for Production
```bash
npm run build
```
This command outputs the optimized production build to the `dist/` directory.

### Preview the Production Build
```bash
npm run preview
```
Serves the contents of `dist/` locally so you can verify the production bundle.

## Project Structure
```
.
├── App.tsx                 # Main application shell
├── components/             # Reusable UI components (Header, Footer, etc.)
├── services/               # Logic for generating course data
├── types.ts                # Shared TypeScript types
├── index.tsx               # Application entry point
├── index.html              # Base HTML template and import map
├── vite.config.ts          # Vite configuration
└── README.md               # Project documentation
```

## Customising Course Generation
Currently the app mocks course generation in `services/courseGenerator.ts`. Replace the mock implementation with calls to your own backend to connect real data:
1. Update `generateCourse` with a `fetch` request to your API.
2. Use the environment variables above to inject API credentials or base URLs.
3. Adjust the UI components if your backend returns different data structures.

## Troubleshooting
- **Styles not applying?** Ensure the Tailwind CDN script is still included in `index.html`.
- **Type errors during build?** Run `npm install` again to verify dependencies and check TypeScript definitions in `types.ts`.
- **Custom backend requests failing?** Open the browser console to inspect network requests and validate environment variables.

## License
This project is provided as-is without a specific license. Contact the maintainers if you plan to reuse it in production.
