import React, { createContext, useContext, useEffect, useState } from 'react';

const ClassesContext = createContext();

export const ClassesProvider = ({ children }) => {

    const [allClasses, setAllClasses] = useState([{
        dictated: true,
        instructor: 'Instructor 1',
        shift: 'Morning',
        activity: 'Yoga',
        studentQuotas: 10
    },
    {
        dictated: false,
        instructor: 'Instructor 2',
        shift: 'Afternoon',
        activity: 'Pilates',
        studentQuotas: 15
    },
    {
        dictated: true,
        instructor: 'Instructor 3',
        shift: 'Night',
        activity: 'Crossfit',
        studentQuotas: 20
    },]);

    const [classes, setClasses] = useState(allClasses);

    const [filters, setFilters] = useState({
        instructor: "any",
        shift: "any",
        activity: "any",
    });


    const [instructors, setInstructors] = useState([
        {id: 1, first_name: 'Instructor', last_name: '1'},
        {id: 2, first_name: 'Instructor', last_name: '2'},
        {id: 3, first_name: 'Instructor', last_name: '3'},
    ]);

    const [shifts, setShifts] = useState([
        {id: 1, name: 'Morning', start_time: '08:00', end_time: '12:00'},
        {id: 2, name: 'Afternoon', start_time: '12:00', end_time: '16:00'},
        {id: 3, name: 'Night', start_time: '16:00', end_time: '20:00'},
    ]);

    const [students, setStudents] = useState([
        {
            id: 1, mail: 'student1@mail.com', first_name: 'Student', last_name: '1', birth_date: '1990-01-01', phone: '123456789',
        },
        {
            id: 2, mail: 'student2@mail.com', first_name: 'Student', last_name: '2', birth_date: '1990-01-01', phone: '123456789',
        },
        {
            id: 3, mail: 'student3@mail.com', first_name: 'Student', last_name: '3', birth_date: '1990-01-01', phone: '123456789',
        },
    ]);

    useEffect(() => {
        const filteredClasses = allClasses.filter((classItem) => {
            return (
                (filters.instructor === "any" || classItem.instructor.includes(`Instructor ${filters.instructor}`)) &&
                (filters.shift === "any" || classItem.shift.toLowerCase() === filters.shift) &&
                (filters.activity === "any" || classItem.activity.toLowerCase() === filters.activity)
            );
        });
        setClasses(filteredClasses);
    }, [filters, allClasses]); 

    return (
        <ClassesContext.Provider value={{ classes, setClasses, filters, setFilters, instructors, setInstructors, shifts, setShifts, students, setStudents }}>
            {children}
        </ClassesContext.Provider>
    );
};

export const useClasses = () => {
    return useContext(ClassesContext);
};
