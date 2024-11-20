import React from 'react'

import { shift } from '../../consts/shift'

import './styles.scss'
import Button from '../Button'
import { useModal } from '../../contexts/modalContext'
import { useClasses } from '../../contexts/classesContext'
import { deleteShift, getShifts } from '../../api/shift'

export const ShiftCard = (props: shift) => {

  const { setIsShiftModalUp, setShiftModalData, setShiftEditMode } = useModal();
  const { setShifts } = useClasses();

  const handleEdit = (): void => {
    setShiftEditMode(true);
    setIsShiftModalUp(true);
    setShiftModalData(props);
  };

  const handleDelete = async () => {
    await deleteShift(props.id.toString());
    console.log('Deleted shift with id: ' + props.id);
    setShifts(await getShifts());
  };


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