import React from 'react'
import { useClasses } from '../../contexts/classesContext'
import './styles.scss'

import { student } from '../../consts/student'
import { StudentCard } from '../StudentCard'

export const StudentCardsContainer = () => {
  const { students } = useClasses(); 

  return (
    <div className='container'>
      {students.map((card: student, index: number) => (  
        <StudentCard key={index} {...card} />
      ))}
    </div>
  )
}
