import { FC, HTMLAttributes, KeyboardEvent, useState } from 'react'
import './Input.css'

interface InputProps extends HTMLAttributes<HTMLElement> {
  setTasks: React.Dispatch<React.SetStateAction<Array<{
    name: string
    done: boolean
  }>>>
}

export const Input: FC<InputProps> = ({setTasks}) => {
  const [valueTask, setValueTask] = useState('')

  const enterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && valueTask !== '') {
      const name = valueTask
      setTasks(prev => {
        window.localStorage.setItem('tasks', JSON.stringify([...prev, {name, done: false}]))
        return [...prev, {name, done: false}]
      })
      setValueTask('')
    }
  }

  return <input
    className='input-task'
    placeholder='What needs to be done?'
    value={valueTask}
    onChange={(e) => setValueTask(e.target.value)}
    onKeyDown={enterHandler}
  />
}