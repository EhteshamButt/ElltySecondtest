import React, { useState } from 'react';
import axios from 'axios';
import './Modal.css';

interface CreateDiscussionModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const CreateDiscussionModal: React.FC<CreateDiscussionModalProps> = ({
  onClose,
  onSuccess,
}) => {
  const [startingNumber, setStartingNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const number = parseFloat(startingNumber);
      if (isNaN(number)) {
        setError('Please enter a valid number');
        setLoading(false);
        return;
      }

      await axios.post('/api/discussions', {
        startingNumber: number,
      });

      onSuccess();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create discussion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Start New Discussion</h2>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          <div className="form-group">
            <label htmlFor="startingNumber">Starting Number</label>
            <input
              type="number"
              id="startingNumber"
              value={startingNumber}
              onChange={(e) => setStartingNumber(e.target.value)}
              required
              step="any"
              placeholder="Enter a number"
            />
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
              {loading ? 'Creating...' : 'Create Discussion'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDiscussionModal;

