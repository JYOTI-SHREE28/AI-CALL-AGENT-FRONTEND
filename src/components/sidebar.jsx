
import React from 'react';
import { Phone, Users, BarChart, Settings } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-16 min-h-screen bg-gray-900 flex flex-col items-center py-8 space-y-8">
      <NavLink to="/" title="Dashboard" className={({ isActive }) => (isActive ? 'text-white' : 'text-gray-400')}>
        <Phone size={24} />
      </NavLink>
      <NavLink to="/multi-call" title="MultiCall Dashboard" className={({ isActive }) => (isActive ? 'text-white' : 'text-gray-400')}>
        <Users size={24} />
      </NavLink>
      <BarChart className="text-gray-400" size={24} />
      <Settings className="text-gray-400" size={24} />
    </div>
  );
};

export default Sidebar;
