# DevTree - Frontend

A modern web application that allows users to create personalized profiles and share a curated collection of links with a unique handle. Built with React, TypeScript, and Vite for optimal performance and developer experience.

## Overview

DevTree is a link-sharing platform similar to Linktree, where users can register, create profiles, manage their social and professional links, and share them with a single, memorable URL. The frontend provides an intuitive interface for profile creation, link management, and public profile viewing.

## Features

- **User Authentication**: Secure registration and login system
- **Profile Management**: Create and customize user profiles with personal information
- **Link Management**: Add, edit, and delete links organized in a DevTree
- **Public Profiles**: Share profiles via unique, memorable handles
- **Responsive Design**: Fully responsive interface that works on all devices
- **Real-time Validation**: Instant feedback on form inputs and link creation
- **Modern UI/UX**: Clean, professional design with smooth animations

## Tech Stack

- **Frontend Framework**: React 19+ with TypeScript
- **Build Tool**: Vite
- **State Management**: TanStack React Query for server state
- **Routing**: React Router
- **HTTP Client**: Axios
- **Form Handling**: React Hook Form
- **Styling**: CSS/SCSS with modern design patterns
- **Testing**: Vitest + React Testing Library + MSW (Mock Service Worker)
- **Code Quality**: ESLint, TypeScript strict mode

## Prerequisites

- Node.js >= 18
- npm >= 9 or your preferred package manager

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd devtree/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env.local` file in the root directory:
   ```env
   VITE_API_URL=http://localhost:4000
   ```

## Running the Application

### Development Server

Start the development server with hot module replacement (HMR):
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Production Build

Build the application for production:
```bash
npm run build
```

### Preview Build

Preview the production build locally:
```bash
npm run preview
```

## Testing

### Run All Tests

```bash
npm test
```

### Run Tests in Watch Mode

```bash
npm test -- --watch
```

### Run Specific Test File

```bash
npm test -- src/api/DevTree.test.ts
```

### Generate Coverage Report

```bash
npm test -- --coverage
```

The project uses Vitest as the test runner, React Testing Library for component testing, and MSW (Mock Service Worker) for API mocking.

## Project Structure

```
src/
├── api/              # API service functions and hooks
├── components/       # Reusable UI components
├── views/           # Page components
├── layouts/         # Layout components
├── hooks/           # Custom React hooks
├── mocks/           # MSW handlers and test mocks
├── types/           # TypeScript type definitions
├── utils/           # Utility functions
├── styles/          # Global styles
├── App.tsx          # Root component
└── main.tsx         # Application entry point
```

## Key Components

- **SearchForm**: Allows users to search for existing DevTree profiles by handle
- **ProfileView**: Displays and manages user profiles
- **RegisterView**: User registration interface
- **LinkTreeView**: Manages user's collection of links
- **HandleView**: Public profile display page
- **LoginView**: User authentication interface

## API Integration

The frontend communicates with the backend API for:
- User authentication (login/register)
- Profile management (create, update, retrieve)
- Link management (CRUD operations)
- Handle lookup and public profile viewing

API base URL is configured via the `VITE_API_URL` environment variable.

## Development Workflow

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** and ensure tests pass
   ```bash
   npm test
   ```

3. **Build and preview**
   ```bash
   npm run build
   npm run preview
   ```

4. **Submit a pull request**

## Code Quality

The project maintains high code quality standards:

- **TypeScript**: Strict mode enabled for type safety
- **ESLint**: Code style and best practices enforcement
- **Unit Tests**: Comprehensive test coverage for components and utilities
- **Integration Tests**: MSW-based tests for API interactions
- **Pre-commit Hooks**: Automated checks before commits (if configured)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- **Lazy Loading**: Route-based code splitting
- **Image Optimization**: Optimized asset delivery
- **Bundle Analysis**: Vite's built-in optimization
- **Caching**: Configured HTTP caching strategies

## Security

- **Input Validation**: All user inputs are validated
- **XSS Prevention**: React's built-in XSS protection
- **CORS**: Properly configured cross-origin requests
- **Secure Storage**: Sensitive data handling best practices

## Troubleshooting

### Port 5173 Already in Use

```bash
npm run dev -- --port 3000
```

### Build Fails

Clear cache and reinstall dependencies:
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Tests Failing

Ensure the API URL is correctly configured and MSW server is running properly:
```bash
npm test -- --reporter=verbose
```

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Write tests for new features
2. Ensure all tests pass: `npm test`
3. Follow the existing code style
4. Update documentation as needed
5. Create a descriptive pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues, questions, or suggestions, please open an issue in the repository or contact the development team.

---

