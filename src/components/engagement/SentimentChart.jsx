import React from 'react';

const SentimentChart = ({ weeklyTrends }) => {
  if (!weeklyTrends) return null;

  const { positive_trend, negative_trend, neutral_trend } = weeklyTrends;
  
  const total = positive_trend + negative_trend + neutral_trend;
  
  if (total === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-4">Weekly Sentiment Distribution</h3>
        <div className="text-center py-8">
          <div className="text-gray-400 text-4xl mb-2">📊</div>
          <p className="text-gray-500">No sentiment data available</p>
          <p className="text-sm text-gray-400 mt-1">
            Sentiment analysis will appear as messages are processed
          </p>
        </div>
      </div>
    );
  }
  
  const positivePercent = (positive_trend / total) * 100;
  const negativePercent = (negative_trend / total) * 100;
  const neutralPercent = (neutral_trend / total) * 100;

  return (
    <div className="bg-white rounded-lg shadow p-4 sm:p-6">
      <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-4">Weekly Sentiment Distribution</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600">Positive</span>
          <div className="text-right">
            <span className="text-sm font-semibold text-green-600">{positivePercent.toFixed(1)}%</span>
            <div className="text-xs text-gray-400">({positive_trend.toFixed(3)})</div>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-green-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${positivePercent}%` }}
          ></div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600">Neutral</span>
          <div className="text-right">
            <span className="text-sm font-semibold text-gray-600">{neutralPercent.toFixed(1)}%</span>
            <div className="text-xs text-gray-400">({neutral_trend.toFixed(3)})</div>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gray-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${neutralPercent}%` }}
          ></div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600">Negative</span>
          <div className="text-right">
            <span className="text-sm font-semibold text-red-600">{negativePercent.toFixed(1)}%</span>
            <div className="text-xs text-gray-400">({negative_trend.toFixed(3)})</div>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-red-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${negativePercent}%` }}
          ></div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-800 mb-1">
            {total > 0 ? (positive_trend / total * 100).toFixed(1) : 0}%
          </div>
          <div className="text-sm text-gray-600">Overall Positive Sentiment</div>
        </div>
      </div>
    </div>
  );
};

export default SentimentChart;
