import React, { useState } from 'react';
import { engagementApi } from '../../services/engagementApi';

const ChannelList = ({ channels }) => {
  const [newChannel, setNewChannel] = useState({ channel_id: '', channel_name: '' });
  const [adding, setAdding] = useState(false);

  const handleAddChannel = async (e) => {
    e.preventDefault();
    if (!newChannel.channel_id || !newChannel.channel_name) return;

    try {
      setAdding(true);
      await engagementApi.addChannel({
        ...newChannel,
        is_active: true
      });
      
      setNewChannel({ channel_id: '', channel_name: '' });
      // In a real app, you'd update the parent state instead of reloading
      window.location.reload();
    } catch (error) {
      console.error('Error adding channel:', error);
      alert('Failed to add channel. Please try again.');
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 sm:p-6">
      <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-4">Monitored Channels</h3>
      
      <form onSubmit={handleAddChannel} className="mb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Channel ID"
            value={newChannel.channel_id}
            onChange={(e) => setNewChannel({...newChannel, channel_id: e.target.value})}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          />
          <input
            type="text"
            placeholder="Channel Name"
            value={newChannel.channel_name}
            onChange={(e) => setNewChannel({...newChannel, channel_name: e.target.value})}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          />
        </div>
        <button
          type="submit"
          disabled={adding}
          className="mt-3 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {adding ? 'Adding...' : 'Add Channel'}
        </button>
      </form>

      <div className="space-y-2">
        {channels.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400 text-4xl mb-2">📡</div>
            <p className="text-gray-500">No channels available for monitoring</p>
            <p className="text-sm text-gray-400 mt-1">
              Add a channel above to start monitoring engagement
            </p>
          </div>
        ) : (
          channels.map((channel) => (
            <div key={channel.channel_id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <span className="font-medium text-gray-700">{channel.channel_name}</span>
                <span className="text-sm text-gray-500 ml-2">#{channel.channel_id}</span>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                channel.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {channel.is_active ? 'Active' : 'Inactive'}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChannelList;
