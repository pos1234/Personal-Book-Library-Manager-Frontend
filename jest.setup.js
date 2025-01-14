
import '@testing-library/jest-dom'
import fetch from 'node-fetch'
// Makes fetch available globally to prevent a Warning

global.fetch = fetch;

// fetch.mockResponse(JSON.stringify({testing: true})); // mock every fetchCall in all tests with this default value