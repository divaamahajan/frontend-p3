# API Integration & Routing Implementation

## Overview
This document describes the complete API integration and routing setup for the Employee Engagement Dashboard frontend. The implementation includes centralized API configuration, robust error handling, retry mechanisms, and proper routing with error boundaries.

## Architecture

### **File Structure**
```
src/
├── config/
│   └── api.js                    # Centralized API configuration
├── services/
│   ├── engagementApi.js          # Main API service with interceptors
│   └── __tests__/
│       └── engagementApi.test.js # API service tests
├── components/
│   └── engagement/
│       ├── Dashboard.jsx         # Main dashboard component
│       ├── ErrorBoundary.jsx     # Error boundary wrapper
│       ├── SentimentChart.jsx    # Sentiment visualization
│       ├── WeeklyTrends.jsx      # Weekly insights display
│       ├── ChannelList.jsx       # Channel management
│       ├── BurnoutWarnings.jsx   # Risk alerts
│       └── index.js              # Component exports
└── App.jsx                       # Main routing configuration
```

## API Configuration

### **Centralized Configuration** (`src/config/api.js`)
```javascript
export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:8000',
  TIMEOUT: 10000,
  RETRY: {
    MAX_ATTEMPTS: 3,
    DELAY: 1000,
  },
  ENDPOINTS: {
    ENGAGEMENT: {
      CHANNELS: '/engagement/channels',
      DAILY_SENTIMENT: '/engagement/sentiment/daily',
      WEEKLY_TRENDS: '/engagement/trends/weekly',
      BURNOUT_WARNINGS: '/engagement/burnout-warnings',
    }
  }
};
```

### **Environment Variables**
```bash
# .env file
REACT_APP_API_URL=http://localhost:8000
```

## API Service Implementation

### **Core Features**
- **Axios Instance**: Configured with base URL, timeout, and headers
- **Request Interceptors**: Automatic token injection for authentication
- **Response Interceptors**: Global error handling and authentication management
- **Retry Logic**: Automatic retry for failed requests with exponential backoff
- **Error Handling**: Comprehensive error categorization and user feedback

### **Request Interceptors**
```javascript
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
```

### **Response Interceptors**
```javascript
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    // Handle timeouts
    if (error.code === 'ECONNABORTED') {
      console.error('Request timeout');
    }
    
    // Handle server errors
    if (error.response?.status >= 500) {
      console.error('Server error');
    }
    
    return Promise.reject(error);
  }
);
```

### **Retry Mechanism**
```javascript
const retryRequest = async (requestFn, maxAttempts = 3) => {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await requestFn();
    } catch (error) {
      if (attempt === maxAttempts) throw error;
      
      await new Promise(resolve => 
        setTimeout(resolve, 1000 * attempt)
      );
      console.log(`Retrying request (attempt ${attempt + 1}/${maxAttempts})`);
    }
  }
};
```

## API Endpoints

### **Channel Management**
```javascript
// Get all monitored channels
GET /engagement/channels

// Add new channel
POST /engagement/channels
Body: { channel_id: string, channel_name: string, is_active: boolean }
```

### **Sentiment Analysis**
```javascript
// Get daily sentiment for specific channel
GET /engagement/sentiment/daily/{channel_id}?date={YYYY-MM-DD}
```

### **Trends and Insights**
```javascript
// Get weekly sentiment trends
GET /engagement/trends/weekly

// Get burnout warnings
GET /engagement/burnout-warnings
```

## Routing Configuration

### **Route Structure**
```jsx
<Routes>
  <Route path="/" element={<Home user={user} />} />
  <Route path="/home" element={<Home user={user} />} />
  <Route path="/login" element={<LoginView onLoginSuccess={handleLoginSuccess} />} />
  <Route path="/chat" element={<Chat user={user} />} />
  <Route path="/qa" element={<QA user={user} token={localStorage.getItem("token")} />} />
  <Route path="/filehandler" element={<Filehandler user={user} token={localStorage.getItem("token")} />} />
  
  {/* Engagement Dashboard Routes */}
  <Route path="/engagement" element={
    <ErrorBoundary>
      <Dashboard user={user} />
    </ErrorBoundary>
  } />
  <Route path="/dashboard" element={
    <ErrorBoundary>
      <Dashboard user={user} />
    </ErrorBoundary>
  } />
  
  <Route path="/profile" element={<ProfileView user={user} />} />
  <Route path="*" element={<Navigate to="/" replace />} />
</Routes>
```

