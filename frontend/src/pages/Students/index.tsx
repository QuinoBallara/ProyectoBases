import React, { useEffect } from 'react';
import { StudentCardsContainer } from '../../components/StudentCardsContainer';
import Button from '../../components/Button';
import { useModal } from '../../contexts/modalContext';
import StudentModal from '../StudentModal';
import { useClasses } from '../../contexts/classesContext';
import { getStudents } from '../../api/student';

const Students: React.FC = () => {

    const { setIsStudentModalUp, isStudentModalUp, setStudentEditMode } = useModal();
    const { students, setStudents } = useClasses();

    useEffect(() => {
        const fetchStudents = async () => {
            if (!isStudentModalUp) {
                setStudents(await getStudents());
            }
        }
        fetchStudents();
    }, [isStudentModalUp]);

    return (
        <div style={{ width: '100%' }}>
            <Button
                label="Add Student"
                onClick={() => {
                    setStudentEditMode(false);
                    setIsStudentModalUp(true)
                }}
            />
            <StudentCardsContainer />
            <StudentModal />
        </div>
    );
};

export default Students;