import React from 'react';
import { InstructorCardsContainer } from '../../components/InstructorCardsContainer';
import { useModal } from '../../contexts/modalContext';
import Button from '../../components/Button';
import InstructorModal from '../InstructorModal';

const Instructors: React.FC = () => {

    const {setIsInstructorModalUp} = useModal();
    return (
        <div style={{ width: '100%' }}>
            <Button
                label="Add Instructor"
                onClick={() => setIsInstructorModalUp(true)}
            />
            <InstructorCardsContainer/>
            <InstructorModal/>
        </div>
    );
};

export default Instructors;