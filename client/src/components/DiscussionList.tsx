import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import DiscussionCard from './DiscussionCard';
import CreateDiscussionModal from './CreateDiscussionModal';
import './DiscussionList.css';

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

const DiscussionList: React.FC = () => {
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
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

  if (loading) {
    return <div className="loading">Loading discussions...</div>;
  }

  return (
    <div className="discussion-list">
      <div className="discussion-list-header">
        <h1>Number Discussions</h1>
        {isAuthenticated && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="btn btn-primary"
          >
            Start New Discussion
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
    </div>
  );
};

export default DiscussionList;

