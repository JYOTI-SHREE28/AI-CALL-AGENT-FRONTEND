
const API_URL = import.meta.env.VITE_API_URL;

export const api = {
  startCall: async (customerData) => {
    try {
        console.log("call started");
      const response = await fetch(`${API_URL}/api/calls/start`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ customerData })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }console.log(response);
      
      return await response.json();
    } catch (error) {
      console.error('Start call error:', error);
      throw error;
    }
  },

  sendMessage: async (callId, message, speaker) => {
    try {
        
      const response = await fetch(`${API_URL}/api/calls/${callId}/message`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ message, speaker })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log(data);
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Send message error:', error);
      throw error;
    }
  },

  endCall: async (callId) => {
    try {
      const response = await fetch(`${API_URL}/api/calls/${callId}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('End call error:', error);
      throw error;
    }
  },

  getActiveCallsCount: async () => {
    try {
      const response = await fetch(`${API_URL}/api/calls/active/count`, {
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Get active calls error:', error);
      throw error;
    }
  }
};


