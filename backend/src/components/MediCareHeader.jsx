import React from 'react';

const MediCareHeader = () => {
  return (
    <div className="medicare-header">
      <div className="medicare-info">
        <h1 className="header-title">MediCare Pharmacy Inventory System</h1>
        <div className="medicare-details">
          <span className="detail-item">
            <span className="detail-label">Logged in as:</span>
            <span className="detail-value">Pharmacist</span>
          </span>
          <span className="detail-divider"></span>
          <span className="detail-item">
            <span className="detail-label">Branch:</span>
            <span className="detail-value">Colombo</span>
          </span>
        </div>
      </div>
      <div className="header-pattern"></div>
    </div>
  );
};

export default MediCareHeader;