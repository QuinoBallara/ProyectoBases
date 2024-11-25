import React, { useEffect, useState } from 'react'
import { EquipmentCardContainer } from '../../components/EquipmentCardContainer'
import Button from '../../components/Button'
import ClassModal from '../ClassModal'
import { useModal } from '../../contexts/modalContext'
import { EquipmentModal } from '../EquipmentModal'
import { getAllEquipment } from '../../api/equipment'
import { useClasses } from '../../contexts/classesContext'

export const Equipment = () => {
    const { setIsEquipmentModalUp, setEquipmentEditMode, isEquipmentModalUp } = useModal();
    const { setEquipments } = useClasses();

    useEffect(() => {
        const fetchEquipment = async () => {
            if (!isEquipmentModalUp) {
                setEquipments(await getAllEquipment());
            }
        }
        fetchEquipment();
    }, [isEquipmentModalUp]);


    return (
        <div style={{ width: '100%' }}>
            <Button label='Add Equipment' onClick={() => {
                setEquipmentEditMode(false);
                setIsEquipmentModalUp(true)
            }} />
            <EquipmentCardContainer />
            <EquipmentModal />
        </div>
    )
}
