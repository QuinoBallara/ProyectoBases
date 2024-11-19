import React, { act, useEffect, useState, useMemo } from 'react'
import { student } from '../../consts/student'
import Dropdown from '../DropdownPolenta'
import './styles.scss'
import Button from '../Button'

export const StudentCard = (props: student) => {
  const [selectedActivity, setSelectedActivity] = useState<string>('None');
  const [activities, setActivities] = useState([
    {
      id: 1, activity: 'Activity 1', instructor: 'Instructor 1', shift: 'Shift 1', studentQuotas: 10,
    },
    {
      id: 2, activity: 'Activity 2', instructor: 'Instructor 2', shift: 'Shift 2', studentQuotas: 10,
    },
    {
      id: 3, activity: 'Activity 3', instructor: 'Instructor 3', shift: 'Shift 3', studentQuotas: 10,
    },
  ]);

  const activitiesOptions = useMemo(() => {
    let list = activities.map(acitivity => ({ value: acitivity.id.toString(), label: `${acitivity.activity}` }))
    list.unshift({ value: "", label: '' });
    return list;
  }, [activities]);

  useEffect(() => {
    //fecthActivities();
  })

  const addActivity = () => {

  }

  const handleEdit = (): void => { };

  const handleDelete = (): void => { };




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
        <div className='addActivity-box'>
          <Dropdown label='Student' value={selectedActivity} onChange={(value) => setSelectedActivity(value.target.value)} name='Add Activity' options={activitiesOptions} />
          <Button label='Add' onClick={() => addActivity()} />
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