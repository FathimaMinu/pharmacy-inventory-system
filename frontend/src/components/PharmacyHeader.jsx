import React from 'react';

export default function PharmacyHeader() {
  return (
    <div className="pharmacy-header-card">
      <div className="pharmacy-logo">
        <img src="/logo.jpg" alt="MediCare Pharmacy" />
      </div>
      <div className="pharmacy-info">
        <h2>MediCare Pharmacy Inventory System</h2>
        <div className="user-branch-info">
          <p>Logged in as: <strong>Pharmacist</strong></p>
          <p>Branch: <strong>Colombo</strong></p>
        </div>
      </div>
    </div>
  );
}