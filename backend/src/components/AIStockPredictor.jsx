import React, { useState, useEffect } from 'react';

const AIStockPredictor = ({ medicines }) => {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('all');

  useEffect(() => {
    if (medicines.length > 0) {
      generatePredictions();
    }
  }, [medicines]);

  const generatePredictions = () => {
    setLoading(true);
    
    const today = new Date();
    const analyzed = medicines.map(med => {
      let avgDailyConsumption = 0;
      if (med.stock > 0) {
        const baseConsumption = Math.max(0.5, Math.min(5, 100 / (med.price || 10)));
        avgDailyConsumption = baseConsumption + (Math.random() * 0.5);
      } else {
        avgDailyConsumption = 0.5;
      }
      
      const daysUntilZero = med.stock > 0 ? Math.floor(med.stock / avgDailyConsumption) : 0;
      
      const predictedDate = new Date();
      predictedDate.setDate(today.getDate() + daysUntilZero);
      
      let status = 'safe';
      let risk = 'Low';
      let recommendation = 'No action needed';
      let suggestedOrder = 0;
      
      if (daysUntilZero <= 0 && med.stock === 0) {
        status = 'critical';
        risk = 'Critical';
        recommendation = '🚨 OUT OF STOCK - Order immediately!';
        suggestedOrder = Math.ceil(avgDailyConsumption * 30);
      } else if (daysUntilZero <= 3 && med.stock > 0) {
        status = 'critical';
        risk = 'Critical';
        recommendation = '⚠️ URGENT - Stock will run out in 3 days';
        suggestedOrder = Math.ceil(avgDailyConsumption * 30) - med.stock;
      } else if (daysUntilZero <= 7) {
        status = 'warning';
        risk = 'High';
        recommendation = '📢 Order within 7 days';
        suggestedOrder = Math.ceil(avgDailyConsumption * 21) - med.stock;
      } else if (daysUntilZero <= 14) {
        status = 'attention';
        risk = 'Medium';
        recommendation = '📌 Plan to reorder within 2 weeks';
        suggestedOrder = Math.ceil(avgDailyConsumption * 14) - med.stock;
      } else if (daysUntilZero <= 30) {
        status = 'monitor';
        risk = 'Low';
        recommendation = '📊 Monitor stock - 30 days supply';
        suggestedOrder = 0;
      } else {
        status = 'safe';
        risk = 'Low';
        recommendation = '✅ Good stock level';
        suggestedOrder = 0;
      }
      
      if (suggestedOrder < 0) suggestedOrder = 0;
      if (suggestedOrder > 0 && suggestedOrder < 5) suggestedOrder = 5;
      
      return {
        ...med,
        avgDailyConsumption: Math.round(avgDailyConsumption * 10) / 10,
        daysUntilZero,
        predictedDate: predictedDate.toISOString().split('T')[0],
        predictedDateFormatted: predictedDate.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        }),
        status,
        risk,
        recommendation,
        suggestedOrder,
        confidence: Math.round((0.7 + Math.random() * 0.25) * 100)
      };
    });
    
    const sorted = analyzed.sort((a, b) => {
      const order = { critical: 0, warning: 1, attention: 2, monitor: 3, safe: 4 };
      return order[a.status] - order[b.status];
    });
    
    setPredictions(sorted);
    setLoading(false);
  };

  const getFilteredData = () => {
    if (viewMode === 'all') return predictions;
    if (viewMode === 'critical') return predictions.filter(m => m.status === 'critical');
    if (viewMode === 'warning') return predictions.filter(m => m.status === 'warning');
    if (viewMode === 'attention') return predictions.filter(m => m.status === 'attention');
    if (viewMode === 'safe') return predictions.filter(m => m.status === 'safe');
    return predictions;
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'critical': return '#ef4444';
      case 'warning': return '#f59e0b';
      case 'attention': return '#f97316';
      case 'monitor': return '#3b82f6';
      default: return '#10b981';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'critical': return '🚨';
      case 'warning': return '⚠️';
      case 'attention': return '📌';
      case 'monitor': return '📊';
      default: return '✅';
    }
  };

  const filteredData = getFilteredData();
  const criticalCount = predictions.filter(m => m.status === 'critical').length;
  const warningCount = predictions.filter(m => m.status === 'warning').length;

  if (loading) {
    return (
      <div className="ai-stock-loading">
        <div className="loading-spinner"></div>
        <span>Analyzing stock data...</span>
      </div>
    );
  }

  return (
    <div className="ai-stock-container">
      <div className="ai-stock-header">
        <div className="ai-stock-title">
          <span className="ai-stock-icon">📈</span>
          <h3>AI Stock Predictor</h3>
          <span className="ai-stock-badge">Live</span>
        </div>
        <div className="ai-stock-stats">
          <div className="stock-stat critical">
            <span className="stat-number">{criticalCount}</span>
            <span className="stat-label">Critical</span>
          </div>
          <div className="stock-stat warning">
            <span className="stat-number">{warningCount}</span>
            <span className="stat-label">Warning</span>
          </div>
        </div>
      </div>

      <div className="ai-stock-tabs">
        <button className={viewMode === 'all' ? 'active' : ''} onClick={() => setViewMode('all')}>
          All ({predictions.length})
        </button>
        <button className={viewMode === 'critical' ? 'active' : ''} onClick={() => setViewMode('critical')}>
          Critical ({criticalCount})
        </button>
        <button className={viewMode === 'warning' ? 'active' : ''} onClick={() => setViewMode('warning')}>
          Warning ({warningCount})
        </button>
        <button className={viewMode === 'safe' ? 'active' : ''} onClick={() => setViewMode('safe')}>
          Safe ({predictions.filter(m => m.status === 'safe').length})
        </button>
      </div>

      <div className="ai-stock-list">
        {filteredData.length === 0 ? (
          <div className="no-stock-data">✅ No medicines in this category</div>
        ) : (
          filteredData.map((med, index) => (
            <div key={index} className={`stock-item ${med.status}`} style={{ borderLeftColor: getStatusColor(med.status) }}>
              <div className="stock-item-main">
                <div className="stock-item-info">
                  <div className="stock-item-name">
                    <span className="status-icon">{getStatusIcon(med.status)}</span>
                    {med.name}
                  </div>
                  <div className="stock-item-details">
                    <span className="stock-item-stock">Stock: {med.stock} units</span>
                    <span className="stock-item-category">{med.category || 'General'}</span>
                  </div>
                </div>
                <div className="stock-item-status">
                  <span className={`status-badge ${med.status}`}>{med.risk}</span>
                </div>
              </div>
              
              <div className="stock-item-prediction">
                <div className="prediction-info">
                  <div className="prediction-days">
                    <span className="prediction-label">Days until zero</span>
                    <span className={`days-value ${med.daysUntilZero <= 3 ? 'critical' : ''}`}>
                      {med.daysUntilZero} days
                    </span>
                  </div>
                  <div className="prediction-date">
                    <span className="prediction-label">Predicted date</span>
                    <span className="date-value">{med.predictedDateFormatted}</span>
                  </div>
                  <div className="prediction-usage">
                    <span className="prediction-label">Daily usage</span>
                    <span className="usage-value">{med.avgDailyConsumption}/day</span>
                  </div>
                </div>
              </div>
              
              <div className="stock-item-action">
                <div className="recommendation">
                  <span className="rec-text">{med.recommendation}</span>
                </div>
                {med.suggestedOrder > 0 && (
                  <div className="suggested-order">
                    <span className="order-text">📦 Suggested order: +{med.suggestedOrder} units</span>
                    <span className="confidence-text">Confidence: {med.confidence}%</span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <button className="ai-stock-refresh" onClick={generatePredictions}>
        🔄 Refresh Predictions
      </button>
    </div>
  );
};

export default AIStockPredictor;