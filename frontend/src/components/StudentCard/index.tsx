import React, { act, useEffect, useState, useMemo } from 'react'
import { student } from '../../consts/student'
import Dropdown from '../DropdownPolenta'
import './styles.scss'
import Button from '../Button'
import { useModal } from '../../contexts/modalContext'
import { deleteStudent } from '../../api/student'
import { useClasses } from '../../contexts/classesContext'
import { getActivities } from '../../api/activity'
import { getStudents } from '../../api/student'

export const StudentCard = (props: student) => {
  const { setStudentModalData, setIsStudentModalUp, setStudentEditMode } = useModal();
  const { setStudents } = useClasses();



  const addClass = () => {

  }

  const handleDelete = async () => {
    await deleteStudent(props.id.toString());
    setStudents(await getStudents());
  };

  const handleEdit = (): void => {
    setStudentEditMode(true);
    setStudentModalData(props);
    setIsStudentModalUp(true);
  };

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
        {/* <div className='addActivity-box'>
          <Dropdown label='Student' value={selectedActivity} onChange={(value) => setSelectedActivity(value.target.value)} name='Add Activity' options={activitiesOptions} />
          <Button label='Add' onClick={() => addActivity()} />
        </div> */}
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