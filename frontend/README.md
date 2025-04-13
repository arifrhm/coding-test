# Sales Dashboard Frontend

A modern Next.js-based frontend application for the Sales Dashboard, featuring real-time data visualization and AI-powered analytics.

## Features

- Modern UI built with Next.js and TypeScript
- Responsive design using Chakra UI
- Real-time data visualization with Recharts
- AI-powered analytics integration
- Efficient data fetching with React Query
- Type-safe development with TypeScript

## Prerequisites

- Node.js 18.0.0 or later
- npm or yarn package manager
- Backend API running (see backend README)

## Installation

1. Install dependencies:
   ```bash
   # Using npm
   npm install

   # Using yarn
   yarn install
   ```

2. Configure environment variables:
   Create a `.env.local` file in the root directory with:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

## Available Scripts

In the project directory, you can run:

### Development
```bash
# Using npm
npm run dev

# Using yarn
yarn dev
```
Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

### Production Build
```bash
# Using npm
npm run build
npm start

# Using yarn
yarn build
yarn start
```

### Linting
```bash
# Using npm
npm run lint

# Using yarn
yarn lint
```

## Project Structure

```
frontend/
├── components/         # Reusable UI components
├── pages/             # Next.js pages
│   ├── _app.tsx       # App wrapper
│   └── index.tsx      # Main dashboard page
├── types/             # TypeScript type definitions
├── utils/             # Utility functions
├── public/            # Static assets
└── styles/            # Global styles
```

## Key Technologies

- **Next.js**: React framework for production
- **TypeScript**: Type-safe JavaScript
- **Chakra UI**: Component library
- **React Query**: Data fetching and caching
- **Recharts**: Data visualization
- **Axios**: HTTP client

## Development Guidelines

### Adding New Features

1. Create new components in the `components` directory
2. Add new pages in the `pages` directory
3. Define types in the `types` directory
4. Add utility functions in the `utils` directory

### Styling

- Use Chakra UI components for consistent styling
- Follow the design system defined in the theme
- Use responsive design principles

### Data Fetching

- Use React Query for data fetching and caching
- Implement error handling for API calls
- Use TypeScript interfaces for API responses

## API Integration

The frontend communicates with the following backend endpoints:

- `GET /api/sales-reps`: Fetch all sales representatives
- `GET /api/sales-reps/{rep_id}`: Fetch specific sales rep
- `GET /api/deals`: Fetch all deals
- `POST /api/ai`: AI-powered analytics

## Error Handling

- Implemented error boundaries for component-level errors
- Global error handling for API requests
- User-friendly error messages
- Loading states for async operations

## Performance Optimization

- Image optimization with Next.js
- Code splitting and lazy loading
- Efficient data fetching with React Query
- Memoization of expensive computations

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 
 