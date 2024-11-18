import React from 'react'
import { useClasses } from '../../contexts/classesContext'
import './styles.scss'

import { shift } from '../../consts/shift'
import { ShiftCard } from '../ShiftCard'

export const ShiftCardsContainer = () => {
  const { shifts } = useClasses(); 

  return (
    <div className='container'>
      {shifts.map((card: shift, index: number) => (  
        <ShiftCard key={index} {...card} />
      ))}
    </div>
  )
}
