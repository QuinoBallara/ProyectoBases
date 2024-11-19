import React, { useEffect, useMemo, useState } from 'react'
import { EquipmentProps } from '../../consts/equipment'
import './styles.scss'
import Button from '../Button'
import { useModal } from '../../contexts/modalContext'
import Dropdown from '../DropdownPolenta'

export const EquipmentCard = (props: EquipmentProps) => {
    const { isEquipmentModalUp, setIsEquipmentModalUp, setEquipmentModalData, equipmentModalData } = useModal();

    const handleEdit = (): void => {
        setEquipmentModalData(props);
        setIsEquipmentModalUp(true);
        console.log(isEquipmentModalUp)
    }

    const addStudent = (): void => { };

    const handleDelete = (): void => { };

    return (
        <div className='card'>
            <div className='cardText'>
                <h2 className='card-title'>{props.description}</h2>
                <p><b>Activity:</b> {props.activity}</p>
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
