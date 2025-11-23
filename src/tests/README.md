# Test Suite

This folder contains basic test cases for the GKMIT Inside project.

## Running Tests

```bash
npm test
```

## Test Files

- `authApi.test.js` - Tests for authentication API (login, register)
- `authContext.test.jsx` - Tests for auth context and user state
- `adminApi.test.js` - Tests for admin API functions
- `postApi.test.js` - Tests for post-related API calls
- `postCard.test.jsx` - Tests for PostCard component
- `createPost.test.jsx` - Tests for CreatePost form
- `navbar.test.jsx` - Tests for Navbar component
- `protectedRoute.test.jsx` - Tests for route protection
- `dateUtils.test.js` - Tests for date utility functions
- `utils.test.js` - Basic utility tests

## Coverage

Total: 41 tests covering essential functionality

## Notes

- Tests use vitest and @testing-library/react
- Some tests mock axios and auth context
- Tests are kept simple for easy maintenance
