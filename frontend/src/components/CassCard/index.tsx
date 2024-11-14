import React, { useState } from 'react'

// add view in sql
type ClassProps = {
  dictated: boolean,
  instructor: string,
  shift: string,
  activity: string,
  studentQuotas: number
}

export const ClassCard = () => {
  const [classes, setClasses] = useState<ClassProps[]>([
    {
      dictated: true,
      instructor: 'Instructor 1',
      shift: 'Morning',
      activity: 'Yoga',
      studentQuotas: 10
    },
    {
      dictated: false,
      instructor: 'Instructor 2',
      shift: 'Afternoon',
      activity: 'Pilates',
      studentQuotas: 15
    },
  ])

  //apiCall

  return (
    <div className='container'>
      {classes.map((clard, index) => (
        <div key={index} className='card'>
          <h2 className='card-title'>{clard.activity}</h2>
          <p>{clard.instructor}</p>
          <p>{clard.shift}</p>
          <p>{clard.studentQuotas}</p>
        </div>))}
    </div>
  )
}
