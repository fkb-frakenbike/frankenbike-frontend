# Frankenbike Frontend

A modern **Next.js 15 (App Router)** frontend for the Frankenbike platform.  
It provides authentication (login/register/logout), a feed with infinite scroll, interactive cards, and reusable UI components.

---

## 🚀 Tech Stack

- Framework: Next.js (App Directory)
- Language: TypeScript
- Styling: Tailwind CSS
- HTTP Client: Axios ([app/lib/axios.ts](app/lib/axios.ts))
- State: Local component state (React hooks)
- Animations: Framer Motion (carousel)
- Testing:
  - Unit: Jest + Testing Library
  - E2E: Playwright ([playwright.config.ts](playwright.config.ts))
- Linting/Formatting: ESLint + Prettier + Husky + lint-staged
- Containerization: Docker + docker-compose

---

## ✨ Main Features

| Feature               | Description                            | Key Files                                                                                                                                            |
| --------------------- | -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Authentication        | Login, register, session check, logout | [app/login/page.tsx](app/login/page.tsx), [app/register/page.tsx](app/register/page.tsx), [app/components/LogoutButton](app/components/LogoutButton) |
| Session auto-redirect | Redirects logged users away from login | [app/services/LoginCheck.tsx](app/services/LoginCheck.tsx)                                                                                           |
| Feed w/ pagination    | Incremental loading + infinite scroll  | [app/components/Feed/index.tsx](app/components/Feed/index.tsx)                                                                                       |
| Card system           | Dynamic gradient cards + actions       | [app/components/Card/index.tsx](app/components/Card/index.tsx)                                                                                       |
| Carousel              | Swipe / button navigation              | [app/components/Carousel/index.tsx](app/components/Carousel/index.tsx)                                                                               |
| Responsive header     | Auto-hide on scroll, mobile menu       | [app/components/Header/index.tsx](app/components/Header/index.tsx)                                                                                   |
| Details page          | Layout for extended content            | [app/details/page.tsx](app/details/page.tsx)                                                                                                         |
| Form components       | Reusable input with password toggle    | [app/components/InputField/InputField.tsx](app/components/InputField/InputField.tsx)                                                                 |
| API client            | Centralized Axios instance             | [app/lib/axios.ts](app/lib/axios.ts)                                                                                                                 |

---

## 📁 Project Structure (Simplified)

```
app/
  components/
    Card/
    Feed/
    Carousel/
    Header/
    InputField/
    LoginForm/
    LogoutButton/
    RegisterForm/
  services/
    LoginCheck.tsx
  lib/
    axios.ts
  types/
    user.ts
  feed/ page.tsx
  login/ page.tsx
  register/ page.tsx
  details/ page.tsx
  layout.tsx
  page.tsx (landing / sample fetch)
tests/
  e2e/ (Playwright)
  app/services/__tests__/ (unit tests)
tests-examples/ (Playwright demo samples)
```

---

## 🔑 Environment Variables

Create a `.env.local`:

```
NEXT_PUBLIC_API_BASE=http://localhost:8000
```

Used in:

- [`app/lib/axios.ts`](app/lib/axios.ts)
- [`app/services/LoginCheck.tsx`](app/services/LoginCheck.tsx)
- Forms & API-bound components

---

## 🧪 Testing

### Unit (Jest + Testing Library)

Run:

```bash
npm test
```

Example: [`app/services/__tests__/LoginCheck.spec.tsx`](app/services/__tests__/LoginCheck.spec.tsx)

### End-to-End (Playwright)

Config: [`playwright.config.ts`](playwright.config.ts)  
Tests folder: [`tests/e2e`](tests/e2e)

Run:

```bash
npx playwright test
```

Generate report:

```bash
npx playwright show-report
```

CI workflow: [`.github/workflows/playwright.yml`](.github/workflows/playwright.yml)

---

## 🐳 Docker (Development)

```bash
docker compose up --build
```

Served at: http://localhost:3000

Compose file: [`docker-compose.yml`](docker-compose.yml)

---

## 🧑‍💻 Getting Started (Local)

```bash
npm install
npm run dev
```

Open: http://localhost:3000

Build & run:

```bash
npm run build
npm start
```

---

## 📜 Available Scripts

