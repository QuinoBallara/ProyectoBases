import React from 'react'
import { ActivityCardsContainer } from '../../components/ActivityCardsContainer'
import { useModal } from '../../contexts/modalContext'
import ActivitiesModal from '../ActivitiesModal';
import Button from '../../components/Button';

export const Activities = () => {
    const { isActivityModalUp, setIsActivityModalUp } = useModal();
    return (
        <div className='activities' style={{ width: '100%' }}>
            <Button
                className="add-class-button"
                label="Add Activity"
                onClick={() => setIsActivityModalUp(true)}
            />
            <div className='content'>
                <div className='cards'>
                    <ActivityCardsContainer />
                </div>

                <ActivitiesModal />
            </div>
        </div>
    )
}
