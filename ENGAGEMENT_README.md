# Employee Engagement Dashboard

## Overview
The Employee Engagement Dashboard is a React-based frontend application that provides real-time monitoring and analysis of team sentiment across Slack channels. It helps managers and HR professionals identify potential burnout risks and track team morale trends.

## Features

### 🎯 **Dashboard Overview**
- **Active Channels Counter**: Shows the number of monitored Slack channels
- **Total Messages**: Displays the total message count for the week
- **Burnout Risk Indicator**: Color-coded risk assessment (Low/Medium/High/Critical)

### 📊 **Sentiment Analysis**
- **Weekly Sentiment Distribution**: Visual progress bars showing positive, neutral, and negative sentiment percentages
- **Real-time Data**: Fetches live data from the backend API
- **Interactive Charts**: Responsive design with smooth animations

### 📈 **Weekly Trends**
- **Week Period Display**: Shows the current week's date range
- **Message Count**: Total messages for the week
- **Key Insights**: AI-generated insights about team morale and engagement

### 📋 **Channel Management**
- **Add New Channels**: Form to add new Slack channels for monitoring
- **Channel Status**: Visual indicators for active/inactive channels
- **Channel List**: Overview of all monitored channels

### ⚠️ **Burnout Warnings**
- **Risk Assessment**: Color-coded risk levels (Low, Medium, High, Critical)
- **Indicators**: Specific factors contributing to burnout risk
- **Recommendations**: Actionable advice for managers
- **Timestamp**: When the warning was generated

## Technical Implementation

### **Components Structure**
```
src/components/engagement/
├── Dashboard.jsx          # Main dashboard container
├── SentimentChart.jsx     # Sentiment distribution charts
├── WeeklyTrends.jsx       # Weekly insights and metrics
├── ChannelList.jsx        # Channel management interface
├── BurnoutWarnings.jsx    # Risk alerts and recommendations
└── index.js              # Component exports
```

### **API Integration**
- **Backend Proxy**: Configured to connect to `http://localhost:8000`
- **Endpoints Used**:
  - `GET /api/engagement/channels` - Fetch monitored channels
  - `GET /api/engagement/trends/weekly` - Get weekly sentiment trends
  - `GET /api/engagement/burnout-warnings` - Retrieve burnout alerts
  - `POST /api/engagement/channels` - Add new channels

### **State Management**
- **React Hooks**: Uses `useState` and `useEffect` for component state
- **Data Fetching**: Implements Promise.all for concurrent API calls
- **Loading States**: Shows loading spinner while fetching data
- **Error Handling**: Graceful error handling with console logging

### **Styling**
- **Tailwind CSS**: Modern, responsive design system
- **Color Coding**: Semantic colors for different risk levels
- **Responsive Grid**: Mobile-first responsive layout
- **Smooth Animations**: CSS transitions for better UX

## Getting Started

### **Prerequisites**
- Node.js 16+ and npm
- Backend API running on port 8000
- Slack workspace with bot token configured

### **Installation**
1. Navigate to the frontend directory:
   ```bash
   cd frontend-p3
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Access the dashboard at: `http://localhost:3000/engagement`

### **Environment Setup**
- Ensure the backend is running on port 8000
- Set up `SLACK_BOT_TOKEN` in your backend environment
- Configure Slack app permissions for channel access

## Usage

### **Adding Channels**
1. Navigate to the "Monitored Channels" section
2. Enter the Slack Channel ID and Channel Name
3. Click "Add Channel" to start monitoring

### **Viewing Sentiment Data**
- The dashboard automatically refreshes data on load
- Sentiment charts update in real-time
- Weekly trends show current week's data

### **Monitoring Burnout Risks**
- Check the "Burnout Risk Alerts" section regularly
- Review recommendations for high-risk channels
- Take action based on provided insights

## API Response Format

### **Channels Response**
```json
[
  {
    "channel_id": "C123",
    "channel_name": "general",
    "is_active": true,
    "created_at": "2024-01-15T10:00:00Z"
  }
]
```

### **Weekly Trends Response**
```json
{
  "week_start": "2024-01-15",
  "week_end": "2024-01-21",
  "channels": ["general", "random"],
  "total_messages": 150,
  "positive_trend": 0.6,
  "negative_trend": 0.2,
  "neutral_trend": 0.2,
  "burnout_risk": "low",
  "insights": [
    "Team morale is generally positive this week",
    "Engagement increased by 15% compared to last week"
  ]
}
```

### **Burnout Warnings Response**
```json
[
  {
    "channel_id": "C123",
    "risk_level": "medium",
    "indicators": ["Increased negative sentiment", "Reduced engagement"],
    "recommendation": "Schedule team check-ins and address concerns",
    "timestamp": "2024-01-15T10:00:00Z"
  }
]
```

## Troubleshooting

### **Common Issues**
1. **API Connection Errors**: Ensure backend is running on port 8000
2. **Empty Dashboard**: Check if channels are configured in the backend
3. **Build Errors**: Run `npm install` to ensure all dependencies are installed

### **Development Tips**
- Use browser dev tools to monitor API calls
- Check console for error messages
- Verify proxy configuration in package.json

## Future Enhancements
- Real-time WebSocket updates
- Historical data visualization
- Custom alert thresholds
- Team member sentiment tracking
- Integration with HR systems
- Mobile app development

## Contributing
1. Follow React best practices
2. Use consistent naming conventions
3. Add proper error handling
4. Test components thoroughly
5. Update documentation as needed
