import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './Modal.css';
import './Auth.css';

interface AuthModalProps {
  mode: 'login' | 'register';
  onClose: () => void;
  onSwitchMode: (mode: 'login' | 'register') => void;
  onSuccess: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({
  mode,
  onClose,
  onSwitchMode,
  onSuccess,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'login') {
        await login(username, password);
      } else {
        await register(username, password);
      }
      onSuccess();
    } catch (err: any) {
      setError(err.response?.data?.error || `${mode === 'login' ? 'Login' : 'Registration'} failed`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{mode === 'login' ? 'Login' : 'Register'}</h2>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength={3}
              maxLength={50}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>
          <div className="modal-actions">
            <button
              type="button"
              onClick={() => onSwitchMode(mode === 'login' ? 'register' : 'login')}
              className="btn btn-secondary"
            >
              {mode === 'login' ? 'Need to register?' : 'Already have an account?'}
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? (mode === 'login' ? 'Logging in...' : 'Registering...') : (mode === 'login' ? 'Login' : 'Register')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;

