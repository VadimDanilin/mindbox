import { useState } from 'react'
import { Task } from './components/Task/Task'
import { Input } from './components/Input/Input'

type TaskType = {
  name: string
  done: boolean
}

function App() {
  const [tasks, setTasks] = useState<TaskType[]>(JSON.parse(window.localStorage.getItem('tasks') || '[]'))
  const [filter, setFilter] = useState('all')

  const changeDone = (id: number) => {
    const newTasks = tasks.map((task, index) => {
      id === index && (task.done = !task.done)
      return task
    })

    setTasks(newTasks)
    window.localStorage.setItem('tasks', JSON.stringify(newTasks))
  }

  const clearCompleted = () => {
    setTasks(prev => {
      const newTasks = prev.filter(({done}) => !done)
      window.localStorage.setItem('tasks', JSON.stringify(newTasks))
      return newTasks
    })
  }

  return (
    <div className='main'>
      <h1 className='main__title'>todos</h1>
      <div className='tasks'>
        <Input setTasks={setTasks} />
        {tasks.map(({name, done}, index) => {
          if (filter === 'all' || filter === 'active' && !done) {
            return <Task index={index} isDone={done} changeDone={changeDone} key={index}>{name}</Task>
          } else if (filter === 'all' || filter === 'completed' && done) {
            return <Task index={index} isDone={done} changeDone={changeDone} key={index}>{name}</Task>
          }
        })}
        <div className='options'>
          <div>{tasks.filter(({done}) => {
            if (filter === 'all') {
              return 1
            } else if (filter === 'active' && !done) {
              return 1
            } else if (filter === 'completed' && done) {
              return 1
            }
          }).length} items left</div>
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
