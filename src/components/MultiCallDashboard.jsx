import React, { useState, useEffect } from 'react';
import { Phone, Mic, Play, Square, Plus, X } from 'lucide-react';
import Sidebar from './Sidebar'; // Import the Sidebar component
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Button } from './button';
import socket from '../socket';
import { api } from '../api';

const MultiCallDashboard = () => {
  const [activeCalls, setActiveCalls] = useState([]);
  const [maxCalls] = useState(4);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Socket connection handlers
    socket.on('connect', () => {
      setIsConnected(true);
      console.log('Connected to server');
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
      console.log('Disconnected from server');
    });

    // Listen for new messages
    socket.on('messageProcessed', ({ callId, message }) => {
      setActiveCalls(prev => prev.map(call => {
        if (call.id === callId) {
          return {
            ...call,
            transcript: [...call.transcript, message]
          };
        }
        return call;
      }));
    });

    // Cleanup on unmount
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('messageProcessed');
    };
  }, []);

  const startNewCall = async () => {
    if (activeCalls.length >= maxCalls) return;

    try {
      const randomCustomer = {
        name: `Customer ${Date.now()}`,
        company: "Test Company",
        interest: "medium"
      };

      const response = await api.startCall(randomCustomer);
      
      const newCall = {
        id: response.callId,
        customer: randomCustomer.name,
        company: randomCustomer.company,
        status: 'active',
        duration: 0,
        transcript: []
      };

      setActiveCalls(prev => [...prev, newCall]);
    } catch (error) {
      console.error('Failed to start call:', error);
    }
  };

  const endCall = async (callId) => {
    try {
      await api.endCall(callId);
      setActiveCalls(prev => prev.filter(call => call.id !== callId));
    } catch (error) {
      console.error('Failed to end call:', error);
    }
  };

  useEffect(() => {
    socket.on('messageProcessed', ({ callId, message }) => {
      setActiveCalls(prev => prev.map(call => {
        if (call.id === callId) {
          return {
            ...call,
            transcript: [...call.transcript, message]
          };
        }
        return call;
      }));
    });

    return () => socket.off('messageProcessed');
  }, []);

  const sendMessage = async (callId, text) => {
    try {
      const response = await api.sendMessage(callId, text, 'customer');
      setActiveCalls(prev => prev.map(call => {
        if (call.id === callId) {
          return {
            ...call,
            transcript: response
          };
        }
        return call;
      }));
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">Multi-Call Simulator</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                Active Calls: {activeCalls.length}/{maxCalls}
              </span>
              <Button
                onClick={startNewCall}
                disabled={activeCalls.length >= maxCalls}
                className="bg-blue-500 hover:bg-blue-600"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Call
              </Button>
            </div>
          </div>

          {/* Active Calls Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeCalls.map((call) => (
              <Card key={call.id} className="relative">
                <Button
                  variant="ghost"
                  className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
                  onClick={() => endCall(call.id)}
                >
                  <X className="w-4 h-4" />
                </Button>

                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    {call.customer} - {call.company}
                  </CardTitle>
                  <div className="text-sm text-gray-500">
                    Duration: {Math.floor(call.duration / 60)}:
                    {(call.duration % 60).toString().padStart(2, '0')}
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="bg-gray-50 rounded-lg p-4 h-48 overflow-y-auto mb-4">
                    {call.transcript.map((entry, index) => (
                      <div
                        key={index}
                        className={`mb-2 p-2 rounded ${
                          entry.speaker === 'agent'
                            ? 'bg-blue-100 ml-8'
                            : entry.speaker === 'customer'
                            ? 'bg-gray-100 mr-8'
                            : 'bg-yellow-50 text-center text-sm'
                        }`}
                      >
                        {entry.text}
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center">
                    <Button variant="outline" size="sm">
                      <Mic className="w-4 h-4 mr-2" />
                      Respond
                    </Button>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="text-sm text-gray-500">Live</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {activeCalls.length === 0 && (
            <Card className="text-center p-8">
              <CardContent>
                <div className="flex flex-col items-center space-y-4">
                  <Phone className="w-12 h-12 text-gray-400" />
                  <p className="text-gray-500">
                    No active calls. Click "New Call" to start a simulation.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiCallDashboard;
