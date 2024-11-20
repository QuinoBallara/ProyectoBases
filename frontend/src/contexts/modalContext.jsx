import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {

    const [isClassModalUp, setIsClassModalUp_] = useState(false);
    const [classEditMode, setClassEditMode] = useState(true);
    const [isInstructorModalUp, setIsInstructorModalUp] = useState(false);
    const [instructorEditMode, setInstructorEditMode] = useState(true);
    const [isShiftModalUp, setIsShiftModalUp] = useState(false);
    const [shiftEditMode, setShiftEditMode] = useState(true);
    const [isStudentModalUp, setIsStudentModalUp] = useState(false);
    const [studentEditMode, setStudentEditMode] = useState(true);
    const [isActivityModalUp, setIsActivityModalUp] = useState(false);
    const [activityEditMode, setActivityEditMode] = useState(true);
    const [isEquipmentModalUp, setIsEquipmentModalUp] = useState(false);
    const [equipmentEditMode, setEquipmentEditMode] = useState(true);

    const [classModalData, setClassModalData] = useState({
        instructor: 'any',
        shift: 'any',
        activity: 'any',
        quotas: 1,
    })

    const [instructorModalData, setInstructorModalData] = useState({
        id: '',
        first_name: '',
        last_name: '',
    })

    const [shiftModalData, setShiftModalData] = useState({
        name: '',
        start_time: '',
        end_time: '',
    })

    const [studentModalData, setStudentModalData] = useState({
        id: '',
        mail: '',
        first_name: '',
        last_name: '',
        birth_date: '',
        phone: '',
    });

    const [activityModalData, setActivityModalData] = useState({
        descripion: '',
        cost: '',
        min_age: '',
        max_age: '',
    });

    const [equipmentModalData, setEquipmentModalData] = useState({
        activity_id: '',
        description: '',
        cost: '',
    });

    const setIsClassModalUp = (condition) => {
        setTimeout(() => {
            setIsClassModalUp_(condition);
        }, 0);

    }

    return (
        <ModalContext.Provider value={{
            isClassModalUp, setIsClassModalUp, classModalData, setClassModalData, classEditMode, setClassEditMode,
            isInstructorModalUp, setIsInstructorModalUp, instructorModalData, setInstructorModalData, instructorEditMode, setInstructorEditMode,
            isShiftModalUp, setIsShiftModalUp, shiftModalData, setShiftModalData, shiftEditMode, setShiftEditMode,
            isStudentModalUp, setIsStudentModalUp, studentModalData, setStudentModalData, studentEditMode, setStudentEditMode,
            isActivityModalUp, setIsActivityModalUp, activityModalData, setActivityModalData, activityEditMode, setActivityEditMode,
            isEquipmentModalUp, setIsEquipmentModalUp, equipmentModalData, setEquipmentModalData, equipmentEditMode, setEquipmentEditMode,
        }}>
            {children}
        </ModalContext.Provider>
    );

}

export const useModal = () => {
    return useContext(ModalContext);
}