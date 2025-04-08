import { useState } from 'react'
import { Task, TaskState, Priority } from './types'
import { colors, typography, spacing, layout } from './styles/styles'
import { TaskList } from './components/TaskList'
import { AddTask } from './components/AddTask'
import './App.css'

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [currentDate, setCurrentDate] = useState(new Date())

  const taskState: TaskState = {
    tasks: tasks.sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }),
    addTask: (text: string, priority: Priority) => {
      const newTask: Task = {
        id: Date.now().toString(),
        text,
        priority,
        completed: false,
        createdAt: new Date(),
      }
      setTasks([...tasks, newTask])
    },
    toggleTask: (id: string) => {
      setTasks(tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      ))
    },
    deleteTask: (id: string) => {
      setTasks(tasks.filter(task => task.id !== id))
    },
    updateTaskPriority: (id: string, priority: Priority) => {
      setTasks(tasks.map(task =>
        task.id === id ? { ...task, priority } : task
      ))
    },
  }

  return (
    <div style={{
      maxWidth: layout.maxWidth,
      margin: '0 auto',
      padding: layout.containerPadding,
      fontFamily: typography.fontFamily.primary,
      color: colors.neutral.black,
      minHeight: '100vh',
      backgroundColor: colors.neutral.white,
      display: 'flex',
      flexDirection: 'column',
    }}>
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.get(3),
        padding: spacing.get(3),
        borderBottom: `1px solid ${colors.neutral.gray}`,
      }}>
        <h1 style={{
          fontSize: typography.fontSize.heading,
          fontWeight: typography.fontWeight.bold,
          margin: 0,
          letterSpacing: '0.2em',
        }}>
          G E B A U T   T O D O   {currentDate.toLocaleDateString()}
        </h1>
      </header>
      
      <main style={{
        padding: spacing.get(3),
        flex: 1,
      }}>
        <TaskList taskState={taskState} />
      </main>

      <footer style={{
        padding: spacing.get(3),
        borderTop: `1px solid ${colors.neutral.gray}`,
      }}>
        <AddTask taskState={taskState} />
      </footer>
    </div>
  )
}

export default App
