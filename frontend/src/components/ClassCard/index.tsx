import React from 'react'

import {ClassProps} from '../../consts/classProps'

import './styles.scss'

export const ClassCard = (props: ClassProps) => {
  return (
    <div className='card'>
          <h2 className='card-title'>{props.activity}</h2>
          <p><b>Instructor:</b> {props.instructor}</p>
          <p><b>Shift:</b> {props.shift}</p>
          <p><b>Quotas:</b> {props.studentQuotas}</p>
    </div>
  )
}