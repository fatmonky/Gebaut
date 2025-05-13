import { useState } from 'react'
import { Task, TaskState } from './types'
import { TaskList } from './components/TaskList'
import { TaskModal } from './components/TaskModal'
import { colors, typography, spacing, layout } from './styles/styles'
import './App.css'

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [sortOrder, setSortOrder] = useState<'default' | 'impact'>('default')

  const taskState: TaskState = {
    tasks: sortOrder === 'impact'
      ? [...tasks].sort((a, b) => {
          const impactOrder = { high: 0, medium: 1, low: 2 };
          return impactOrder[a.impactPriority] - impactOrder[b.impactPriority];
        })
      : tasks,
    addTask: (task) => {
      const newTask: Task = {
        ...task,
        id: Date.now().toString(),
        createdAt: new Date(),
      }
      setTasks([...tasks, newTask])
    },
    toggleTask: (id) => {
      setTasks(tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      ))
    },
    deleteTask: (id) => {
      setTasks(tasks.filter(task => task.id !== id))
    },
    updateTask: (id, updatedTask) => {
      setTasks(tasks.map(task =>
        task.id === id ? { ...task, ...updatedTask } : task
      ))
    },
    reorderTasks: (startIndex, endIndex) => {
      const result = Array.from(tasks)
      const [removed] = result.splice(startIndex, 1)
      result.splice(endIndex, 0, removed)
      setTasks(result)
    },
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: colors.neutral.white,
      padding: layout.containerPadding,
      fontFamily: typography.fontFamily.primary,
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{
        maxWidth: layout.maxWidth,
        margin: '0 auto',
        width: '100%',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
      }}>
        <header style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: spacing.get(4),
          padding: spacing.get(3),
          borderBottom: `1px solid ${colors.neutral.gray}`,
        }}>
          <h1 style={{
            fontSize: typography.fontSize.heading,
            fontWeight: typography.fontWeight.bold,
            margin: 0,
            letterSpacing: '0.2em',
            color: colors.neutral.black,
          }}>
            GEBAUT
          </h1>
        </header>

        <main style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: spacing.get(4),
          flex: 1,
        }}>
          <TaskList taskState={taskState} />
          <div style={{
            borderLeft: `1px solid ${colors.neutral.gray}`,
            paddingLeft: spacing.get(4),
          }}>
            <h2 style={{
              fontSize: typography.fontSize.heading,
              fontWeight: typography.fontWeight.bold,
              marginBottom: spacing.get(3),
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}>
              Delegated Tasks
            </h2>
            <TaskList taskState={{
              ...taskState,
              tasks: taskState.tasks.filter(task => task.delegatedTo),
            }} />
          </div>
        </main>

        <footer style={{
          marginTop: spacing.get(4),
          padding: spacing.get(3),
          borderTop: `1px solid ${colors.neutral.gray}`,
          display: 'flex',
          justifyContent: 'center',
          gap: spacing.get(2),
        }}>
          <button
            onClick={() => setSortOrder(sortOrder === 'default' ? 'impact' : 'default')}
            style={{
              padding: `${spacing.get(2)} ${spacing.get(3)}`,
              backgroundColor: sortOrder === 'impact' ? colors.primary.yellow : colors.neutral.white,
              border: `2px solid ${colors.neutral.black}`,
              borderRadius: 0,
              color: sortOrder === 'impact' ? colors.neutral.black : colors.neutral.gray,
              cursor: 'pointer',
              fontWeight: typography.fontWeight.bold,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              transition: 'all 0.2s ease',
            }}
          >
            Sort by Impact
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            style={{
              padding: `${spacing.get(2)} ${spacing.get(3)}`,
              backgroundColor: colors.neutral.white,
              border: `2px solid ${colors.neutral.black}`,
              borderRadius: 0,
              color: colors.neutral.black,
              cursor: 'pointer',
              fontWeight: typography.fontWeight.bold,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              transition: 'all 0.2s ease',
            }}
          >
            Add Task
          </button>
        </footer>

        <TaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={(task) => {
            taskState.addTask(task)
            setIsModalOpen(false)
          }}
        />
      </div>
    </div>
  )
}

export default App
