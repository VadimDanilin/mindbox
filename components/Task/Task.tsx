import { FC, HTMLAttributes } from 'react'
import './Task.css'

interface TaskProps extends HTMLAttributes<HTMLElement> {
  index: number
  isDone?: boolean
  changeDone: (id: number) => void
}

export const Task: FC<TaskProps> = ({children, index, isDone, changeDone}) => {
  return <label className='task'>
    <input className='task__chechbox' type='checkbox' checked={isDone} onChange={() => changeDone(index)} />
    <div className='task__new-checkbox'>
      <span className='task__name'>{children}</span>
    </div>
  </label>
}