import React from 'react'
import { useClasses } from '../../contexts/classesContext'
import './styles.scss'

import { EquipmentProps } from '../../consts/equipment'
import { EquipmentCard } from '../EquipmentCard'

export const EquipmentCardContainer = () => {
    const { equipments } = useClasses();

    return (
        <div className='container'>
            {equipments.map((card: EquipmentProps, index: number) => (
                <EquipmentCard key={index} {...card} />
            ))}
        </div>
    )
}
