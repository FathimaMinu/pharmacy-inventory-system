import React, { useState } from 'react';
import { 
  FiDollarSign, 
  FiPackage, 
  FiBarChart2, 
  FiCalendar, 
  FiClock, 
  FiUser, 
  FiArrowLeft,
  FiTrendingUp,
  FiFilter,
  FiPrinter,
  FiDownload,
  FiSearch
} from 'react-icons/fi';

const SalesHistory = ({ medicines }) => {
  const [period, setPeriod] = useState('today');
  const [selectedMedicine, setSelectedMedicine] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Generate mock sales data
  const generateSalesData = () => {
    const sales = [];
    const today = new Date();
    const medicineNames = medicines.map(m => m.name);
    
    if (medicineNames.length === 0) {
      medicineNames.push('Paracetamol 500mg', 'Amoxicillin 250mg', 'Vitamin C 500mg');
    }
    
    medicineNames.forEach((name, idx) => {
      const days = period === 'today' ? 1 : period === 'week' ? 7 : 30;
      const limit = Math.min(days, 5);
      
      for (let i = 0; i < limit; i++) {
        const date = new Date();
        date.setDate(today.getDate() - i);
        const quantity = Math.floor(Math.random() * 4) + 1;
        const price = Math.floor(Math.random() * 200) + 30;
        
        sales.push({
          id: `INV-${String(idx + 1).padStart(3, '0')}${String(i + 1).padStart(2, '0')}`,
          medicineName: name,
          quantity: quantity,
          price: price,
          total: quantity * price,
          date: date.toLocaleDateString('en-GB', { 
            day: '2-digit', 
            month: 'short', 
            year: 'numeric' 
          }),
          time: `${String(Math.floor(Math.random() * 12) + 8).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
          customer: ['Walk-in', 'Regular', 'Prescription', 'Online'][Math.floor(Math.random() * 4)]
        });
      }
    });
    
    return sales.sort((a, b) => {
      const dateA = new Date(a.date.split(' ').reverse().join(' '));
      const dateB = new Date(b.date.split(' ').reverse().join(' '));
      return dateB - dateA;
    });
  };

  const salesData = generateSalesData();
  
  const filteredSales = salesData
    .filter(s => selectedMedicine === 'all' || s.medicineName === selectedMedicine)
    .filter(s => s.medicineName.toLowerCase().includes(searchTerm.toLowerCase()));

  const totalSales = filteredSales.reduce((sum, s) => sum + s.total, 0);
  const totalItems = filteredSales.reduce((sum, s) => sum + s.quantity, 0);

  if (medicines.length === 0 && salesData.length === 0) {
    return (
      <div className="sales-history-page">
        <div className="page-header">
          <div className="page-header-left">
            <h2>💰 Sales History</h2>
            <span className="sales-count">No data</span>
          </div>
          <button className="back-btn" onClick={() => window.history.back()}>
            <FiArrowLeft size={16} /> Back
          </button>
        </div>
        <div className="no-sales-data">
          <div className="no-sales-icon">📭</div>
          <p>No sales records found. Add medicines and make sales!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="sales-history-page">
      {/* Header */}
      <div className="page-header">
        <div className="page-header-left">
          <h2>💰 Sales History</h2>
          <span className="sales-count">{filteredSales.length} transactions</span>
        </div>
        <div className="page-header-right">
          <button className="action-btn" onClick={() => alert('📄 Printing...')}>
            <FiPrinter size={16} /> Print
          </button>
          <button className="action-btn" onClick={() => alert('📥 Exporting...')}>
            <FiDownload size={16} /> Export
          </button>
          <button className="back-btn" onClick={() => window.history.back()}>
            <FiArrowLeft size={16} /> Back
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="sales-summary">
        <div className="sales-stat">
          <div className="stat-icon-wrapper">
            <FiDollarSign size={24} />
          </div>
          <div>
            <span className="stat-value">LKR {totalSales.toFixed(2)}</span>
            <span className="stat-label"> Total Revenue</span>
          </div>
        </div>
        <div className="sales-stat">
          <div className="stat-icon-wrapper blue">
            <FiPackage size={24} />
          </div>
          <div>
            <span className="stat-value">{totalItems}</span>
            <span className="stat-label"> Items Sold</span>
          </div>
        </div>
        <div className="sales-stat">
          <div className="stat-icon-wrapper purple">
            <FiBarChart2 size={24} />
          </div>
          <div>
            <span className="stat-value">{filteredSales.length}</span>
            <span className="stat-label"> Transactions</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="sales-filters">
        <div className="filter-group">
          <label><FiCalendar size={14} /> Period</label>
          <button className={period === 'today' ? 'active' : ''} onClick={() => setPeriod('today')}>
            Today
          </button>
          <button className={period === 'week' ? 'active' : ''} onClick={() => setPeriod('week')}>
            Week
          </button>
          <button className={period === 'month' ? 'active' : ''} onClick={() => setPeriod('month')}>
            Month
          </button>
        </div>
        <div className="filter-group">
          <label><FiFilter size={14} /> Medicine</label>
          <select value={selectedMedicine} onChange={(e) => setSelectedMedicine(e.target.value)}>
            <option value="all">All Medicines</option>
            {medicines.map(m => (
              <option key={m.id} value={m.name}>{m.name}</option>
            ))}
          </select>
        </div>
        <div className="filter-group search-group">
          <FiSearch size={14} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search medicine..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="sales-table-container">
        {filteredSales.length === 0 ? (
          <div className="no-sales-data">
            <div className="no-sales-icon">📭</div>
            <p>No sales records for this period</p>
          </div>
        ) : (
          <table className="sales-table">
            <thead>
              <tr>
                <th>Invoice</th>
                <th>Medicine</th>
                <th className="text-center">Qty</th>
                <th className="text-right">Price</th>
                <th className="text-right">Total</th>
                <th>Date</th>
                <th>Time</th>
                <th>Customer</th>
              </tr>
            </thead>
            <tbody>
              {filteredSales.slice(0, 50).map((sale, idx) => (
                <tr key={idx}>
                  <td><span className="invoice-id">{sale.id}</span></td>
                  <td><span className="medicine-name">{sale.medicineName}</span></td>
                  <td className="text-center"><span className="qty-badge">{sale.quantity}</span></td>
                  <td className="text-right">LKR {sale.price.toFixed(2)}</td>
                  <td className="text-right total-amount">LKR {sale.total.toFixed(2)}</td>
                  <td><span className="date-tag">{sale.date}</span></td>
                  <td><span className="time-tag">{sale.time}</span></td>
                  <td><span className={`customer-tag ${sale.customer.toLowerCase()}`}>
                    {sale.customer}
                  </span></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default SalesHistory;