import React, { useState } from 'react';
import { 
  FiUser, 
  FiLock, 
  FiLogIn, 
  FiEye, 
  FiEyeOff,
  FiShield,
  FiCheckCircle
} from 'react-icons/fi';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!username || !password) {
      setError('Please enter both username and password');
      setLoading(false);
      return;
    }

    // Demo credentials
    if (username === 'pharmacist' && password === 'password123') {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', username);
      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true');
      }
      setTimeout(() => {
        setLoading(false);
        if (onLogin) onLogin();
      }, 600);
    } else {
      setError('Invalid username or password');
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        {/* Header */}
        <div className="login-header">
          <div className="login-logo-wrapper">
            <div className="login-logo-icon">💊</div>
          </div>
          <h1>MediCare</h1>
          <p>Pharmacy Inventory System</p>
          <div className="login-divider"></div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="login-form">
          {error && (
            <div className="login-error">
              <FiShield size={16} />
              <span>{error}</span>
            </div>
          )}

          <div className="login-input-group">
            <div className="login-input-icon">
              <FiUser size={18} />
            </div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="login-input"
              disabled={loading}
            />
          </div>

          <div className="login-input-group">
            <div className="login-input-icon">
              <FiLock size={18} />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              disabled={loading}
            />
            <button
              type="button"
              className="login-password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
          </div>

          <div className="login-options">
            <label className="login-remember">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Remember me</span>
            </label>
            <a href="#" className="login-forgot">Forgot password?</a>
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? (
              <span className="login-spinner"></span>
            ) : (
              <>
                <FiLogIn size={18} /> Sign In
              </>
            )}
          </button>

          <div className="login-footer">
            <span className="login-demo-label">🔑 Demo Credentials</span>
            <div className="login-demo-box">
              <span className="login-demo-user">
                <FiUser size={12} /> pharmacist
              </span>
              <span className="login-demo-pass">
                <FiLock size={12} /> password123
              </span>
            </div>
          </div>
        </form>
      </div>

      {/* Footer */}
      <div className="login-bottom">
        <span>© 2026 MediCare. All rights reserved.</span>
      </div>
    </div>
  );
};

export default Login;