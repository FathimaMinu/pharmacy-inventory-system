import React from 'react';
import { FaPills, FaExclamationTriangle, FaCalendarAlt, FaDollarSign, FaArrowRight } from 'react-icons/fa';

export default function DashboardCards({ 
  totalMedicines, 
  lowStockCount, 
  expiringCount, 
  totalValue,
  onLowStockClick,
  onMedicineListClick,
  onExpiringClick,
  onValueClick
}) {
  return (
    <div className="dashboard-cards">
      <div className="card" onClick={onMedicineListClick}>
        <div className="card-icon blue">
          <FaPills />
        </div>
        <div className="card-content">
          <h3>TOTAL MEDICINES</h3>
          <p className="card-value">{totalMedicines}</p>
          <p className="card-desc">All inventory items</p>
          <button className="card-link">view all <FaArrowRight /></button>
        </div>
      </div>

      <div className="card" onClick={onLowStockClick}>
        <div className="card-icon orange">
          <FaExclamationTriangle />
        </div>
        <div className="card-content">
          <h3>LOW STOCK ALERT</h3>
          <p className="card-value">{lowStockCount}</p>
          <p className="card-desc">Items below 5 units</p>
          <button className="card-link">Restock Now <FaArrowRight /></button>
        </div>
      </div>

      <div className="card" onClick={onExpiringClick}>
        <div className="card-icon purple">
          <FaCalendarAlt />
        </div>
        <div className="card-content">
          <h3>EXPIRING SOON</h3>
          <p className="card-value">{expiringCount}</p>
          <p className="card-desc">Within 30 days</p>
          <button className="card-link">Check Dates <FaArrowRight /></button>
        </div>
      </div>

      <div className="card" onClick={onValueClick}>
        <div className="card-icon green">
          <FaDollarSign />
        </div>
        <div className="card-content">
          <h3>TOTAL VALUE</h3>
          <p className="card-value">
            <span className="currency">LKR</span> {totalValue.toFixed(2)}
          </p>
          <p className="card-desc">Inventory worth</p>
          <button className="card-link">View Details <FaArrowRight /></button>
        </div>
      </div>
    </div>
  );
}