instructions:
Guide me step-by-step to create a full-stack boilerplate application using the following requirements

stack:

- Next.js app router and server actions
- Zod for schema definition and validation
- next-safe-action for type-safe data fetching
- Prisma ORM
- Neon DB
- Custom JWT authentication, do not use next-auth
- ShadCN, use npx shadcn@latest, not npx shadcn-ui@latest

features:

- authentication_methods:
  - OAuth with Google
  - Email/password authentication
- role_based_access_control:
  - Implement roles for guest, user, and administrator
- ui_components:
  - Use ShadCN for UI components
  - Create a public page for guest users with a basic layout with a sticky header, navbar, and footer
  - Include an admin-protected section for application setup
- data_handling:
  - Ensure all data handling is type-safe using Zod and next-safe-action
  - Implement server actions for database interactions without creating separate API endpoints
- error_handling:
  - Design a global error handling strategy that is type-safe and follows best practices
- testing:
  - Implement unit, integration, and end-to-end tests
- environment_variables:
  - Use Zod for schema definition and validation to ensure that environment variables are consistently defined and typed
- deployment:

  - Ensure the application can be deployed on Vercel, AWS, or Cloudflare

general_instructions:

- When you say "Let's update the <file> file:", do not show the content of the file, just the file path
- When you say "let's update the <file>", do not show the content of the file, just the file path
- When you say "Add the following content to <file>", show the bash command to open the file and then the content to add
- When showing mkdir commands always quote the entire path, e.g: mkdir -p "app/(auth)/signup"
- When showing touch commands always quote the entire path, e.g: touch "app/(auth)/signup/page.tsx"
- When you say "Create a new file <file>", show the bash command to create the folder quoting the entire path, e.g: mkdir -p "app/(auth)/signup". Then the command to create the file, e.g: touch app/(auth)/signup/page.tsx. And finally, the command to open the file e.g: cursor app/(auth)/signup/page.tsx
- Treat next.config.mjs file as an ES module when adding content to it

detailed_steps:

- Run a command to create a .nvmrc file with the following content:
  - lts/\*
- Initialize the Next.js Project with ShadCN with the following command:
  - npx shadcn@latest init -d
- Run a command to move the my-app folder to the root of the project
- Install necessary dependencies for:
  - Prisma
  - JWT
  - bcrypt
  - Zod
  - next-safe-action
- Set Up Prisma with Neon DB:
  - Configure the Prisma schema to include User and Role models
  - Set up the connection to Neon DB and run migrations
- Implement Custom Authentication Logic:
  - Create utility functions for signing and verifying JWTs
  - Set up API routes for user registration, login, and logout
  - Implement OAuth with Google and magic link functionality
- Implement RBAC:
  - Create middleware to protect routes based on user roles
  - Ensure that the admin section is accessible only to users with the administrator role
- Set Up Global Error Handling:
  - Create a custom error handler that captures and formats errors consistently
- Manage Environment Variables:
  - Use Zod to define and validate environment variables in the application
- Create UI Components:
  - Use ShadCN blocks for authentication forms and layout
  - Implement a basic layout with a sticky header, navbar, and footer
  - Implement routes for the home page, login, signup, and admin dashboard
- Deploy the Application:
  - Prepare the application for deployment on Vercel, AWS, or Cloudflare

documentation:

- Create a detailed README file that includes setup instructions, features, and usage guidelines
