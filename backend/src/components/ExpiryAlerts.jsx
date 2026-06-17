import React from 'react';
import { FaCalendarAlt, FaExclamationTriangle, FaClock } from 'react-icons/fa';

export default function ExpiryAlerts({ alerts }) {
  const getAlertIcon = (status) => {
    switch(status) {
      case 'critical':
        return <FaExclamationTriangle className="alert-icon-critical" />;
      case 'warning':
        return <FaClock className="alert-icon-warning" />;
      default:
        return <FaCalendarAlt className="alert-icon-info" />;
    }
  };

  const getStatusText = (daysLeft) => {
    if (daysLeft <= 7) return 'Critical - Expiring soon!';
    if (daysLeft <= 15) return 'Warning - Check expiry';
    return 'Monitor - Expiring in ' + daysLeft + ' days';
  };

  return (
    <div className="expiry-alerts">
      <div className="alerts-header">
        <h3>Expiry Alerts</h3>
        {alerts.length > 0 && (
          <span className="alert-count">{alerts.length}</span>
        )}
      </div>

      {alerts.length === 0 ? (
        <div className="no-alerts">
          <FaCalendarAlt className="no-alerts-icon" />
          <p>No medicines expiring soon</p>
        </div>
      ) : (
        <div className="alerts-list">
          {alerts.map(alert => (
            <div key={alert.id} className={`alert-item ${alert.status}`}>
              <div className="alert-icon-wrapper">
                {getAlertIcon(alert.status)}
              </div>
              <div className="alert-details">
                <h4>{alert.name}</h4>
                <p className="expiry-date">Expires: {alert.expiryDate}</p>
                <p className="expiry-status">{getStatusText(alert.daysLeft)}</p>
                <div className="progress-bar">
                  <div 
                    className={`progress-fill ${alert.status}`}
                    style={{ width: `${Math.max(0, 100 - (alert.daysLeft * 3.33))}%` }}
                  ></div>
                </div>
              </div>
              <span className="days-badge">{alert.daysLeft}d</span>
            </div>
          ))}
        </div>
      )}

      {alerts.length > 0 && (
        <button className="view-all-alerts">
          View All Expiry Alerts →
        </button>
      )}
    </div>
  );
}