import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/analytics-dashboard';
import MultiCallDashboard from './components/MultiCallDashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/multi-call" element={<MultiCallDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;