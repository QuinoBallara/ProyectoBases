import React, { useEffect, useState } from 'react';
import { InstructorCardsContainer } from '../../components/InstructorCardsContainer';
import { useModal } from '../../contexts/modalContext';
import Button from '../../components/Button';
import InstructorModal from '../InstructorModal';
import { useClasses } from '../../contexts/classesContext';
import { getInstructors } from '../../api/instructor';

const Instructors: React.FC = () => {
    const { setIsInstructorModalUp, isInstructorModalUp, setInstructorEditMode } = useModal();
    const { instructors, setInstructors } = useClasses();

    useEffect(() => {
        const fetchInstructors = async () => {
            if (!isInstructorModalUp) {
                setInstructors(await getInstructors());
            }
        }
        fetchInstructors();
    }, [isInstructorModalUp]);
    return (
        <div style={{ width: '100%' }}>
            <Button
                label="Add Instructor"
                onClick={() => {
                    setInstructorEditMode(false);
                    setIsInstructorModalUp(true);
                }}
            />
            <InstructorCardsContainer />
            <InstructorModal />
        </div>
    );
};

export default Instructors;