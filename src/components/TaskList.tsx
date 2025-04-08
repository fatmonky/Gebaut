import { Task, TaskState } from '../types';
import { colors, typography, spacing, layout, priorityShapes } from '../styles/styles';

interface TaskListProps {
  taskState: TaskState;
}

export const TaskList = ({ taskState }: TaskListProps) => {
  const { tasks, toggleTask, deleteTask, updateTaskPriority } = taskState;

  const getPriorityColor = (priority: Task['priority']) => {
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
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: spacing.get(2),
    }}>
      {tasks.map(task => (
        <div
          key={task.id}
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: spacing.get(3),
            backgroundColor: colors.neutral.white,
            borderRadius: layout.borderRadius,
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            gap: spacing.get(3),
          }}
        >
          <button
            onClick={() => toggleTask(task.id)}
            style={{
              color: getPriorityColor(task.priority),
              fontSize: typography.fontSize.heading,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {priorityShapes[task.priority]}
          </button>
          
          <span
            style={{
              flex: 1,
              fontSize: typography.fontSize.body,
              textDecoration: task.completed ? 'line-through' : 'none',
              color: task.completed ? colors.neutral.gray : colors.neutral.black,
            }}
          >
            {task.text}
          </span>

          <button
            onClick={() => deleteTask(task.id)}
            style={{
              background: 'none',
              border: 'none',
              color: colors.neutral.gray,
              cursor: 'pointer',
              fontSize: typography.fontSize.body,
              opacity: 0.7,
              padding: spacing.get(1),
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}; 