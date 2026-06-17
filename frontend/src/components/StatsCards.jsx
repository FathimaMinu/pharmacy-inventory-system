import React from 'react';
import { 
  FiDollarSign, 
  FiPackage, 
  FiAlertTriangle, 
  FiCalendar, 
  FiTrendingUp,
  FiAlertCircle,
  FiClock
} from 'react-icons/fi';

const StatsCards = ({ 
  totalMedicines, 
  lowStockCount, 
  expiringCount, 
  totalValue,
  criticalStockCount,
  criticalExpiringCount,
  onLowStockClick,
  onExpiringClick
}) => {
  return (
    <div className="stats-grid">
      {/* Total Value Card */}
      <div className="stat-card value-card">
        <div className="stat-icon-wrapper">
          <FiDollarSign size={28} />
        </div>
        <div className="stat-value">LKR {totalValue.toLocaleString()}</div>
        <div className="stat-label">Total Value</div>
        <div className="stat-sub">Inventory worth</div>
        <div className="stat-trend">
          <FiTrendingUp size={14} /> 12% last week
        </div>
      </div>

      {/* Total Medicines Card */}
      <div className="stat-card">
        <div className="stat-icon-wrapper blue">
          <FiPackage size={24} />
        </div>
        <div className="stat-value">{totalMedicines}</div>
        <div className="stat-label">Total Medicines</div>
        <div className="stat-sub">All inventory items</div>
      </div>

      {/* Low Stock Alert Card */}
      <div className="stat-card clickable" onClick={onLowStockClick}>
        <div className="stat-icon-wrapper orange">
          <FiAlertTriangle size={24} />
        </div>
        <div className="stat-value low-stock-value">{lowStockCount}</div>
        <div className="stat-label">Low Stock Alert</div>
        <div className="stat-sub">Items below 5 units</div>
        {criticalStockCount > 0 && (
          <div className="critical-badge">
            <FiAlertCircle size={12} /> {criticalStockCount} critical
          </div>
        )}
      </div>

      {/* Expiring Soon Card */}
      <div className="stat-card clickable" onClick={onExpiringClick}>
        <div className="stat-icon-wrapper purple">
          <FiCalendar size={24} />
        </div>
        <div className="stat-value expiring-value">{expiringCount}</div>
        <div className="stat-label">Expiring Soon</div>
        <div className="stat-sub">Within 30 days</div>
        {criticalExpiringCount > 0 && (
          <div className="critical-badge warning">
            <FiClock size={12} /> {criticalExpiringCount} critical
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCards;