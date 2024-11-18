import React from 'react'
import { useClasses } from '../../contexts/classesContext'
import './styles.scss'

import { instructor } from '../../consts/instructor'
import { InstructorCard } from '../InstructorCard'

export const InstructorCardsContainer = () => {
  const { instructors } = useClasses(); 

  return (
    <div className='container'>
      {instructors.map((card: instructor, index: number) => (  
        <InstructorCard key={index} {...card} />
      ))}
    </div>
  )
}
