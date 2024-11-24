import React, { useEffect, useMemo, useState } from 'react'

import { ClassProps } from '../../consts/classProps'

import './styles.scss'
import Button from '../Button'
import { useModal } from '../../contexts/modalContext'
import Dropdown from '../DropdownPolenta'
import { useClasses } from '../../contexts/classesContext'
import { addClassStudent } from '../../api/classStudent'

export const ClassCard = (props: ClassProps) => {
  
  const { setIsClassModalUp, setClassModalData, setClassEditMode } = useModal();

  const {students} = useClasses();

  const handleEdit = (): void => {
    setClassEditMode(true);
    setClassModalData(props);
    setIsClassModalUp(true);

  };


  const [selectedStudent, setSelectedStudent] = useState<string>('None');


  const studentsOptions = useMemo(() => {
    let list = students.map(student => ({ value: student.id.toString(), label: `${student.first_name} ${student.last_name}` }))
    list.unshift({ value: "", label: '' });
    return list;
  }, [students]);

  const addStudent = (): void => {
    addClassStudent({ class_id: parseInt(props.class_id), student_id: selectedStudent, equipment_id: null });
   };


  const handleDelete = (): void => { };


  return (
    <div className='card'>

      <div className='cardText'>
        <h2 className='card-title'>{props.activity_description}</h2>
        <p><b>Instructor:</b> {props.instructor_first_name}</p>
        <p><b>Shift:</b> {props.shift_name}</p>
        <p><b>Quotas:</b> {props.student_quotas}</p>
      </div>


      <div className='cardButtonsContainer'>
        <div className='addStudent-box'>
          <Dropdown label='Student' value={selectedStudent} onChange={(value) => setSelectedStudent(value.target.value)} name='Add Student' options={studentsOptions} />
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