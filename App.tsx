import { useEffect, useState } from 'react'
import { Task } from './components/Task/Task'

type TaskType = {
  name: string
  done: boolean
}

function App() {
  const [valueTask, setValueTask] = useState('')
  const [tasks, setTasks] = useState<TaskType[]>(JSON.parse(window.localStorage.getItem('tasks') || '[]'))
  const [filter, setFilter] = useState('all')

  const changeDone = (id: number) => {
    const newTasks = tasks.map((task, index) => {
      if (id === index) {
        task.done = !task.done
      }
      return task
    })

    setTasks(newTasks)

    window.localStorage.setItem('tasks', JSON.stringify(newTasks))
  }

  const enterHandler = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && valueTask !== '') {
      const name = valueTask
      setTasks(prev => {
        window.localStorage.setItem('tasks', JSON.stringify([...prev, {name, done: false}]))
        return [...prev, {name, done: false}]
      })
      setValueTask('')
    }
  }

  const clearCompleted = () => {
    setTasks(prev => {
      const newTasks = prev.filter(({done}) => !done)
      window.localStorage.setItem('tasks', JSON.stringify(newTasks))
      return newTasks
    })
  }

  useEffect(() => {
    window.addEventListener('keydown', enterHandler)

    return () => window.removeEventListener('keydown', enterHandler)
  }, [valueTask])

  return (
    <div className='main'>
      <h1 className='main__title'>todos</h1>
      <div className='tasks'>
        <input className='input-task' placeholder='What needs to be done?' value={valueTask} onChange={(e) => setValueTask(e.target.value)} />
        {tasks.map(({name, done}, index) => {
          if (filter === 'all' || filter === 'active' && !done) {
            return <Task index={index} isDone={done} changeDone={changeDone} key={index}>{name}</Task>
          } else if (filter === 'all' || filter === 'completed' && done) {
            return <Task index={index} isDone={done} changeDone={changeDone} key={index}>{name}</Task>
          }
        })}
        <div className='options'>
          <div>{tasks.filter(({done}) => !done).length} items left</div>
          <div className='options__filter'>
            <button
              className={`options__button ${filter === 'all' ? 'options__button--active' : ''}`}
              onClick={() => setFilter('all')}
            >All</button>
            <button
              className={`options__button ${filter === 'active' ? 'options__button--active' : ''}`}
              onClick={() => setFilter('active')}
            >Active</button>
            <button
              className={`options__button ${filter === 'completed' ? 'options__button--active' : ''}`}
              onClick={() => setFilter('completed')}
            >Completed</button>
          </div>
          <button className='options__button' onClick={clearCompleted}>Clear completed</button>
        </div>
      </div>
      <p>
        Enter - Ввод задачи
      </p>
    </div>
  )
}

export default App
