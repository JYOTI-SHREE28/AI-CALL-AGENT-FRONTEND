import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/analytics-dashboard';
import MultiCallDashboard from './components/MultiCallDashboard';
import { Analytics } from '@vercel/analytics/next';

const App = () => {
  return (
    <Router>
      <Analytics /> {/* Moved outside of Routes */}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/multi-call" element={<MultiCallDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
