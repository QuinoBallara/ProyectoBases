import React, { useState } from 'react'
import { EquipmentCardContainer } from '../../components/EquipmentCardContainer'
import Button from '../../components/Button'
import ClassModal from '../ClassModal'
import { useModal } from '../../contexts/modalContext'
import { EquipmentModal } from '../EquipmentModal'

export const Equipment = () => {
    const { setIsEquipmentModalUp } = useModal();


    return (
        <div style={{ width: '100%' }}>
            <Button label='Add Equipment' onClick={() => setIsEquipmentModalUp(true)} />
            <EquipmentCardContainer />
            <EquipmentModal />
        </div>
    )
}
