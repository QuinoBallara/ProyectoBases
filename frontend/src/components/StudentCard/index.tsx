import React from 'react'

import {student} from '../../consts/student'

import './styles.scss'
import Button from '../Button'
import { useModal } from '../../contexts/modalContext'

export const StudentCard = (props: student) => {

  const {setStudentModalData, setIsStudentModalUp} = useModal();

  const handleEdit = (): void => {setStudentModalData(props); setIsStudentModalUp(true);};

  const handleDelete = (): void => {};




  return (
    <div className='card'>

        <div className='cardText'>
          <h2 className='card-title'>{props.first_name} {props.last_name} </h2>
          <p><b>id:</b> {props.id}</p>
          <p><b>Birthday:</b> {props.birth_day}</p>
          <p><b>Email:</b> {props.mail}</p>
          <p><b>Phone:</b> {props.phone}</p>
        </div>


    <div className='cardButtonsContainer'>
      <Button
        className='edit-button'
        label="Edit"
        onClick={(e) => handleEdit()}
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