import React from 'react';
import { 
  FiHome, 
  FiPackage, 
  FiAlertTriangle, 
  FiCalendar, 
  FiTrendingUp, 
  FiDollarSign, 
  FiSettings,
  FiMenu,
  FiX,
  FiLogOut
} from 'react-icons/fi';

const Sidebar = ({ 
  currentPage, 
  setCurrentPage, 
  isOpen, 
  toggleSidebar,
  handleLogout  // ← ADD THIS
}) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: FiHome },
    { id: 'medicinelist', label: 'Medicine List', icon: FiPackage },
    { id: 'lowstock', label: 'Low Stock', icon: FiAlertTriangle },
    { id: 'expiring', label: 'Expiry Alert', icon: FiCalendar },
    { id: 'ai-predictor', label: 'AI Predictor', icon: FiTrendingUp },
    { id: 'sales', label: 'Sales History', icon: FiDollarSign },
    { id: 'settings', label: 'Settings', icon: FiSettings },
  ];

  return (
    <div className={`sidebar ${!isOpen ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <span className="logo-text">
            Medi<span>Care</span>
          </span>
        </div>
        <button className="menu-toggle-btn" onClick={toggleSidebar}>
          {isOpen ? <FiX size={18} /> : <FiMenu size={18} />}
        </button>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className={currentPage === item.id ? 'active' : ''}
              onClick={() => setCurrentPage(item.id)}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
        
        {/* Logout Button */}
        <button className="logout-sidebar-btn" onClick={handleLogout}>
          <FiLogOut size={20} />
          <span>Logout</span>
        </button>
      </nav>

      <div className="sidebar-footer">
        <span>v2.0.0</span>
      </div>
    </div>
  );
};

export default Sidebar;