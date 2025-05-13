import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Task, TaskState } from '../types';
import { colors, typography, spacing, layout } from '../styles/styles';
import { TaskModal } from './TaskModal';

interface TaskListProps {
  taskState: TaskState;
}

export const TaskList = ({ taskState }: TaskListProps) => {
  const { tasks, toggleTask, deleteTask, updateTask, reorderTasks } = taskState;
  const [editingTask, setEditingTask] = useState<Task | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    reorderTasks(result.source.index, result.destination.index);
  };

  const getImpactSymbol = (impact: Task['impactPriority']) => {
    switch (impact) {
      case 'high':
        return '▲';
      case 'medium':
        return '■';
      case 'low':
        return '●';
    }
  };

  const getImpactColor = (impact: Task['impactPriority']) => {
    switch (impact) {
      case 'high':
        return colors.primary.yellow;
      case 'medium':
        return colors.primary.red;
      case 'low':
        return colors.primary.blue;
    }
  };

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: spacing.get(2),
              }}
            >
              {tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...provided.draggableProps.style,
                        display: 'flex',
                        alignItems: 'center',
                        padding: spacing.get(3),
                        backgroundColor: colors.neutral.white,
                        border: `2px solid ${colors.neutral.black}`,
                        borderRadius: 0,
                        gap: spacing.get(3),
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTask(task.id)}
                        style={{
                          width: '20px',
                          height: '20px',
                          cursor: 'pointer',
                          accentColor: colors.neutral.black,
                        }}
                      />

                      <span
                        style={{
                          color: getImpactColor(task.impactPriority),
                          fontSize: typography.fontSize.heading,
                          width: '24px',
                          textAlign: 'center',
                        }}
                      >
                        {getImpactSymbol(task.impactPriority)}
                      </span>

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

                      <div style={{ display: 'flex', gap: spacing.get(2) }}>
                        <button
                          onClick={() => {
                            setEditingTask(task);
                            setIsModalOpen(true);
                          }}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: colors.neutral.gray,
                            cursor: 'pointer',
                            fontSize: typography.fontSize.body,
                            opacity: 0.7,
                            padding: spacing.get(1),
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                          }}
                        >
                          Edit
                        </button>
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
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(undefined);
        }}
        onSubmit={(task) => {
          if (editingTask) {
            updateTask(editingTask.id, task);
          } else {
            taskState.addTask(task);
          }
        }}
        initialTask={editingTask}
      />
    </>
  );
}; 