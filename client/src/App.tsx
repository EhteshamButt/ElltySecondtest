import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import DiscussionCard from './components/DiscussionCard';
import CreateDiscussionModal from './components/CreateDiscussionModal';
import AuthModal from './components/AuthModal';
import './App.css';
import './components/DiscussionList.css';

interface Operation {
  id: string;
  type: string;
  leftOperand: number;
  rightOperand: number;
  result: number;
  author: {
    id: string;
    username: string;
  };
  childOperations: Operation[];
  createdAt: string;
}

interface Discussion {
  id: string;
  startingNumber: number;
  author: {
    id: string;
    username: string;
  };
  operations: Operation[];
  createdAt: string;
}

const AppContent: React.FC = () => {
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    fetchDiscussions();
  }, []);

  const fetchDiscussions = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/discussions');
      setDiscussions(response.data);
      setError('');
    } catch (err: any) {
      setError('Failed to load discussions');
      console.error('Error fetching discussions:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDiscussionCreated = () => {
    setShowCreateModal(false);
    fetchDiscussions();
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    fetchDiscussions();
  };

  if (loading) {
    return (
      <div className="App">
        <Navbar onAuthClick={() => setShowAuthModal(true)} />
        <div className="container">
          <div className="loading">Loading discussions...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <Navbar onAuthClick={() => setShowAuthModal(true)} />
      <div className="container">
        <div className="discussion-list">
          <div className="discussion-list-header">
            <h1>Number Discussions</h1>
            {isAuthenticated ? (
              <button
                onClick={() => setShowCreateModal(true)}
                className="btn btn-primary"
              >
                Start New Discussion
              </button>
            ) : (
              <button
                onClick={() => {
                  setAuthMode('register');
                  setShowAuthModal(true);
                }}
                className="btn btn-primary"
              >
                Register to Start Discussion
              </button>
            )}
          </div>

          {error && <div className="error-message">{error}</div>}

          {discussions.length === 0 ? (
            <div className="empty-state">
              <p>No discussions yet. {isAuthenticated && 'Start the first one!'}</p>
            </div>
          ) : (
            <div className="discussions-grid">
              {discussions.map((discussion) => (
                <DiscussionCard
                  key={discussion.id}
                  discussion={discussion}
                  onOperationCreated={fetchDiscussions}
                />
              ))}
            </div>
          )}

          {showCreateModal && (
            <CreateDiscussionModal
              onClose={() => setShowCreateModal(false)}
              onSuccess={handleDiscussionCreated}
            />
          )}

          {showAuthModal && (
            <AuthModal
              mode={authMode}
              onClose={() => setShowAuthModal(false)}
              onSwitchMode={(mode) => setAuthMode(mode)}
              onSuccess={handleAuthSuccess}
            />
          )}
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;

