import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Pizza, Users, BarChart, Settings, Star, Clock } from 'lucide-react';
import VoiceChat from './VoiceChat';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { api } from '../api';
import socket from '../socket';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import MenuCard from './menucard';

const performanceData = [
  { name: 'Mon', orders: 24, avgOrderValue: 42, satisfaction: 4.8 },
  { name: 'Tue', orders: 32, avgOrderValue: 38, satisfaction: 4.7 },
  { name: 'Wed', orders: 28, avgOrderValue: 45, satisfaction: 4.9 },
  { name: 'Thu', orders: 35, avgOrderValue: 41, satisfaction: 4.6 },
  { name: 'Fri', orders: 30, avgOrderValue: 44, satisfaction: 4.8 },
];

const Dashboard = () => {
  const [currentCall, setCurrentCall] = useState(null);
  const [messages, setMessages] = useState([]);
  const [activeCalls, setActiveCalls] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [customerMetrics, setCustomerMetrics] = useState({
    dailyOrders: 0,
    avgOrderTime: '12 mins',
    avgSatisfaction: 4.8,
    repeatCustomers: 65,
    popularToppings: ['Pepperoni', 'Mushrooms', 'Extra Cheese'],
    avgOrderValue: 0,
    orderCompletion: 98,
  });

  useEffect(() => {
    socket.on('callStarted', handleCallStarted);
    socket.on('messageProcessed', handleNewMessage);
    socket.on('callEnded', handleCallEnded);
    fetchActiveCallsCount();
    fetchCustomerMetrics();

    return () => {
      socket.off('callStarted', handleCallStarted);
      socket.off('messageProcessed', handleNewMessage);
      socket.off('callEnded', handleCallEnded);
    };
  }, []);

  const fetchCustomerMetrics = async () => {
    try {
      
      const response = await api.getCustomerMetrics();
      setCustomerMetrics(response.metrics);
    } catch (error) {
      console.error('Error fetching customer metrics:', error);
    }
  };

  const fetchActiveCallsCount = async () => {
    try {
      const response = await api.getActiveCallsCount();
      setActiveCalls(response.count);
    } catch (error) {
      console.error('Error fetching active orders:', error);
    }
  };

  const handleCallStarted = (data) => {
    console.log('New pizza order started:', data);
    setCurrentCall({ id: data.callId });
    if (data.message) {
      setMessages([data.message]);
    }
  };

  const handleNewMessage = (data) => {
    if (data.callId === currentCall?.id) {
      setMessages((prev) => [...prev, data.message]);
    }
  };

  const handleCallEnded = () => {
    setCurrentCall(null);
    setMessages([]);
    fetchActiveCallsCount();
    fetchCustomerMetrics();
  };

  const startCall = async () => {
    try {
      const customerData = {
        name: 'Pizza Lover',
        email: 'pizzalover@example.com',
        address: '123 Pizza Street',
        previousOrders: 5,
        preferences: {
          crust: 'Thin',
          favoriteToppings: ['Pepperoni', 'Mushrooms'],
          allergies: [],
        },
      };

      const { callId } = await api.startCall(customerData);
      setCurrentCall({ id: callId });
    } catch (error) {
      console.error('Error starting pizza order:', error);
    }
  };

  const endCall = async () => {
    if (currentCall) {
      try {
        await api.endCall(currentCall.id);
        handleCallEnded();
      } catch (error) {
        console.error('Error ending pizza order:', error);
      }
    }
  };

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const toggleInstructions = () => {
    setShowInstructions((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-red-100 via-yellow-50 to-orange-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-16 min-h-screen bg-gradient-to-b from-red-600 to-orange-600 flex flex-col items-center py-8 space-y-8">
          <NavLink to="/" className="text-white">
            <Pizza size={24} />
          </NavLink>
          <NavLink to="/multi-call" className="text-gray-300">
            <BarChart size={24} />
          </NavLink>
          <NavLink to="/customers" className="text-gray-300">
            <Users size={24} />
          </NavLink>
          <NavLink to="/settings" className="text-gray-300">
            <Settings size={24} />
          </NavLink>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-extrabold text-red-900">PizzaMaster AI Customer Dashboard</h1>

              <div className="flex space-x-4">
                <button
                  onClick={toggleMenu}
                  className="px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-md shadow-md"
                >
                  {showMenu ? 'Close Menu' : 'View Menu'}
                </button>

                <button
                  onClick={toggleInstructions}
                  className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-md shadow-md"
                >
                  {showInstructions ? 'Hide Help' : 'Show Help'}
                </button>
              </div>
            </div>

            {/* Enhanced Customer Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-gray-500">
                    <div className="flex items-center space-x-2">
                      <Users size={18} />
                      <span>Active Orders</span>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-900">{activeCalls}</div>
                  <p className="text-sm text-gray-500">Live Orders</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-gray-500">
                    <div className="flex items-center space-x-2">
                      <Clock size={18} />
                      <span>Avg Delivery Time</span>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-900">{customerMetrics.avgOrderTime}</div>
                  <p className="text-sm text-gray-500">Target: 15 mins</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-gray-500">
                    <div className="flex items-center space-x-2">
                      <Star size={18} />
                      <span>Customer Satisfaction</span>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-900">{customerMetrics.avgSatisfaction}/5.0</div>
                  <p className="text-sm text-gray-500">{customerMetrics.orderCompletion}% Success Rate</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-gray-500">
                    <div className="flex items-center space-x-2">
                      
                      <span>Trending Toppings</span>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {customerMetrics.popularToppings.map((topping, index) => (
                      <span key={index} className="bg-orange-100 px-2 py-1 rounded-full text-orange-800 text-sm">
                        {topping}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Voice Chat Instructions Card */}
            <div className="mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-gray-500">Voice Chat Instructions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-gray-600">
                    <p className="flex items-center space-x-2">
                      <span className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-sm">1</span>
                      <span>Click "Start Call" to initiate a new pizza order conversation</span>
                    </p>
                    <p className="flex items-center space-x-2">
                      <span className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-sm">2</span>
                      <span>Click "Start Speaking" each time you want to talk</span>
                    </p>
                    <p className="flex items-center space-x-2">
                      <span className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-sm">3</span>
                      <span>Say "Hello" to begin your conversation with PizzaMaster AI</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Voice Chat and Performance Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <VoiceChat
                currentCallId={currentCall?.id}
                messages={messages}
                onCallStart={startCall}
                onCallEnd={endCall}
              />

              <Card>
                <CardHeader>
                  <CardTitle>Customer Satisfaction Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line 
                          type="monotone" 
                          dataKey="orders" 
                          stroke="#dc2626" 
                          strokeWidth={2} 
                          name="Orders"
                        />
                        <Line
                          type="monotone"
                          dataKey="satisfaction"
                          stroke="#059669"
                          strokeWidth={2}
                          name="Satisfaction"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Slide-in Menu */}
        <div
          className={`fixed right-0 top-0 h-full w-80 bg-white shadow-lg transform ${
            showMenu ? 'translate-x-0' : 'translate-x-full'
          } transition-transform duration-300 ease-in-out`}
        >
          <button
            onClick={toggleMenu}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
          >
            ✖
          </button>
          <MenuCard />
        </div>

        {/* Instructions Tab */}
        <div
          className={`fixed right-0 top-0 h-full w-80 bg-orange-50 shadow-lg transform ${
            showInstructions ? 'translate-x-0' : 'translate-x-full'
          } transition-transform duration-300 ease-in-out`}
        >
          <button
            onClick={toggleInstructions}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
          >
            ✖
          </button>
          <div className="p-6">
          <h2 className="text-lg font-bold text-gray-700 mb-4">Contact Details</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Phone: +91 (123) 456-7890</li>
                <li>Email: support@company.com</li>
                <li>Address: 123 Pizza Street, Food City, India 12345</li>
                <li>Customer Support Hours: Mon-Sun, 9 AM - 9 PM</li>
              </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;