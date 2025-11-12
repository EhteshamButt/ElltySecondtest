import React, { useState } from 'react';
import axios from 'axios';
import './Modal.css';

interface CreateOperationModalProps {
  discussionId: string;
  parentOperationId: string | null;
  startingNumber: number;
  onClose: () => void;
  onSuccess: () => void;
}

const CreateOperationModal: React.FC<CreateOperationModalProps> = ({
  discussionId,
  parentOperationId,
  startingNumber,
  onClose,
  onSuccess,
}) => {
  const [type, setType] = useState<'add' | 'subtract' | 'multiply' | 'divide'>('add');
  const [rightOperand, setRightOperand] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const operand = parseFloat(rightOperand);
      if (isNaN(operand)) {
        setError('Please enter a valid number');
        setLoading(false);
        return;
      }

      if (type === 'divide' && operand === 0) {
        setError('Division by zero is not allowed');
        setLoading(false);
        return;
      }

      await axios.post('/api/operations', {
        type,
        rightOperand: operand,
        discussionId: parentOperationId ? undefined : discussionId,
        parentOperationId: parentOperationId || undefined,
      });

      onSuccess();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create operation');
    } finally {
      setLoading(false);
    }
  };

  const getOperationSymbol = (opType: string) => {
    switch (opType) {
      case 'add':
        return '+';
      case 'subtract':
        return '-';
      case 'multiply':
        return '×';
      case 'divide':
        return '÷';
      default:
        return opType;
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add Operation</h2>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          <div className="form-group">
            <label htmlFor="type">Operation Type</label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value as any)}
              required
            >
              <option value="add">Addition (+)</option>
              <option value="subtract">Subtraction (-)</option>
              <option value="multiply">Multiplication (×)</option>
              <option value="divide">Division (÷)</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="rightOperand">Right Operand</label>
            <input
              type="number"
              id="rightOperand"
              value={rightOperand}
              onChange={(e) => setRightOperand(e.target.value)}
              required
              step="any"
              placeholder="Enter a number"
            />
          </div>
          <div className="operation-preview">
            <strong>Preview:</strong> {startingNumber} {getOperationSymbol(type)}{' '}
            {rightOperand || '?'} = ?
          </div>
          <div className="modal-actions">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Creating...' : 'Create Operation'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateOperationModal;

