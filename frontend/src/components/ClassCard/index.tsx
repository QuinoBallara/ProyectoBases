import React, { useEffect, useState } from 'react'

import { ClassProps } from '../../consts/classProps'

import './styles.scss'
import Button from '../Button'
import Dropdown from '../DropdownPolenta'

export const ClassCard = (props: ClassProps) => {

  const [selectedStudent, setSelectedStudent] = useState<string>('None');
  const [students, setStudents] = useState<string[]>([]);

  const addStudent = (): void => { };

  const handleEdit = (): void => { };

  const handleDelete = (): void => { };


  return (
    <div className='card'>

      <div className='cardText'>
        <h2 className='card-title'>{props.activity}</h2>
        <p><b>Instructor:</b> {props.instructor}</p>
        <p><b>Shift:</b> {props.shift}</p>
        <p><b>Quotas:</b> {props.studentQuotas}</p>
      </div>


      <div className='cardButtonsContainer'>
        <div className='addStudent-box'>
          <Dropdown label='Student' value={selectedStudent} onChange={(value) => setSelectedStudent} name='Add Student' options={[
            { value: "", label: '' },

          ]} />
          <Button label='Add' onClick={() => addStudent()} />
        </div>
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