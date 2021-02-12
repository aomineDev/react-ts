import { FormEvent, useState, useRef } from 'react'

import 'bootswatch/dist/lumen/bootstrap.min.css'

type FormElement = FormEvent<HTMLFormElement>

interface Task {
  name: string
  done: boolean
}

function App (): JSX.Element {
  const [task, setTask] = useState<string>('')
  const [tasks, setTasks] = useState<Task[]>([])

  const taskInput = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: FormElement): void => {
    e.preventDefault()
    if (task.length === 0) return

    addTask(task)
    setTask('')
    taskInput.current?.focus()
  }

  const addTask = (name: string): void => {
    const newTasks: Task[] = [...tasks, { name, done: false }]

    setTasks(newTasks)
  }

  const toggleDoneTask = (taskIndex: number): void => {
    const newTasks: Task[] = [...tasks]

    newTasks[taskIndex].done = !newTasks[taskIndex].done

    setTasks(newTasks)
  }

  const removeTask = (taskIndex: number): void => {
    const newTasks: Task[] = [...tasks]

    newTasks.splice(taskIndex, 1)

    setTasks(newTasks)
  }

  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  onChange={e => setTask(e.target.value)}
                  value={task}
                  className="form-control"
                  ref={taskInput}
                />
                <button className="btn btn-success btn-block mt-2">
                  Submit
                </button>
              </form>
            </div>
          </div>
          {
            tasks.map((task: Task, index: number) => (
              <div key={index} className="card mt-2">
                <div className="card-body">
                  <h2 style={{ textDecoration: task.done ? 'line-through' : 'none' }}>{task.name}</h2>
                  <button className="btn btn-secondary" onClick={() => toggleDoneTask(index)}>
                    {task.done ? '✗' : '✓' }
                  </button>
                  <button className="btn btn-danger" onClick={() => removeTask(index)}>
                    🗑
                  </button>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default App
