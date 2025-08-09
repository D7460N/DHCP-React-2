## Key Points
- Use environment variables for configuration (e.g., API endpoints).
- Use React (TypeScript), Tailwind CSS, Axios, and React Router DOM.
- Organize code by feature: each main feature/page in `src/pages/`.
- Place reusable UI in `src/components/`.
- Keep API logic in `src/api/` or feature `api/` subfolders.
- Use TypeScript types everywhere.
- Style with Tailwind CSS.
- Prefer functional components and hooks.
- Write tests with Testing Library.
- Use PascalCase for components/files, camelCase for variables/functions.
- Keep imports organized: external first, then internal.
- Use environment variables for configuration (e.g., API endpoints).
- Optimize accessibility (a11y) in all UI components.
- Use Git and conventional commit messages for version control.

**Notes:**
- Never commit `.env` files or sensitive keys to version control. Always add `.env` to `.gitignore`.
- Use React context or a state management library when:
  - State must be shared across many unrelated components
  - Prop drilling becomes hard to manage
  - Multiple parts of the app need to update/react to the same data
  - You need features like undo/redo, caching, or persistence
  - State logic becomes complex or hard to test
