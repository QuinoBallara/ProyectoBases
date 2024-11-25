import React, { useEffect, useMemo, useState } from 'react'
import { EquipmentProps } from '../../consts/equipment'
import './styles.scss'
import Button from '../Button'
import { useModal } from '../../contexts/modalContext'
import Dropdown from '../DropdownPolenta'
import { deleteEquipment } from '../../api/equipment'
import { useClasses } from '../../contexts/classesContext'
import { getAllEquipment } from '../../api/equipment'

export const EquipmentCard = (props: EquipmentProps) => {
    const { setIsEquipmentModalUp, setEquipmentModalData, setEquipmentEditMode } = useModal();
    const { activities, setEquipments } = useClasses();

    const handleEdit = (): void => {
        setEquipmentEditMode(true);
        setEquipmentModalData(props);
        setIsEquipmentModalUp(true);
    }


    const handleDelete = async () => {
        await deleteEquipment(props.id.toString());
        setEquipments(await getAllEquipment());
    };

    const activity = activities.find((activity) => activity.id === props.activity_id);

    return (
        <div className='card'>
            <div className='cardText'>
                <h2 className='card-title'>{props.description}</h2>
                <p><b>Activity:</b> {props.description}</p>
                <p><b>Cost:</b> {props.cost}</p>
            </div>

            <div className='cardButtonsContainer'>
                <div className='addStudent-box'>
                    <Button label='Edit' onClick={handleEdit} />
                    <Button label='Delete' onClick={handleDelete} />
                </div>
            </div>
        </div>
    )
}
