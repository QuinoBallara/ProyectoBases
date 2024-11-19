import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {

    const [isClassModalUp, setIsClassModalUp_] = useState(false);
    const [isInstructorModalUp, setIsInstructorModalUp] = useState(false);
    const [isShiftModalUp, setIsShiftModalUp] = useState(false);
    const [isStudentModalUp, setIsStudentModalUp] = useState(false);

    const [classModalData, setClassModalData] = useState({
        instructor: 'any',
        shift: 'any',
        activity: 'any',
        quotas: 1,
    })

    const [instructorModalData, setInstructorModalData] = useState({
        first_name: '',
        last_name: '',
    })

    const [shiftModalData, setShiftModalData] = useState({
        name: '',
        start_time: '',
        end_time: '',
    })

    const [studentModalData, setStudentModalData] = useState({
        mail: '',
        first_name: '',
        last_name: '',
        birth_date: '',
        phone: '',
    });

    const setIsClassModalUp = (condition) => {
        setTimeout(() => {
            setIsClassModalUp_(condition); 
        }, 0);

    }

    return (
        <ModalContext.Provider value={{
            isClassModalUp, setIsClassModalUp, classModalData, setClassModalData,
            isInstructorModalUp, setIsInstructorModalUp, instructorModalData, setInstructorModalData,
            isShiftModalUp, setIsShiftModalUp, shiftModalData, setShiftModalData,
            isStudentModalUp, setIsStudentModalUp, studentModalData, setStudentModalData,
        }}>
            {children}
        </ModalContext.Provider>
    );

}

export const useModal = () => {
    return useContext(ModalContext);
}