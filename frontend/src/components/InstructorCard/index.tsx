import React from 'react'

import {instructor} from '../../consts/instructor'

import './styles.scss'
import Button from '../Button'

export const InstructorCard = (props: instructor) => {

  const handleEdit = (): void => {};

  const handleDelete = (): void => {};


  return (
    <div className='card'>

        <div className='cardText'>
          <h2 className='card-title'>{props.last_name}</h2>
          <p>{props.first_name}</p>
          <p><b>id:</b> {props.id}</p>
        </div>


    <div className='cardButtonsContainer'>
      <Button
        className='edit-button'
        label="Edit"
        onClick={() => handleEdit()}
      />
      <Button
        className='delete-button'
        label="Delete"
        onClick={() => handleDelete()}
      />
    </div>
    

    </div>
  ) 
}