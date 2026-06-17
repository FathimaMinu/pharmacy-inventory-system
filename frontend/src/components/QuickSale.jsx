import React, { useState } from 'react';
import { 
  FiShoppingBag, 
  FiTrendingUp, 
  FiPackage, 
  FiAlertCircle,
  FiCheckCircle,
  FiDollarSign,
  FiDownload,
  FiPrinter
} from 'react-icons/fi';

const QuickSale = ({ medicines, onSaleComplete }) => {
  const [selectedMedicine, setSelectedMedicine] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [saleHistory, setSaleHistory] = useState([]);

  const topMedicines = medicines?.slice(0, 4) || [];

  const getStockInfo = (stock) => {
    if (stock === 0) return { class: 'out', text: 'Out of Stock', icon: FiAlertCircle };
    if (stock < 5) return { class: 'low', text: `Stock: ${stock}`, icon: FiPackage };
    if (stock < 15) return { class: 'normal', text: `Stock: ${stock}`, icon: FiPackage };
    return { class: 'high', text: `Stock: ${stock}`, icon: FiPackage };
  };

  const handleDispense = () => {
    if (!selectedMedicine) {
      alert('Please select a medicine');
      return;
    }

    const medicine = medicines.find(m => m.id === parseInt(selectedMedicine));
    
    if (!medicine) {
      alert('Medicine not found');
      return;
    }

    if (medicine.stock < quantity) {
      alert(`Insufficient stock! Only ${medicine.stock} units available.`);
      return;
    }

    const totalPrice = medicine.price * quantity;
    
    // Add to sale history
    const saleRecord = {
      id: `SALE-${Date.now()}`,
      medicineName: medicine.name,
      quantity: quantity,
      price: medicine.price,
      total: totalPrice,
      date: new Date().toLocaleDateString('en-GB', { 
        day: '2-digit', 
        month: 'short', 
        year: 'numeric' 
      }),
      time: new Date().toLocaleTimeString('en-GB', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };
    
    setSaleHistory([saleRecord, ...saleHistory]);
    
    alert(`✅ Dispensed!\n\n${medicine.name}\nQty: ${quantity}\nTotal: LKR ${totalPrice.toFixed(2)}`);
    
    if (onSaleComplete) {
      const updatedMedicine = { ...medicine, stock: medicine.stock - quantity };
      onSaleComplete(updatedMedicine);
    }
    
    setSelectedMedicine('');
    setQuantity(1);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  // Export as CSV
  const exportToCSV = () => {
    if (saleHistory.length === 0) {
      alert('No sales to export. Make some sales first!');
      return;
    }

    const headers = ['Invoice', 'Medicine', 'Quantity', 'Price', 'Total', 'Date', 'Time'];
    const rows = saleHistory.map(sale => [
      sale.id,
      sale.medicineName,
      sale.quantity,
      sale.price.toFixed(2),
      sale.total.toFixed(2),
      sale.date,
      sale.time
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sales_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    alert('✅ Sales exported successfully!');
  };

  // Export as PDF (Simple Print)
  const exportToPDF = () => {
    if (saleHistory.length === 0) {
      alert('No sales to export. Make some sales first!');
      return;
    }

    const printWindow = window.open('', '_blank');
    const tableRows = saleHistory.map(sale => `
      <tr>
        <td>${sale.id}</td>
        <td>${sale.medicineName}</td>
        <td>${sale.quantity}</td>
        <td>LKR ${sale.price.toFixed(2)}</td>
        <td>LKR ${sale.total.toFixed(2)}</td>
        <td>${sale.date}</td>
        <td>${sale.time}</td>
      </tr>
    `).join('');

    printWindow.document.write(`
      <html>
        <head>
          <title>Sales Report</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; }
            h1 { color: #1a2332; border-bottom: 2px solid #e4e7ec; padding-bottom: 10px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th { background: #1a2332; color: white; padding: 10px; text-align: left; }
            td { padding: 8px 10px; border-bottom: 1px solid #e4e7ec; }
            .total { font-weight: bold; margin-top: 20px; text-align: right; font-size: 16px; }
          </style>
        </head>
        <body>
          <h1>📊 Sales Report</h1>
          <p>Generated: ${new Date().toLocaleString()}</p>
          <p>Total Sales: ${saleHistory.length} transactions</p>
          <table>
            <thead>
              <tr>
                <th>Invoice</th>
                <th>Medicine</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
                <th>Date</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              ${tableRows}
            </tbody>
          </table>
          <div class="total">
            Grand Total: LKR ${saleHistory.reduce((sum, s) => sum + s.total, 0).toFixed(2)}
          </div>
          <p style="margin-top: 30px; color: #94a3b8; font-size: 12px;">MediCare Pharmacy System</p>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="quick-sale">
      <div className="quick-sale-header">
        <h3><FiShoppingBag size={20} /> Quick Sale</h3>
        <div className="header-actions">
          <button className="export-btn-small" onClick={exportToCSV} title="Export as CSV">
            <FiDownload size={16} /> Export CSV
          </button>
          <button className="export-btn-small print" onClick={exportToPDF} title="Print Report">
            <FiPrinter size={16} /> Print
          </button>
          <span className="badge">
            <FiTrendingUp size={14} /> Top Selling
          </span>
        </div>
      </div>

      <div className="quick-sale-grid">
        {topMedicines.map((medicine) => {
          const stockInfo = getStockInfo(medicine.stock);
          const StockIcon = stockInfo.icon;
          return (
            <div 
              key={medicine.id} 
              className={`sale-item ${selectedMedicine === medicine.id.toString() ? 'selected' : ''}`}
              onClick={() => setSelectedMedicine(medicine.id.toString())}
            >
              <div className="sale-item-name">{medicine.name}</div>
              <div className="sale-item-price">
                <FiDollarSign size={14} /> LKR {medicine.price?.toFixed(2) || 0}
              </div>
              <div className={`sale-item-stock ${stockInfo.class}`}>
                <StockIcon size={14} /> {stockInfo.text}
              </div>
            </div>
          );
        })}
      </div>

      <div className="sale-controls">
        <select 
          value={selectedMedicine} 
          onChange={(e) => setSelectedMedicine(e.target.value)}
        >
          <option value="">🔍 Select Medicine</option>
          {medicines?.map(medicine => (
            <option key={medicine.id} value={medicine.id}>
              {medicine.name} - Stock: {medicine.stock}
            </option>
          ))}
        </select>

        <input 
          type="number" 
          value={quantity} 
          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
          min="1"
          placeholder="Qty"
        />

        <button onClick={handleDispense}>
          <FiShoppingBag size={16} /> Dispense
        </button>
      </div>

      {showSuccess && (
        <div className="success-message">
          <FiCheckCircle size={18} /> Sale completed successfully!
        </div>
      )}

      {/* Sale History Summary */}
      {saleHistory.length > 0 && (
        <div className="sale-history-summary">
          <div className="summary-header">
            <span className="summary-title">📋 Today's Sales</span>
            <span className="summary-count">{saleHistory.length} items</span>
          </div>
          <div className="summary-total">
            Total: LKR {saleHistory.reduce((sum, s) => sum + s.total, 0).toFixed(2)}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickSale;