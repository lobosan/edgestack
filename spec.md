# AI Development Assistant Specification

## Project Overview

You are tasked with developing a Next.js 14 application that implements secure user authentication using JWT (JSON Web Tokens) stored in HttpOnly cookies. The application will utilize Zustand for global state management and TanStack React Query for efficient data fetching and caching. The application should follow best practices for security, performance, and maintainability, with Role-Based Access Control (RBAC) for managing user roles. User data will be managed using Prisma with PostgreSQL as the database.

## Stack

- Next.js app router and server actions
- Zod for schema definition and validation
- next-safe-action for type-safe data fetching
- Prisma ORM
- Neon DB
- Custom JWT authentication
- ShadCN UI Components

## Key Features

### Authentication:

- Implement user authentication with JWT.
- Use next-safe-action to create secure server actions for login, logout, and token validation.
- Store JWT in HttpOnly cookies to prevent XSS attacks.
- Implement refresh tokens to maintain user sessions without requiring frequent logins.
- Protect sensitive routes by verifying JWT on the server.

### Role-Based Access Control (RBAC):

- Use the Role enum defined in the Prisma schema as the single source of truth for user roles.
- Implement middleware to enforce role-based access control for server actions and routes.
- Ensure that users can only access resources and perform actions permitted by their assigned roles.

### Homepage and Dashboard Navigation:

- The homepage is accessible to guest users.
- When accounts with the role USER successfully sign in or sign up, they are redirected to the homepage, and a welcome message is displayed.
- When an account with the ADMINISTRATOR role logs in or signs up, it should be redirected to the dashboard.

### Header Behavior:

- In the header, there are login and signup options for guests.
- When a user is logged in, these links should change to display the name of the logged-in user, and a logout option should appear.

### Authorization Middleware:

- Implement middleware using next-safe-action to handle authorization checks based on user roles retrieved from the database.
- Ensure that only authorized users can perform sensitive operations.

### Form input validation:

- Integrate Zod for schema-based validation of form inputs.

### Global State Management with Zustand:

- Use Zustand to manage global application state, including user authentication status and user profile data.
- Create separate Zustand stores for different types of state (e.g., user profile, notifications).
- Implement state persistence using Zustand middleware to retain state across page refreshes.

### Data Fetching with TanStack React Query:

- Use TanStack React Query to manage server state and cache user data.
- Implement API calls for fetching user data and managing authentication states.
- Use React Query's features like staleTime and refetchOnWindowFocus to ensure data freshness.

### End-to-End Type Safety:

- Use TypeScript to ensure type safety across the application, including server actions, form handling, and state management.
- Define interfaces and types for user data, form inputs, and server responses to maintain consistency.

## Best Practices

- Ensure all sensitive operations are handled on the server side.
- Validate JWT tokens on the server for every protected route using the middleware.
- Handle errors gracefully in API calls and manage loading states in the UI.
- Keep the Zustand store organized and avoid global stores by using context where necessary.
- Regularly test the application for security vulnerabilities, especially concerning token management.

## Deliverables

1. Documentation outlining the architecture, code structure, and instructions for running the application.
