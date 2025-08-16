import React from 'react';

const LoadingSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-6 animate-pulse">
      <div className="max-w-7xl mx-auto">
        <div className="h-6 sm:h-8 bg-gray-300 rounded w-1/2 sm:w-1/3 mb-6 sm:mb-8"></div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow p-4 sm:p-6">
              <div className="h-3 sm:h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
              <div className="h-6 sm:h-8 bg-gray-300 rounded w-1/3"></div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {[1, 2].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow p-4 sm:p-6">
              <div className="h-4 sm:h-5 bg-gray-300 rounded w-1/3 mb-4"></div>
              <div className="space-y-3 sm:space-y-4">
                {[1, 2, 3].map((j) => (
                  <div key={j} className="h-3 sm:h-4 bg-gray-300 rounded"></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
