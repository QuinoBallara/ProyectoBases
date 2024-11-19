import React, { useState, useMemo } from 'react'
import { activityType } from '../../consts/activity'
import Button from '../../components/Button'
import "./styles.scss"
import { useModal } from '../../contexts/modalContext'

export const ActivityCard = (props: activityType) => {

    const { setActivityModalData, setIsActivityModalUp } = useModal();

    const addActivity = () => {
        console.log('Activity added')
    }

    const removeActivity = () => {
        console.log('Activity removed')
    }

    const handleEdit = () => {
        setActivityModalData(props)
        setIsActivityModalUp(true);
    }

    return (
        <div className='card'>
            <div className='cardText'>
                <h2 className='card-title'>{props.description}</h2>
                <p><b>Cost:</b> {props.cost}</p>
                <p><b>Min Age:</b> {props.min_age}</p>
                <p><b>Max Age:</b> {props.max_age}</p>
            </div>
            <div className='cardButtonsContainer'>
                <Button className="edit-button" onClick={handleEdit} label='Edit' />
                <Button className='delete-button' onClick={removeActivity} label='Delete' />
            </div>

        </div>
    )
}