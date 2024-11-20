import React, { useEffect } from 'react'
import { ActivityCardsContainer } from '../../components/ActivityCardsContainer'
import { useModal } from '../../contexts/modalContext'
import ActivitiesModal from '../ActivitiesModal';
import Button from '../../components/Button';
import { useClasses } from '../../contexts/classesContext';
import { getActivities } from '../../api/activity';

export const Activities = () => {
    const { isActivityModalUp, setIsActivityModalUp, setActivityEditMode } = useModal();
    const { activities, setActivities } = useClasses();

    useEffect(() => {
        const fetchActivities = async () => {
            if (!isActivityModalUp) {
                setActivities(await getActivities());
            }
        }
        fetchActivities();
    }, [isActivityModalUp]);

    return (
        <div className='activities' style={{ width: '100%' }}>
            <Button
                className="add-class-button"
                label="Add Activity"
                onClick={() => {
                    setActivityEditMode(false);
                    setIsActivityModalUp(true)
                }}
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
