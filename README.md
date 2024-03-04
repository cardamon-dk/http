## Installation

```bash
npm install @lite-base/http
```

```js
import http from '@lite-base/http';

// Create http instance with configuration options
const http = new http({
  baseURL: 'https://api.example.com',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    // Add other default headers if needed
  },
  requestInterceptor: config => {
    // Modify config before sending the request
    // e.g., add token
    return config;
  },
  responseInterceptor: responseData => {
    // Perform operations on the response data before handling it
    return responseData;
  },
});

// Make a request using the instance
http.request('GET', '/data')
  .then(data => {
    console.log('Successfully retrieved data:', data);
  })
  .catch(error => {
    console.error('Request failed:', error);
  });
```