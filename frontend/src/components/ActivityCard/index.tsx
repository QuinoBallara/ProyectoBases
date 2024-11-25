import React, { useState, useMemo } from 'react'
import { activityType } from '../../consts/activity'
import Button from '../../components/Button'
import "./styles.scss"
import { useModal } from '../../contexts/modalContext'
import { deleteActivity, getActivities } from '../../api/activity'
import { useClasses } from '../../contexts/classesContext'

export const ActivityCard = (props: activityType) => {

    const { setActivityModalData, setIsActivityModalUp, setActivityEditMode } = useModal();
    const { setActivities } = useClasses();

    const handleDelete = async () => {
        await deleteActivity(props.id.toString());
        setActivities(await getActivities());
    }

    const handleEdit = () => {
        setActivityEditMode(true);
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
                <Button className='delete-button' onClick={handleDelete} label='Delete' />
            </div>

        </div>
    )
}
