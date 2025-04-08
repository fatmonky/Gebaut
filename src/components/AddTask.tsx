import { useState } from 'react';
import { TaskState, Priority } from '../types';
import { colors, typography, spacing, layout, priorityShapes } from '../styles/styles';

interface AddTaskProps {
  taskState: TaskState;
}

export const AddTask = ({ taskState }: AddTaskProps) => {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      taskState.addTask(text.trim(), priority);
      setText('');
    }
  };

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case 'high':
        return colors.primary.yellow;
      case 'medium':
        return colors.primary.red;
      case 'low':
        return colors.primary.blue;
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: spacing.get(2),
        backgroundColor: colors.neutral.black,
        padding: spacing.get(2),
        borderRadius: layout.borderRadius,
      }}
    >
      <div style={{ display: 'flex', gap: spacing.get(1) }}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What to do next?"
          style={{
            flex: 1,
            padding: spacing.get(2),
            fontSize: typography.fontSize.body,
            border: 'none',
            borderRadius: layout.borderRadius,
            backgroundColor: '#2A2A2A',
            color: colors.neutral.white,
          }}
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
          style={{
            padding: `${spacing.get(2)} ${spacing.get(3)}`,
            fontSize: typography.fontSize.body,
            border: 'none',
            borderRadius: layout.borderRadius,
            backgroundColor: '#2A2A2A',
            color: colors.neutral.white,
            cursor: 'pointer',
            appearance: 'none',
          }}
        >
          <option value="high" style={{ color: colors.primary.yellow }}>
            {priorityShapes.high} High Priority
          </option>
          <option value="medium" style={{ color: colors.primary.red }}>
            {priorityShapes.medium} Medium Priority
          </option>
          <option value="low" style={{ color: colors.primary.blue }}>
            {priorityShapes.low} Low Priority
          </option>
        </select>
      </div>
      <button
        type="submit"
        style={{
          padding: spacing.get(2),
          fontSize: typography.fontSize.body,
          backgroundColor: colors.neutral.white,
          color: colors.neutral.black,
          border: 'none',
          borderRadius: layout.borderRadius,
          cursor: 'pointer',
          fontWeight: typography.fontWeight.bold,
        }}
      >
        Add Task
      </button>
    </form>
  );
}; 