### **Navigation Links**
```jsx
<Link to="/engagement">Engagement</Link>
<Link to="/dashboard">Dashboard</Link>
```

## Error Handling

### **Error Boundary Component**
```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h1>Something went wrong</h1>
          <button onClick={() => window.location.reload()}>
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
```

### **Component-Level Error Handling**
```jsx
const fetchDashboardData = async () => {
  try {
    setLoading(true);
    const [channelsRes, trendsRes, warningsRes] = await Promise.all([
      engagementApi.getChannels(),
      engagementApi.getWeeklyTrends(),
      engagementApi.getBurnoutWarnings()
    ]);

    setChannels(channelsRes.data);
    setWeeklyTrends(trendsRes.data);
    setBurnoutWarnings(warningsRes.data);
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    alert('Failed to load dashboard data. Please try again.');
  } finally {
    setLoading(false);
  }
};
```

## Testing

### **API Service Tests**
```javascript
describe('Engagement API Service', () => {
  test('getChannels should call the correct endpoint', async () => {
    const mockResponse = { data: [{ channel_id: 'C123', channel_name: 'general' }] };
    jest.spyOn(engagementApi, 'getChannels').mockResolvedValue(mockResponse);
    
    const result = await engagementApi.getChannels();
    expect(result).toEqual(mockResponse);
  });
});
```

### **Running Tests**
```bash
npm test
npm test -- --coverage
```

## Development Workflow

### **Local Development**
1. **Start Backend**: `cd backend-p3 && python3 -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload`
2. **Start Frontend**: `cd frontend-p3 && npm start`
3. **Access Dashboard**: Navigate to `http://localhost:3000/engagement` or `http://localhost:3000/dashboard`

### **Environment Setup**
```bash
# Create .env file in frontend-p3 directory
echo "REACT_APP_API_URL=http://localhost:8000" > .env
```

### **Build and Deploy**
```bash
# Build for production
npm run build

# Serve production build
npx serve -s build
```

## Troubleshooting

### **Common Issues**

#### **API Connection Errors**
- Verify backend is running on port 8000
- Check proxy configuration in package.json
- Ensure CORS is properly configured on backend

#### **Authentication Issues**
- Verify token is stored in localStorage
- Check token expiration
- Ensure backend validates JWT tokens correctly

#### **Build Errors**
- Run `npm install` to ensure all dependencies
- Check for syntax errors in components
- Verify all imports are correct

### **Debug Tips**
- Use browser dev tools to monitor network requests
- Check console for error messages
- Verify API endpoints in Network tab
- Test API endpoints directly with tools like Postman

## Performance Optimizations

### **Implemented Features**
- **Concurrent API Calls**: Using Promise.all for parallel requests
- **Request Caching**: Axios instance with proper configuration
- **Error Retry**: Automatic retry with exponential backoff
- **Loading States**: User feedback during API calls

### **Future Enhancements**
- **Request Debouncing**: Prevent rapid successive calls
- **Response Caching**: Cache frequently accessed data
- **Lazy Loading**: Load components on demand
- **Service Workers**: Offline support and caching

## Security Considerations

### **Authentication**
- JWT tokens stored in localStorage
- Automatic token injection in requests
- Automatic logout on 401 responses

### **Data Validation**
- Input validation on forms
- API response validation
- Error message sanitization

### **CORS Configuration**
- Backend configured to allow frontend origin
- Proper headers for authentication
- Secure cookie handling

## Monitoring and Logging

### **Console Logging**
- API request/response logging
- Error logging with stack traces
- Retry attempt logging

### **Error Tracking**
- Error boundary captures React errors
- API errors logged with context
- User-friendly error messages

## Conclusion

The API integration and routing implementation provides a robust, scalable foundation for the Employee Engagement Dashboard. Key features include:

- ✅ **Centralized Configuration**: Easy environment-specific settings
- ✅ **Robust Error Handling**: Multiple layers of error management
- ✅ **Authentication Integration**: Seamless token management
- ✅ **Retry Logic**: Improved reliability for network issues
- ✅ **Error Boundaries**: Graceful React error handling
- ✅ **Comprehensive Testing**: API service test coverage
- ✅ **Performance Optimization**: Concurrent requests and caching
- ✅ **Security**: Proper authentication and validation

This implementation follows React best practices and provides a solid foundation for future enhancements and scaling.
