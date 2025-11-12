import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import OperationTree from './OperationTree';
import CreateOperationModal from './CreateOperationModal';
import './DiscussionCard.css';

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

interface DiscussionCardProps {
  discussion: Discussion;
  onOperationCreated: () => void;
}

const DiscussionCard: React.FC<DiscussionCardProps> = ({
  discussion,
  onOperationCreated,
}) => {
  const { isAuthenticated } = useAuth();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedParentId, setSelectedParentId] = useState<string | null>(null);

  const handleReply = (operationId: string | null) => {
    setSelectedParentId(operationId);
    setShowCreateModal(true);
  };

  const handleOperationCreated = () => {
    setShowCreateModal(false);
    setSelectedParentId(null);
    onOperationCreated();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="discussion-card">
      <div className="discussion-header">
        <div className="discussion-author">
          <div className="author-avatar">
            {discussion.author.username.charAt(0).toUpperCase()}
          </div>
          <div className="author-name">{discussion.author.username}</div>
        </div>
        <div className="discussion-meta">
          <div className="discussion-date">{formatDate(discussion.createdAt)}</div>
        </div>
      </div>
      <div className="discussion-content">
        <div className="starting-number">
          Starting Number: <strong>{discussion.startingNumber}</strong>
        </div>
        {discussion.operations.length > 0 && (
          <div className="operations-section">
            <h3>Operations:</h3>
            <OperationTree
              operations={discussion.operations}
              onReply={handleReply}
            />
          </div>
        )}
        {isAuthenticated && (
          <button
            onClick={() => handleReply(null)}
            className="btn btn-primary btn-small"
          >
            Add Operation
          </button>
        )}
      </div>

      {showCreateModal && (
        <CreateOperationModal
          discussionId={discussion.id}
          parentOperationId={selectedParentId}
          startingNumber={discussion.startingNumber}
          onClose={() => {
            setShowCreateModal(false);
            setSelectedParentId(null);
          }}
          onSuccess={handleOperationCreated}
        />
      )}
    </div>
  );
};

export default DiscussionCard;

