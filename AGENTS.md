# Agent Guidelines for Referr

This file contains project-specific instructions that the AI coding agent must follow.

## Tech Stack Requirements
- **Strictly React & TypeScript**: All UI components and application logic MUST be written in React and TypeScript. 
- **No Static HTML/CSS**: Avoid creating standalone static `.html` or `.css` files for features. Instead, use TSX components and Tailwind CSS utility classes.
- **Tailwind CSS**: Use Tailwind for all styling needs to ensure consistency and rapid iteration.

## Development Workflow
- **Incremental Building**: When implementing large features or new pages, build and save progress incrementally. This allows the user to see the application being constructed step-by-step in the preview/sandbox.
- **Clean Component Architecture**: 
  - Organize components in `/src/components/`.
  - Break down UI into reusable, logical sub-components.
  - Maintain a clear separation of concerns between UI presentation and business logic.
- **Atomic Commits/Edits**: Prefer smaller, more frequent file updates over massive single-file rewrites to improve reliability and visibility of changes.

## Persistence
These rules are mandatory for all future iterations of the Referr project. Ensure any new features or refactors adhere strictly to this React-first, incremental approach.
