import React from 'react';

const BurnoutWarnings = ({ warnings }) => {
  const getRiskColor = (riskLevel) => {
    switch (riskLevel.toLowerCase()) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRiskIcon = (riskLevel) => {
    switch (riskLevel.toLowerCase()) {
      case 'critical': return '🚨';
      case 'high': return '⚠️';
      case 'medium': return '⚡';
      case 'low': return '✅';
      default: return 'ℹ️';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base sm:text-lg font-semibold text-gray-700">Burnout Risk Alerts</h3>
        <div className="text-sm text-gray-500">
          {warnings.length} channel{warnings.length !== 1 ? 's' : ''} monitored
        </div>
      </div>
      
      {warnings.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-green-500 text-4xl mb-2">✅</div>
          <p className="text-gray-500">No burnout risks detected</p>
          <p className="text-sm text-gray-400 mt-1">All channels show healthy engagement patterns</p>
        </div>
      ) : (
        <div className="space-y-4">
          {warnings.map((warning, index) => (
            <div key={index} className={`p-4 rounded-lg border ${getRiskColor(warning.risk_level)}`}>
              {/* Channel Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{getRiskIcon(warning.risk_level)}</span>
                  <div>
                    <div className="font-semibold capitalize text-lg">{warning.risk_level} Risk</div>
                    <div className="text-sm font-medium text-gray-600">
                      #{warning.channel_name || 'Unknown Channel'}
                    </div>
                  </div>
                </div>
                <span className="text-xs opacity-75">
                  {warning.timestamp ? new Date(warning.timestamp).toLocaleDateString() : 'Recent'}
                </span>
              </div>
              
              {/* Risk Indicators */}
              <div className="mb-3">
                <h4 className="font-medium mb-2 text-sm">Risk Indicators:</h4>
                <ul className="text-sm space-y-1">
                  {warning.indicators.map((indicator, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="mr-2 text-gray-500">•</span>
                      <span>{indicator}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Recommendation */}
              <div>
                <h4 className="font-medium mb-2 text-sm">Recommendation:</h4>
                <p className="text-sm leading-relaxed">{warning.recommendation}</p>
              </div>
              
              {/* Channel Info Footer */}
              <div className="mt-3 pt-3 border-t border-gray-200 border-opacity-50">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Channel ID: {warning.channel_id}</span>
                  <span className="px-2 py-1 bg-gray-100 rounded-full">
                    {warning.risk_level.toUpperCase()} RISK
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BurnoutWarnings;
