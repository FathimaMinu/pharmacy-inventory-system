import React from 'react';

const Header = ({ userName, onAddClick, lowStockCount, searchTerm, setSearchTerm }) => {
  return (
    <div className="welcome-banner">
      <div>
        <h2>Welcome back, {userName}</h2>
        <p>Manage your inventory efficiently</p>
      </div>
      <div className="welcome-actions">
        <input 
          type="text" 
          placeholder="Search medicines..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn-add" onClick={onAddClick}>
          + Add Medicine
        </button>
      </div>
    </div>
  );
};

export default Header;