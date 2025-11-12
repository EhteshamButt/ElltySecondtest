import React from 'react';
import { useAuth } from '../context/AuthContext';
import './OperationTree.css';

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

interface OperationTreeProps {
  operations: Operation[];
  onReply: (operationId: string | null) => void;
  level?: number;
}

const OperationTree: React.FC<OperationTreeProps> = ({
  operations,
  onReply,
  level = 0,
}) => {
  const { isAuthenticated } = useAuth();

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

  const getOperationSymbol = (type: string) => {
    switch (type) {
      case 'add':
        return '+';
      case 'subtract':
        return '-';
      case 'multiply':
        return '×';
      case 'divide':
        return '÷';
      default:
        return type;
    }
  };

  return (
    <div className={`operation-tree ${level > 0 ? 'nested' : ''}`}>
      {operations.map((operation) => (
        <div key={operation.id} className="operation-item">
          <div className="operation-content">
            <div className="operation-header">
              <div className="operation-author">
                <div className="author-avatar-small">
                  {operation.author.username.charAt(0).toUpperCase()}
                </div>
                <span className="author-name-small">{operation.author.username}</span>
              </div>
              <div className="operation-date">{formatDate(operation.createdAt)}</div>
            </div>
            <div className="operation-formula">
              <span className="operation-expression">
                {operation.leftOperand} {getOperationSymbol(operation.type)} {operation.rightOperand} = <strong>{operation.result}</strong>
              </span>
            </div>
            {isAuthenticated && (
              <button
                onClick={() => onReply(operation.id)}
                className="reply-link"
              >
                Reply
              </button>
            )}
          </div>
          {operation.childOperations.length > 0 && (
            <div className="operation-children">
              <OperationTree
                operations={operation.childOperations}
                onReply={onReply}
                level={level + 1}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default OperationTree;

