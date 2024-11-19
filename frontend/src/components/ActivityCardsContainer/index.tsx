import React from 'react'
import { useClasses } from '../../contexts/classesContext';
import { activityType } from '../../consts/activity';
import { ActivityCard } from '../ActivityCard';
import "./styles.scss"

export const ActivityCardsContainer = () => {
    const { activities } = useClasses();
    return (
        <div className='container'>
            {activities.map((card: activityType, index: number) => (
                <ActivityCard key={index} {...card} />
            ))}
        </div>
    )
}
