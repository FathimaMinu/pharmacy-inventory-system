import React, { useState, useEffect } from 'react';
import { 
  FiSave, 
  FiRefreshCcw, 
  FiArrowLeft,
  FiDollarSign, 
  FiBell, 
  FiMoon,
  FiCheckCircle, 
  FiDatabase, 
  FiCpu, 
  FiGlobe,
  FiAlertTriangle,
  FiCalendar,
  FiSettings,
  FiInfo,
  FiUser,
  FiMail,
  FiLock,
  FiShield,
  FiMonitor,
  FiHardDrive,
  FiClock,
  FiPrinter,
  FiPackage,
  FiShoppingCart,
  FiClock as FiTime
} from 'react-icons/fi';

const Settings = ({ medicines }) => {
  const loadSettings = () => {
    const saved = localStorage.getItem('pharmacySettings');
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      currency: 'LKR',
      language: 'en',
      timezone: 'Asia/Colombo',
      dateFormat: 'DD/MM/YYYY',
      lowStockThreshold: 5,
      criticalStockThreshold: 2,
      expiryAlertDays: 30,
      emailNotifications: true,
      lowStockAlerts: true,
      expiryAlerts: true,
      salesAlerts: true,
      systemAlerts: true,
      darkMode: false,
      compactView: false,
      showAnimations: true,
      twoFactorAuth: false,
      sessionTimeout: 30,
      autoRefresh: true,
      refreshInterval: 60,
      autoBackup: false,
      backupFrequency: 'daily',
      defaultTaxRate: 8,
      enableDiscounts: true,
      showCustomerInfo: true,
      printReceipts: true,
      receiptFooter: 'Thank you for shopping with MediCare!'
    };
  };

  const [settings, setSettings] = useState(loadSettings);
  const [showConfirm, setShowConfirm] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

  const saveSettings = () => {
    localStorage.setItem('pharmacySettings', JSON.stringify(settings));
    setShowConfirm(true);
    setTimeout(() => setShowConfirm(false), 3000);
    
    if (settings.darkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
  };

  const handleChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    if (window.confirm('Reset all settings to default?')) {
      const defaultSettings = {
        currency: 'LKR',
        language: 'en',
        timezone: 'Asia/Colombo',
        dateFormat: 'DD/MM/YYYY',
        lowStockThreshold: 5,
        criticalStockThreshold: 2,
        expiryAlertDays: 30,
        emailNotifications: true,
        lowStockAlerts: true,
        expiryAlerts: true,
        salesAlerts: true,
        systemAlerts: true,
        darkMode: false,
        compactView: false,
        showAnimations: true,
        twoFactorAuth: false,
        sessionTimeout: 30,
        autoRefresh: true,
        refreshInterval: 60,
        autoBackup: false,
        backupFrequency: 'daily',
        defaultTaxRate: 8,
        enableDiscounts: true,
        showCustomerInfo: true,
        printReceipts: true,
        receiptFooter: 'Thank you for shopping with MediCare!'
      };
      setSettings(defaultSettings);
      localStorage.setItem('pharmacySettings', JSON.stringify(defaultSettings));
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
  };

  useEffect(() => {
    if (settings.darkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
  }, []);

  const tabs = [
    { id: 'general', label: 'General', icon: FiSettings },
    { id: 'stock', label: 'Stock', icon: FiPackage },
    { id: 'notifications', label: 'Notifications', icon: FiBell },
    { id: 'appearance', label: 'Appearance', icon: FiMonitor },
    { id: 'security', label: 'Security', icon: FiShield },
    { id: 'system', label: 'System', icon: FiHardDrive },
    { id: 'sales', label: 'Sales', icon: FiShoppingCart },
    { id: 'printing', label: 'Printing', icon: FiPrinter },
  ];

  const renderTabContent = () => {
    switch(activeTab) {
      case 'general':
        return (
          <div className="settings-tab-content">
            <div className="settings-row">
              <div className="settings-item">
                <label><FiDollarSign size={16} /> Currency</label>
                <select 
                  value={settings.currency} 
                  onChange={(e) => handleChange('currency', e.target.value)}
                >
                  <option value="LKR"> LKR - Sri Lankan Rupee</option>
                  <option value="USD"> USD - US Dollar</option>
                  <option value="INR"> INR - Indian Rupee</option>
                  <option value="EUR"> EUR - Euro</option>
                  <option value="GBP"> GBP - British Pound</option>
                </select>
              </div>

              <div className="settings-item">
                <label><FiGlobe size={16} /> Language</label>
                <select 
                  value={settings.language} 
                  onChange={(e) => handleChange('language', e.target.value)}
                >
                  <option value="en"> English</option>
                  <option value="ta"> Tamil</option>
                  <option value="si"> Sinhala</option>
                </select>
              </div>
            </div>

            <div className="settings-row">
              <div className="settings-item">
                <label><FiClock size={16} /> Timezone</label>
                <select 
                  value={settings.timezone} 
                  onChange={(e) => handleChange('timezone', e.target.value)}
                >
                  <option value="Asia/Colombo"> Asia/Colombo</option>
                  <option value="Asia/Kolkata"> Asia/Kolkata</option>
                  <option value="UTC">🌐 UTC</option>
                </select>
              </div>

              <div className="settings-item">
                <label><FiCalendar size={16} /> Date Format</label>
                <select 
                  value={settings.dateFormat} 
                  onChange={(e) => handleChange('dateFormat', e.target.value)}
                >
                  <option value="DD/MM/YYYY">📅 DD/MM/YYYY</option>
                  <option value="MM/DD/YYYY">📅 MM/DD/YYYY</option>
                  <option value="YYYY-MM-DD">📅 YYYY-MM-DD</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 'stock':
        return (
          <div className="settings-tab-content">
            <div className="settings-item">
              <label><FiAlertTriangle size={16} /> Low Stock Threshold</label>
              <div className="settings-range">
                <input 
                  type="range" 
                  min="1" 
                  max="20" 
                  value={settings.lowStockThreshold}
                  onChange={(e) => handleChange('lowStockThreshold', parseInt(e.target.value))}
                />
                <span className="range-value">{settings.lowStockThreshold} units</span>
              </div>
            </div>
            <div className="settings-item">
              <label><FiAlertTriangle size={16} /> Critical Stock Threshold</label>
              <div className="settings-range">
                <input 
                  type="range" 
                  min="0" 
                  max="5" 
                  value={settings.criticalStockThreshold}
                  onChange={(e) => handleChange('criticalStockThreshold', parseInt(e.target.value))}
                />
                <span className="range-value">{settings.criticalStockThreshold} units</span>
              </div>
            </div>
            <div className="settings-item">
              <label><FiCalendar size={16} /> Expiry Alert Days</label>
              <div className="settings-range">
                <input 
                  type="range" 
                  min="7" 
                  max="90" 
                  step="7"
                  value={settings.expiryAlertDays}
                  onChange={(e) => handleChange('expiryAlertDays', parseInt(e.target.value))}
                />
                <span className="range-value">{settings.expiryAlertDays} days</span>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="settings-tab-content">
            <div className="settings-item toggle-item">
              <div>
                <label><FiMail size={16} /> Email Notifications</label>
                <span className="setting-desc">Receive notifications via email</span>
              </div>
              <button 
                className={`toggle-switch ${settings.emailNotifications ? 'active' : ''}`}
                onClick={() => handleChange('emailNotifications', !settings.emailNotifications)}
              >
                <span className="toggle-slider"></span>
              </button>
            </div>
            <div className="settings-item toggle-item">
              <div>
                <label><FiBell size={16} /> Low Stock Alerts</label>
                <span className="setting-desc">Get notified when stock is low</span>
              </div>
              <button 
                className={`toggle-switch ${settings.lowStockAlerts ? 'active' : ''}`}
                onClick={() => handleChange('lowStockAlerts', !settings.lowStockAlerts)}
              >
                <span className="toggle-slider"></span>
              </button>
            </div>
            <div className="settings-item toggle-item">
              <div>
                <label><FiCalendar size={16} /> Expiry Alerts</label>
                <span className="setting-desc">Get notified about expiring medicines</span>
              </div>
              <button 
                className={`toggle-switch ${settings.expiryAlerts ? 'active' : ''}`}
                onClick={() => handleChange('expiryAlerts', !settings.expiryAlerts)}
              >
                <span className="toggle-slider"></span>
              </button>
            </div>
            <div className="settings-item toggle-item">
              <div>
                <label><FiShoppingCart size={16} /> Sales Alerts</label>
                <span className="setting-desc">Get notified about daily sales</span>
              </div>
              <button 
                className={`toggle-switch ${settings.salesAlerts ? 'active' : ''}`}
                onClick={() => handleChange('salesAlerts', !settings.salesAlerts)}
              >
                <span className="toggle-slider"></span>
              </button>
            </div>
            <div className="settings-item toggle-item">
              <div>
                <label><FiInfo size={16} /> System Alerts</label>
                <span className="setting-desc">Get notified about system updates</span>
              </div>
              <button 
                className={`toggle-switch ${settings.systemAlerts ? 'active' : ''}`}
                onClick={() => handleChange('systemAlerts', !settings.systemAlerts)}
              >
                <span className="toggle-slider"></span>
              </button>
            </div>
          </div>
        );

      case 'appearance':
        return (
          <div className="settings-tab-content">
            <div className="settings-item toggle-item">
              <div>
                <label><FiMoon size={16} /> Dark Mode</label>
                <span className="setting-desc">Switch to dark theme</span>
              </div>
              <button 
                className={`toggle-switch ${settings.darkMode ? 'active' : ''}`}
                onClick={() => {
                  handleChange('darkMode', !settings.darkMode);
                  if (!settings.darkMode) {
                    document.body.classList.add('dark-mode');
                    document.body.classList.remove('light-mode');
                  } else {
                    document.body.classList.add('light-mode');
                    document.body.classList.remove('dark-mode');
                  }
                }}
              >
                <span className="toggle-slider"></span>
              </button>
            </div>
            <div className="settings-item toggle-item">
              <div>
                <label><FiMonitor size={16} /> Compact View</label>
                <span className="setting-desc">Show more items per page</span>
              </div>
              <button 
                className={`toggle-switch ${settings.compactView ? 'active' : ''}`}
                onClick={() => handleChange('compactView', !settings.compactView)}
              >
                <span className="toggle-slider"></span>
              </button>
            </div>
            <div className="settings-item toggle-item">
              <div>
                <label><FiRefreshCcw size={16} /> Show Animations</label>
                <span className="setting-desc">Enable smooth animations</span>
              </div>
              <button 
                className={`toggle-switch ${settings.showAnimations ? 'active' : ''}`}
                onClick={() => handleChange('showAnimations', !settings.showAnimations)}
              >
                <span className="toggle-slider"></span>
              </button>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="settings-tab-content">
            <div className="settings-item toggle-item">
              <div>
                <label><FiShield size={16} /> Two-Factor Authentication</label>
                <span className="setting-desc">Add extra security layer</span>
              </div>
              <button 
                className={`toggle-switch ${settings.twoFactorAuth ? 'active' : ''}`}
                onClick={() => handleChange('twoFactorAuth', !settings.twoFactorAuth)}
              >
                <span className="toggle-slider"></span>
              </button>
            </div>
            <div className="settings-item">
              <label><FiLock size={16} /> Session Timeout (minutes)</label>
              <div className="settings-range">
                <input 
                  type="range" 
                  min="5" 
                  max="120" 
                  step="5"
                  value={settings.sessionTimeout}
                  onChange={(e) => handleChange('sessionTimeout', parseInt(e.target.value))}
                />
                <span className="range-value">{settings.sessionTimeout} minutes</span>
              </div>
            </div>
          </div>
        );

      case 'system':
        return (
          <div className="settings-tab-content">
            <div className="settings-item toggle-item">
              <div>
                <label><FiRefreshCcw size={16} /> Auto Refresh</label>
                <span className="setting-desc">Auto update inventory data</span>
              </div>
              <button 
                className={`toggle-switch ${settings.autoRefresh ? 'active' : ''}`}
                onClick={() => handleChange('autoRefresh', !settings.autoRefresh)}
              >
                <span className="toggle-slider"></span>
              </button>
            </div>
            <div className="settings-item">
              <label><FiClock size={16} /> Refresh Interval (seconds)</label>
              <div className="settings-range">
                <input 
                  type="range" 
                  min="30" 
                  max="300" 
                  step="30"
                  value={settings.refreshInterval}
                  onChange={(e) => handleChange('refreshInterval', parseInt(e.target.value))}
                />
                <span className="range-value">{settings.refreshInterval} seconds</span>
              </div>
            </div>
            <div className="settings-item toggle-item">
              <div>
                <label><FiHardDrive size={16} /> Auto Backup</label>
                <span className="setting-desc">Automatically backup data</span>
              </div>
              <button 
                className={`toggle-switch ${settings.autoBackup ? 'active' : ''}`}
                onClick={() => handleChange('autoBackup', !settings.autoBackup)}
              >
                <span className="toggle-slider"></span>
              </button>
            </div>
            {settings.autoBackup && (
              <div className="settings-item">
                <label>Backup Frequency</label>
                <select 
                  value={settings.backupFrequency} 
                  onChange={(e) => handleChange('backupFrequency', e.target.value)}
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            )}
            <div className="settings-divider"></div>
            <div className="settings-info-group">
              <h4><FiDatabase size={16} /> System Information</h4>
              <div className="settings-info-item">
                <span className="info-label"><FiPackage size={14} /> Total Medicines</span>
                <span className="info-value">{medicines?.length || 0}</span>
              </div>
              <div className="settings-info-item">
                <span className="info-label"><FiDatabase size={14} /> Database</span>
                <span className="info-value">Supabase (PostgreSQL)</span>
              </div>
              <div className="settings-info-item">
                <span className="info-label"><FiCpu size={14} /> Frontend</span>
                <span className="info-value">React.js v18</span>
              </div>
              <div className="settings-info-item">
                <span className="info-label"><FiCheckCircle size={14} /> Status</span>
                <span className="info-value status-online">🟢 Online</span>
              </div>
            </div>
          </div>
        );

      case 'sales':
        return (
          <div className="settings-tab-content">
            <div className="settings-item">
              <label><FiDollarSign size={16} /> Default Tax Rate (%)</label>
              <div className="settings-range">
                <input 
                  type="range" 
                  min="0" 
                  max="20" 
                  value={settings.defaultTaxRate}
                  onChange={(e) => handleChange('defaultTaxRate', parseInt(e.target.value))}
                />
                <span className="range-value">{settings.defaultTaxRate}%</span>
              </div>
            </div>
            <div className="settings-item toggle-item">
              <div>
                <label><FiShoppingCart size={16} /> Enable Discounts</label>
                <span className="setting-desc">Allow discounts on sales</span>
              </div>
              <button 
                className={`toggle-switch ${settings.enableDiscounts ? 'active' : ''}`}
                onClick={() => handleChange('enableDiscounts', !settings.enableDiscounts)}
              >
                <span className="toggle-slider"></span>
              </button>
            </div>
            <div className="settings-item toggle-item">
              <div>
                <label><FiUser size={16} /> Show Customer Info</label>
                <span className="setting-desc">Display customer details in sales</span>
              </div>
              <button 
                className={`toggle-switch ${settings.showCustomerInfo ? 'active' : ''}`}
                onClick={() => handleChange('showCustomerInfo', !settings.showCustomerInfo)}
              >
                <span className="toggle-slider"></span>
              </button>
            </div>
          </div>
        );

      case 'printing':
        return (
          <div className="settings-tab-content">
            <div className="settings-item toggle-item">
              <div>
                <label><FiPrinter size={16} /> Print Receipts</label>
                <span className="setting-desc">Auto print after each sale</span>
              </div>
              <button 
                className={`toggle-switch ${settings.printReceipts ? 'active' : ''}`}
                onClick={() => handleChange('printReceipts', !settings.printReceipts)}
              >
                <span className="toggle-slider"></span>
              </button>
            </div>
            <div className="settings-item">
              <label><FiPrinter size={16} /> Receipt Footer</label>
              <textarea 
                rows="3"
                value={settings.receiptFooter}
                onChange={(e) => handleChange('receiptFooter', e.target.value)}
                placeholder="Enter receipt footer message..."
                className="receipt-textarea"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="settings-page">
      <div className="page-header">
        <div className="page-header-left">
          <h2><FiSettings size={22} /> Settings</h2>
          <span className="settings-version">v2.0.0</span>
        </div>
        <button className="back-btn" onClick={() => window.history.back()}>
          <FiArrowLeft size={16} /> Back
        </button>
      </div>

      <div className="settings-container">
        <div className="settings-sidebar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                className={`settings-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon size={18} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="settings-main">
          <div className="settings-card">
            <div className="settings-card-header">
              <h3>{tabs.find(t => t.id === activeTab)?.label} Settings</h3>
              <span className="settings-card-subtitle">
                Configure your {tabs.find(t => t.id === activeTab)?.label?.toLowerCase()} preferences
              </span>
            </div>
            {renderTabContent()}
          </div>

          <div className="settings-actions-row">
            <button className="save-btn" onClick={saveSettings}>
              <FiSave size={16} /> Save All Settings
            </button>
            <button className="reset-btn" onClick={handleReset}>
              <FiRefreshCcw size={16} /> Reset to Default
            </button>
          </div>

          {showConfirm && (
            <div className="save-confirm">
              <FiCheckCircle size={18} /> All settings saved successfully!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;