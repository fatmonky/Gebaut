import { useState, useEffect } from 'react';
import { Task, Priority, ImpactPriority, UrgencyPriority } from '../types';
import { colors, typography, spacing, layout } from '../styles/styles';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  initialTask?: Task;
}

export const TaskModal = ({ isOpen, onClose, onSubmit, initialTask }: TaskModalProps) => {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [impactPriority, setImpactPriority] = useState<ImpactPriority>('medium');
  const [dueDate, setDueDate] = useState<string>('');
  const [delegatedTo, setDelegatedTo] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (initialTask) {
        setText(initialTask.text);
        setPriority(initialTask.priority);
        setImpactPriority(initialTask.impactPriority);
        setDueDate(initialTask.dueDate ? new Date(initialTask.dueDate).toISOString().split('T')[0] : '');
        setDelegatedTo(initialTask.delegatedTo || '');
      } else {
        // Reset state for new task
        setText('');
        setPriority('medium');
        setImpactPriority('medium');
        setDueDate('');
        setDelegatedTo('');
      }
    }
  }, [isOpen, initialTask]);

  const calculateUrgencyPriority = (date: string): UrgencyPriority => {
    if (!date) return 'medium_urgent';
    const dueDate = new Date(date);
    const today = new Date();
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 3) return 'very_urgent';
    if (diffDays <= 7) return 'medium_urgent';
    return 'not_urgent';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit({
        text: text.trim(),
        priority,
        impactPriority,
        urgencyPriority: calculateUrgencyPriority(dueDate),
        dueDate: dueDate ? new Date(dueDate) : undefined,
        delegatedTo: delegatedTo.trim() || undefined,
        completed: initialTask?.completed || false,
      });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    }}>
      <div style={{
        backgroundColor: colors.neutral.black,
        padding: spacing.get(4),
        borderRadius: layout.borderRadius,
        width: '90%',
        maxWidth: '500px',
      }}>
        <h2 style={{
          color: colors.neutral.white,
          marginBottom: spacing.get(3),
          textAlign: 'left',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
        }}>
          {initialTask ? 'Edit Task' : 'Add New Task'}
        </h2>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: spacing.get(3) }}>
          <div>
            <label style={{ 
              color: colors.neutral.white, 
              display: 'block', 
              marginBottom: spacing.get(1),
              textAlign: 'left',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontSize: typography.fontSize.small,
            }}>
              Task Description
            </label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{
                width: '100%',
                padding: spacing.get(2),
                backgroundColor: '#2A2A2A',
                border: 'none',
                borderRadius: layout.borderRadius,
                color: colors.neutral.white,
                textAlign: 'left',
              }}
              required
            />
          </div>

          <div>
            <label style={{ 
              color: colors.neutral.white, 
              display: 'block', 
              marginBottom: spacing.get(1),
              textAlign: 'left',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontSize: typography.fontSize.small,
            }}>
              Due Date (Optional)
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              style={{
                width: '100%',
                padding: spacing.get(2),
                backgroundColor: '#2A2A2A',
                border: 'none',
                borderRadius: layout.borderRadius,
                color: colors.neutral.white,
                textAlign: 'left',
              }}
            />
          </div>

          <div>
            <label style={{ 
              color: colors.neutral.white, 
              display: 'block', 
              marginBottom: spacing.get(1),
              textAlign: 'left',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontSize: typography.fontSize.small,
            }}>
              Impact Priority
            </label>
            <select
              value={impactPriority}
              onChange={(e) => setImpactPriority(e.target.value as ImpactPriority)}
              style={{
                width: '100%',
                padding: spacing.get(2),
                backgroundColor: '#2A2A2A',
                border: 'none',
                borderRadius: layout.borderRadius,
                color: colors.neutral.white,
                textAlign: 'left',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              <option value="high">High Impact</option>
              <option value="medium">Medium Impact</option>
              <option value="low">Low Impact</option>
            </select>
          </div>

          <div>
            <label style={{ 
              color: colors.neutral.white, 
              display: 'block', 
              marginBottom: spacing.get(1),
              textAlign: 'left',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontSize: typography.fontSize.small,
            }}>
              Delegate To (Optional)
            </label>
            <input
              type="text"
              value={delegatedTo}
              onChange={(e) => setDelegatedTo(e.target.value)}
              placeholder="@person's name"
              style={{
                width: '100%',
                padding: spacing.get(2),
                backgroundColor: '#2A2A2A',
                border: 'none',
                borderRadius: layout.borderRadius,
                color: colors.neutral.white,
                textAlign: 'left',
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: spacing.get(2), justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: `${spacing.get(2)} ${spacing.get(3)}`,
                backgroundColor: 'transparent',
                border: `1px solid ${colors.neutral.white}`,
                borderRadius: layout.borderRadius,
                color: colors.neutral.white,
                cursor: 'pointer',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                padding: `${spacing.get(2)} ${spacing.get(3)}`,
                backgroundColor: colors.neutral.white,
                border: 'none',
                borderRadius: layout.borderRadius,
                color: colors.neutral.black,
                cursor: 'pointer',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              {initialTask ? 'Update' : 'Add'} Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}; 