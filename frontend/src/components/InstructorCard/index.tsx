import React from 'react'

import { instructor } from '../../consts/instructor'

import './styles.scss'
import Button from '../Button'
import { useModal } from '../../contexts/modalContext'
import { deleteInstructor } from '../../api/instructor'
import { useClasses } from '../../contexts/classesContext'
import { getInstructors } from '../../api/instructor'

export const InstructorCard = (props: instructor) => {

  const { setIsInstructorModalUp, setInstructorModalData, setInstructorEditMode } = useModal();
  const { setInstructors } = useClasses();

  const handleEdit = (): void => {
    setInstructorEditMode(true);
    setInstructorModalData(props);
    setIsInstructorModalUp(true);
  };

  const handleDelete = async () => {
    await deleteInstructor(props.id.toString());
    setInstructors(await getInstructors());
  };


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