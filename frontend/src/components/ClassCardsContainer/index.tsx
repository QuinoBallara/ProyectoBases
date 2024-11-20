import React from 'react'
import { useClasses } from '../../contexts/classesContext'
import './styles.scss'

import { ClassProps } from '../../consts/classProps'
import { ClassCard } from '../ClassCard'

export const ClassCardsContainer = () => {
  const { classes } = useClasses(); 

 
  return (
    <div className='container'>
      {classes.map((card: ClassProps, index: number) => (  
        <ClassCard key={index} {...card} />
      ))}
    </div>
  )
}
