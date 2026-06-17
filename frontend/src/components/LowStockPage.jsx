import React, { useState } from 'react';
import { 
  FiAlertCircle, 
  FiAlertTriangle, 
  FiEdit2, 
  FiShoppingCart, 
  FiArrowLeft,
  FiPackage,
  FiDollarSign,
  FiFilter,
  FiXCircle,
  FiTrendingDown
} from 'react-icons/fi';

const LowStockPage = ({ medicines, onEdit, onBack }) => {
  const [filter, setFilter] = useState('all');

  const lowStockMedicines = medicines?.filter(m => m.stock < 5) || [];
  
  const getStockStatus = (stock) => {
    if (stock === 0) return { 
      class: 'critical', 
      label: 'Out of Stock', 
      icon: FiXCircle,
      color: '#dc2626'
    };
    if (stock < 3) return { 
      class: 'urgent', 
      label: 'Urgent', 
      icon: FiAlertTriangle,
      color: '#d97706'
    };
    return { 
      class: 'warning', 
      label: 'Low Stock', 
      icon: FiAlertCircle,
      color: '#2563eb'
    };
  };

  const getFilteredData = () => {
    if (filter === 'all') return lowStockMedicines;
    if (filter === 'critical') return lowStockMedicines.filter(m => m.stock === 0);
    if (filter === 'urgent') return lowStockMedicines.filter(m => m.stock > 0 && m.stock < 3);
    if (filter === 'warning') return lowStockMedicines.filter(m => m.stock >= 3 && m.stock < 5);
    return lowStockMedicines;
  };

  const filteredData = getFilteredData();
  const criticalCount = lowStockMedicines.filter(m => m.stock === 0).length;
  const urgentCount = lowStockMedicines.filter(m => m.stock > 0 && m.stock < 3).length;
  const warningCount = lowStockMedicines.filter(m => m.stock >= 3 && m.stock < 5).length;

  if (lowStockMedicines.length === 0) {
    return (
      <div className="lowstock-page">
        <div className="page-header">
          <div className="page-header-left">
            <h2><FiAlertCircle size={22} /> Low Stock Management</h2>
            <span className="stock-count">✅ All medicines have sufficient stock</span>
          </div>
          <button className="back-btn" onClick={onBack}>
            <FiArrowLeft size={16} /> Back to Dashboard
          </button>
        </div>
        <div className="no-stock-data">
          <div className="no-stock-icon">✅</div>
          <p>No low stock medicines found. All inventory is healthy!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="lowstock-page">
      <div className="page-header">
        <div className="page-header-left">
          <h2><FiAlertCircle size={22} /> Low Stock Management</h2>
          <span className="stock-count">
            <FiPackage size={14} /> {lowStockMedicines.length} medicines need attention
          </span>
        </div>
        <button className="back-btn" onClick={onBack}>
          <FiArrowLeft size={16} /> Back to Dashboard
        </button>
      </div>

      <div className="stock-summary">
        <div className="summary-card critical">
          <div className="summary-icon-wrapper">
            <FiXCircle size={28} />
          </div>
          <div className="summary-info">
            <span className="summary-number">{criticalCount}</span>
            <span className="summary-label">Out of Stock</span>
          </div>
        </div>
        <div className="summary-card urgent">
          <div className="summary-icon-wrapper">
            <FiAlertTriangle size={28} />
          </div>
          <div className="summary-info">
            <span className="summary-number">{urgentCount}</span>
            <span className="summary-label">Urgent (1-2 units)</span>
          </div>
        </div>
        <div className="summary-card warning">
          <div className="summary-icon-wrapper">
            <FiAlertCircle size={28} />
          </div>
          <div className="summary-info">
            <span className="summary-number">{warningCount}</span>
            <span className="summary-label">Low Stock (3-4 units)</span>
          </div>
        </div>
      </div>

      <div className="stock-filters">
        <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>
          <FiFilter size={14} /> All ({lowStockMedicines.length})
        </button>
        <button className={filter === 'critical' ? 'active' : ''} onClick={() => setFilter('critical')}>
          <FiXCircle size={14} /> Out of Stock ({criticalCount})
        </button>
        <button className={filter === 'urgent' ? 'active' : ''} onClick={() => setFilter('urgent')}>
          <FiAlertTriangle size={14} /> Urgent ({urgentCount})
        </button>
        <button className={filter === 'warning' ? 'active' : ''} onClick={() => setFilter('warning')}>
          <FiAlertCircle size={14} /> Low ({warningCount})
        </button>
      </div>

      <div className="stock-table-container">
        {filteredData.length === 0 ? (
          <div className="no-stock-data">
            <div className="no-stock-icon">✅</div>
            <p>No medicines in this category</p>
          </div>
        ) : (
          <table className="stock-table">
            <thead>
              <tr>
                <th>Status</th>
                <th>Medicine</th>
                <th>Category</th>
                <th>Manufacturer</th>
                <th>Stock</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((med) => {
                const status = getStockStatus(med.stock);
                const StatusIcon = status.icon;
                return (
                  <tr key={med.id} className={`stock-row ${status.class}`}>
                    <td>
                      <span className={`status-badge ${status.class}`}>
                        <StatusIcon size={14} /> {status.label}
                      </span>
                    </td>
                    <td>
                      <span className="medicine-name-cell">{med.name}</span>
                    </td>
                    <td>{med.category || 'N/A'}</td>
                    <td>{med.manufacturer || 'N/A'}</td>
                    <td>
                      <span className={`stock-value ${status.class}`}>
                        {med.stock} units
                      </span>
                    </td>
                    <td>
                      <span className="price-cell">
                        <FiDollarSign size={14} /> LKR {med.price?.toFixed(2) || 0}
                      </span>
                    </td>
                    <td>
                      <button className="edit-btn" onClick={() => onEdit(med)}>
                        <FiEdit2 size={14} /> Edit
                      </button>
                      <button className="order-btn" onClick={() => alert(`📦 Order ${med.name}\nSuggested: ${20 - med.stock} units`)}>
                        <FiShoppingCart size={14} /> Order
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default LowStockPage;