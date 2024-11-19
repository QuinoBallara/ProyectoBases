import React from 'react'

import {shift} from '../../consts/shift'

import './styles.scss'
import Button from '../Button'
import { useModal } from '../../contexts/modalContext'

export const ShiftCard = (props: shift) => {

  const {setIsShiftModalUp, setShiftModalData} = useModal();

  const handleEdit = (): void => {
    setIsShiftModalUp(true);
    setShiftModalData(props);
  };

  const handleDelete = (): void => {};


  return (
    <div className='card'>

        <div className='cardText'>
          <h2 className='card-title'>{props.name}</h2>
          <p><b>id:</b> {props.id}</p>
          <p><b>Start:</b> {props.start_time}</p>
          <p><b>End:</b> {props.end_time}</p>
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