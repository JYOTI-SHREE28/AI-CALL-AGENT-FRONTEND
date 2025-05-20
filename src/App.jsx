import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/analytics-dashboard';
import MultiCallDashboard from './components/MultiCallDashboard';
import { Analytics } from '@vercel/analytics/react';
import { usePageTracking } from './components/usePageTracking'; 

const RouteWrapper = () => {
  usePageTracking(); 

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/multi-call" element={<MultiCallDashboard />} />
    </Routes>
  );
};

const App = () => {
  return (
    <>
      <Analytics />
      <Router>
        <RouteWrapper />
      </Router>
    </>
  );
};

export default App;
