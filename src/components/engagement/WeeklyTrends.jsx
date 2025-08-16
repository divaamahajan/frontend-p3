import React from 'react';

const WeeklyTrends = ({ data }) => {
  if (!data) return null;

  return (
    <div className="bg-white rounded-lg shadow p-4 sm:p-6">
      <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-4">Weekly Insights</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
          <span className="text-sm font-medium text-blue-800">Week Period</span>
          <span className="text-sm text-blue-600">
            {data.week_start} to {data.week_end}
          </span>
        </div>

        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
          <span className="text-sm font-medium text-green-800">Total Messages</span>
          <span className="text-sm font-semibold text-green-600">{data.total_messages}</span>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-lg font-bold text-green-600">
              {(data.positive_trend * 100).toFixed(1)}%
            </div>
            <div className="text-xs text-gray-600">Positive</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-lg font-bold text-gray-600">
              {(data.neutral_trend * 100).toFixed(1)}%
            </div>
            <div className="text-xs text-gray-600">Neutral</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-lg font-bold text-red-600">
              {(data.negative_trend * 100).toFixed(1)}%
            </div>
            <div className="text-xs text-gray-600">Negative</div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-medium text-gray-700">Key Insights:</h4>
          {data.insights && data.insights.length > 0 ? (
            <ul className="space-y-2">
              {data.insights.map((insight, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span className="text-sm text-gray-600">{insight}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-4">
              <div className="text-gray-400 text-2xl mb-2">📊</div>
              <p className="text-sm text-gray-500">No insights available yet</p>
              <p className="text-xs text-gray-400 mt-1">
                Insights will appear as more data is analyzed
              </p>
            </div>
          )}
        </div>

        {data.channels && data.channels.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium text-gray-700">Monitored Channels:</h4>
            <div className="flex flex-wrap gap-2">
              {data.channels.map((channel, index) => (
                <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  #{channel}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeeklyTrends;
