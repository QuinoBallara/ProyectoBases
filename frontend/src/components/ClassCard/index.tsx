import React from 'react'

import {ClassProps} from '../../consts/classProps'

import './styles.scss'
import Button from '../Button'
import { useModal } from '../../contexts/modalContext'

export const ClassCard = (props: ClassProps) => {

  const {setIsClassModalUp, setClassModalData, classModalData} = useModal();

  const handleEdit = (): void => {

    setClassModalData(props);
    setIsClassModalUp(true);

  };

  const handleDelete = (): void => {};


  return (
    <div className='card'>

        <div className='cardText'>
          <h2 className='card-title'>{props.activity}</h2>
          <p><b>Instructor:</b> {props.instructor}</p>
          <p><b>Shift:</b> {props.shift}</p>
          <p><b>Quotas:</b> {props.studentQuotas}</p>
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