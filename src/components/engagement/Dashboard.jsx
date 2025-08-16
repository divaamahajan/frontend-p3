import React, { useState, useEffect } from 'react';
import { engagementApi } from '../../services/engagementApi';
import LoadingSkeleton from './LoadingSkeleton';
import SentimentChart from './SentimentChart';
import ChannelList from './ChannelList';
import WeeklyTrends from './WeeklyTrends';
import BurnoutWarnings from './BurnoutWarnings';

const Dashboard = () => {
  const [channels, setChannels] = useState([]);
  const [weeklyTrends, setWeeklyTrends] = useState(null);
  const [burnoutWarnings, setBurnoutWarnings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [loadingStates, setLoadingStates] = useState({
    channels: false,
    trends: false,
    warnings: false
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      setLoadingStates({ channels: true, trends: true, warnings: true });
      
      console.log('Fetching dashboard data...');
      
      // Add individual timeouts for each API call
      const timeoutPromise = (promise, timeoutMs) => {
        return Promise.race([
          promise,
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error(`Request timed out after ${timeoutMs}ms`)), timeoutMs)
          )
        ]);
      };
      
      // Fetch data sequentially to show progress
      const channelsRes = await timeoutPromise(engagementApi.getChannels(), 15000);
      setLoadingStates(prev => ({ ...prev, channels: false }));
      console.log('Channels response:', channelsRes.data);
      
      const trendsRes = await timeoutPromise(engagementApi.getWeeklyTrends(), 20000);
      setLoadingStates(prev => ({ ...prev, trends: false }));
      console.log('Weekly trends response:', trendsRes.data);
      
      const warningsRes = await timeoutPromise(engagementApi.getBurnoutWarnings(), 15000);
      setLoadingStates(prev => ({ ...prev, warnings: false }));
      console.log('Burnout warnings response:', warningsRes.data);

      setChannels(channelsRes.data || []);
      setWeeklyTrends(trendsRes.data);
      setBurnoutWarnings(warningsRes.data || []);
      setLastUpdated(new Date());
      
      console.log('Dashboard data updated successfully');
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      
      let errorMessage = 'Failed to load dashboard data. ';
      
      if (error.message.includes('timeout')) {
        errorMessage += 'The server is taking too long to respond. This might be due to Slack API delays. Please try again.';
      } else if (error.code === 'ECONNABORTED') {
        errorMessage += 'Request timed out. Please check your connection and try again.';
      } else if (error.response?.status === 500) {
        errorMessage += 'Server error occurred. Please try again later.';
      } else {
        errorMessage += 'Please check your Slack connection and try again.';
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-3 sm:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <div className="text-red-600 text-4xl mb-4">⚠️</div>
            <h2 className="text-xl font-semibold text-red-800 mb-2">Connection Error</h2>
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={fetchDashboardData}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Employee Engagement Pulse
          </h1>
          {lastUpdated && (
            <div className="text-sm text-gray-500">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </div>
          )}
        </div>
        
        {channels.length === 0 ? (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center mb-6">
            <div className="text-yellow-600 text-4xl mb-4">📡</div>
            <h2 className="text-xl font-semibold text-yellow-800 mb-2">No Channels Available</h2>
            <p className="text-yellow-600 mb-4">
              No Slack channels are currently accessible. Please check your Slack bot permissions and ensure the bot is added to the channels you want to monitor.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div className="bg-white rounded-lg shadow p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-2">Active Channels</h3>
                {loadingStates.channels ? (
                  <div className="animate-pulse">
                    <div className="h-8 bg-gray-300 rounded w-16"></div>
                  </div>
                ) : (
                  <>
                    <p className="text-2xl sm:text-3xl font-bold text-blue-600">{channels.length}</p>
                    <p className="text-xs text-gray-500 mt-1">Monitored</p>
                  </>
                )}
              </div>
              
              <div className="bg-white rounded-lg shadow p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-2">Total Messages</h3>
                {loadingStates.trends ? (
                  <div className="animate-pulse">
                    <div className="h-8 bg-gray-300 rounded w-16"></div>
                  </div>
                ) : (
                  <>
                    <p className="text-2xl sm:text-3xl font-bold text-green-600">{weeklyTrends?.total_messages || 0}</p>
                    <p className="text-xs text-gray-500 mt-1">This week</p>
                  </>
                )}
              </div>
              
              <div className="bg-white rounded-lg shadow p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-2">Burnout Risk</h3>
                {loadingStates.trends ? (
                  <div className="animate-pulse">
                    <div className="h-8 bg-gray-300 rounded w-16"></div>
                  </div>
                ) : (
                  <>
                    <p className={`text-2xl sm:text-3xl font-bold ${
                      weeklyTrends?.burnout_risk === 'high' ? 'text-red-600' :
                      weeklyTrends?.burnout_risk === 'medium' ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {weeklyTrends?.burnout_risk?.toUpperCase() || 'LOW'}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Current level</p>
                  </>
                )}
              </div>
              
              <div className="bg-white rounded-lg shadow p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-2">Data Quality</h3>
                {loadingStates.trends ? (
                  <div className="animate-pulse">
                    <div className="h-8 bg-gray-300 rounded w-16"></div>
                  </div>
                ) : (
                  <>
                    <p className={`text-2xl sm:text-3xl font-bold ${
                      weeklyTrends?.total_messages > 0 ? 'text-green-600' : 'text-yellow-600'
                    }`}>
                      {weeklyTrends?.total_messages > 0 ? 'LIVE' : 'SETUP'}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {weeklyTrends?.total_messages > 0 ? 'Real-time data' : 'Needs messages'}
                    </p>
                  </>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <SentimentChart weeklyTrends={weeklyTrends} />
              <WeeklyTrends data={weeklyTrends} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <ChannelList channels={channels} />
              <BurnoutWarnings warnings={burnoutWarnings} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
