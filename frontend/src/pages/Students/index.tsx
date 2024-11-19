import React from 'react';
import { StudentCardsContainer } from '../../components/StudentCardsContainer';
import Button from '../../components/Button';
import { useModal } from '../../contexts/modalContext';
import StudentModal from '../StudentModal';

const Students: React.FC = () => {

    const {setIsStudentModalUp} = useModal();

    return (
        <div style={{ width: '100%' }}>
            <Button
                label="Add Student"
                onClick={() => setIsStudentModalUp(true)}
            />
            <StudentCardsContainer/>
            <StudentModal/>
        </div>
    );
};

export default Students;