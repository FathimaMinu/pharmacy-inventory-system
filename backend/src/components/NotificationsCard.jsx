import React from 'react';

const NotificationsCard = ({ medicines, expiryAlerts }) => {
  const lowStockMedicines = medicines?.filter(m => m.stock < 5) || [];

  const getNotifications = () => {
    const notifications = [];

    if (lowStockMedicines.length > 0) {
      notifications.push({
        text: `${lowStockMedicines[0].name} stock critically low`,
        critical: true
      });
    }

    notifications.push({
      text: 'New stock added',
      critical: false
    });

    return notifications;
  };

  const notifications = getNotifications();

  return (
    <div className="notifications-card">
      <h3>Notifications</h3>
      {notifications.map((notif, index) => (
        <div className="notification-item" key={index}>
          <span className={`notification-dot ${notif.critical ? 'critical' : ''}`}></span>
          <span>{notif.text}</span>
        </div>
      ))}
      <div className="view-all">
        <button>View All →</button>
      </div>
    </div>
  );
};

export default NotificationsCard;