| Script         | Purpose               |
| -------------- | --------------------- |
| `dev`          | Start dev server      |
| `build`        | Production build      |
| `start`        | Run production server |
| `lint`         | Lint codebase         |
| `lint:fix`     | Auto-fix lint issues  |
| `format`       | Prettier write        |
| `format:check` | Prettier check        |
| `test`         | Run Jest tests        |

---

## ✅ Code Quality

- ESLint configs: [`.eslintrc.js`](.eslintrc.js), [`eslint.config.mjs`](eslint.config.mjs)
- Prettier: [`.prettierrc.js`](.prettierrc.js)
- Pre-commit hooks: Husky + lint-staged (see `package.json`)
- Commit message guidance (via VSCode settings):
  - Format: `type(FKB-XX): description`
  - Types: `feat | fix | refactor | test | chore`

---

## 🌐 Pages Overview

| Route       | Purpose                             |
| ----------- | ----------------------------------- |
| `/`         | Sample page / API test              |
| `/login`    | Sign in                             |
| `/register` | Create account                      |
| `/feed`     | Projects feed (infinite scroll)     |
| `/details`  | Static details layout (placeholder) |

Navigation controlled via [`app/components/Header/index.tsx`](app/components/Header/index.tsx).

---

## 🔄 Data Flow & API Assumptions

- All API calls pass through Axios instance: [`app/lib/axios.ts`](app/lib/axios.ts)
- Cookies/session handled server-side (`withCredentials: true`)
- Endpoints used (must exist backend-side):
  - `GET /api/me`
  - `POST /api/login`
  - `POST /api/logout`
  - `POST /api/users`
  - `GET /api/projects?page=&limit=`

Feed expects response shape:

```json
{
  "data": [
    {
      "id": 1,
      "user": { "email": "user@example.com" },
      "title": "...",
      "description": "...",
      "imageUrl": "...",
      "comments": [],
      "components": [],
      "createdAt": "...",
      "updatedAt": "..."
    }
  ],
  "total": 42
}
```

---

## 🧩 Key Components

| Component                                               | Responsibility                       |
| ------------------------------------------------------- | ------------------------------------ |
| [`Feed`](app/components/Feed/index.tsx)                 | Pagination state + infinite scroll   |
| [`FeedList`](app/components/Feed/FeedList.tsx)          | Renders list of cards                |
| [`CardComponent`](app/components/Card/index.tsx)        | Visual card with interactions        |
| [`Carousel`](app/components/Carousel/index.tsx)         | Swipeable / animated collection      |
| [`LoginForm`](app/components/LoginForm/index.tsx)       | Auth form                            |
| [`RegisterForm`](app/components/RegisterForm/index.tsx) | Signup form w/ password confirmation |
| [`LogoutButton`](app/components/LogoutButton/index.tsx) | Session termination                  |
| [`Header`](app/components/Header/index.tsx)             | Responsive navbar with scroll hide   |
| [`LoginCheck`](app/services/LoginCheck.tsx)             | Redirects authenticated users        |

---

## 🛡️ Error Handling Patterns

- API failure → component-level `error` state
- Auth forms surface server `error` field if present
- Logout fallback: generic message on exception

---

## 🧱 Future Improvement Ideas

- Add global error boundary
- Add React Query / SWR for caching
- Dark mode toggle (CSS vars already prepared)
- Accessibility audit (ARIA roles for interactive elements)
- Integration tests combining auth + feed

---

## 🚀 Deployment

Production build:

```bash
npm run build
npm start
```

To deploy on platforms like Vercel:

- Ensure `NEXT_PUBLIC_API_BASE` is set in dashboard
- Optionally disable unused Playwright deps in prod

---

## 🤝 Contributing

1. Create branch: `feat/FKB-123-my-feature`
2. Follow commit format: `feat(FKB-123): add feed pagination`
3. Run before pushing:
   ```bash
   npm run lint
   npm run format:check
   npm test
   ```
4. Open PR against `main`

---

## 📄 License

No license file detected. Consider adding one (e.g. MIT) for open collaboration.

---

## 🧪 Quick Test Commands

```bash
# Unit
npm test

# E2E (ensure backend + frontend running)
npx playwright test

# Open last report
npx playwright show-report
```

---

## 🙌 Acknowledgments

Built with Next.js App Router, Tailwind, and a modular component approach to accelerate iteration on the Frankenbike experience.

---
