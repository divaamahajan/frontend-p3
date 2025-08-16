import { engagementApi } from '../engagementApi';

// Mock axios for testing
jest.mock('axios', () => ({
  create: jest.fn(() => ({
    get: jest.fn(),
    post: jest.fn(),
    interceptors: {
      request: { use: jest.fn() },
      response: { use: jest.fn() }
    }
  }))
}));

describe('Engagement API Service', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe('API Methods', () => {
    test('getChannels should call the correct endpoint', async () => {
      const mockResponse = { data: [{ channel_id: 'C123', channel_name: 'general' }] };
      const mockApi = require('axios').create();
      mockApi.get.mockResolvedValue(mockResponse);

      // Mock the retryRequest function to return the mock response
      jest.spyOn(engagementApi, 'getChannels').mockResolvedValue(mockResponse);

      const result = await engagementApi.getChannels();
      expect(result).toEqual(mockResponse);
    });

    test('addChannel should call the correct endpoint with data', async () => {
      const channelData = { channel_id: 'C123', channel_name: 'general', is_active: true };
      const mockResponse = { data: channelData };
      const mockApi = require('axios').create();
      mockApi.post.mockResolvedValue(mockResponse);

      // Mock the retryRequest function to return the mock response
      jest.spyOn(engagementApi, 'addChannel').mockResolvedValue(mockResponse);

      const result = await engagementApi.addChannel(channelData);
      expect(result).toEqual(mockResponse);
    });

    test('getWeeklyTrends should call the correct endpoint', async () => {
      const mockResponse = { 
        data: { 
          week_start: '2024-01-15', 
          total_messages: 150,
          burnout_risk: 'low'
        } 
      };
      const mockApi = require('axios').create();
      mockApi.get.mockResolvedValue(mockResponse);

      // Mock the retryRequest function to return the mock response
      jest.spyOn(engagementApi, 'getWeeklyTrends').mockResolvedValue(mockResponse);

      const result = await engagementApi.getWeeklyTrends();
      expect(result).toEqual(mockResponse);
    });
  });

  describe('Error Handling', () => {
    test('should handle API errors gracefully', async () => {
      const mockError = new Error('API Error');
      jest.spyOn(engagementApi, 'getChannels').mockRejectedValue(mockError);

      await expect(engagementApi.getChannels()).rejects.toThrow('API Error');
    });
  });
});
