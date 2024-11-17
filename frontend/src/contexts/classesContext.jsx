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

    // Filter classes based on the current filters state
    useEffect(() => {
        const filteredClasses = allClasses.filter((classItem) => {
            return (
                (filters.instructor === "any" || classItem.instructor.includes(`Instructor ${filters.instructor}`)) &&
                (filters.shift === "any" || classItem.shift.toLowerCase() === filters.shift) &&
                (filters.activity === "any" || classItem.activity.toLowerCase() === filters.activity)
            );
        });
        setClasses(filteredClasses);
    }, [filters, allClasses]); // Trigger filter whenever filters change

    return (
        <ClassesContext.Provider value={{ classes, setClasses, filters, setFilters }}>
            {children}
        </ClassesContext.Provider>
    );
};

export const useClasses = () => {
    return useContext(ClassesContext);
};
