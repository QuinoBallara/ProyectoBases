import React, { createContext, useContext, useEffect, useState } from 'react';
import { getActivities } from '../api/activity';
import { getStudents } from '../api/student';
import { getShifts } from '../api/shift';
import { getInstructors } from '../api/instructor';
import { getClasses } from '../api/class';
import { getAllEquipment } from '../api/equipment';
import { activityRevenue, studentActivity, shiftClass, classProps } from '../api/views';


const ClassesContext = createContext();

export const ClassesProvider = ({ children }) => {

    const [allClasses, setAllClasses] = useState([]);

    const [classes, setClasses] = useState(allClasses);

    const [filters, setFilters] = useState({
        instructor: "any",
        shift: "any",
        activity: "any",
    });
    const [activities, setActivities] = useState([]);


    const [instructors, setInstructors] = useState([]);

    const [shifts, setShifts] = useState([]);

    const [students, setStudents] = useState([]);

    const [equipments, setEquipments] = useState([]);

    const [revenues, setRevenues] = useState([]);

    const [enrollment, setEnrollment] = useState([]);

    const [attendance, setAttendance] = useState([]);

    useEffect(() => {

        const filteredClasses = allClasses.filter((classItem) => {
            const instructorName = instructors.find(
                (inst) => inst.id.toString() === filters.instructor
            )?.first_name;

            const shiftName = shifts.find(
                (shift) => shift.id.toString() === filters.shift
            )?.name.toLowerCase();

            const activityName = activities.find(
                (activity) => activity.id.toString() === filters.activity
            )?.description.toLowerCase();

            return (
                (filters.instructor === "any" || classItem.instructor_first_name.includes(instructorName)) &&
                (filters.shift === "any" || classItem.shift_name.toLowerCase() === shiftName) &&
                (filters.activity === "any" || classItem.activity_description.toLowerCase() === activityName)
            );
        });
        setClasses(filteredClasses);
    }, [filters, allClasses, instructors, shifts, activities]);


    useEffect(() => {
        const bigFetch = async () => {
            try {
                const [
                    students,
                    shifts,
                    instructors,
                    activities,
                    equipments,
                    classes,
                    revenues,
                    enrollment,
                    attendance,
                    allClasses
                ] = await Promise.all([
                    getStudents(),
                    getShifts(),
                    getInstructors(),
                    getActivities(),
                    getAllEquipment(),
                    getClasses(),
                    activityRevenue(),
                    studentActivity(),
                    shiftClass(),
                    classProps()
                ]);

                setStudents(students);
                setShifts(shifts);
                setInstructors(instructors);
                setActivities(activities);
                setEquipments(equipments);
                setClasses(classes);
                setRevenues(revenues);
                setEnrollment(enrollment);
                setAttendance(attendance);
                setAllClasses(allClasses);


            }
            catch (error) {
            }
        }
        bigFetch();
    }, []);

    return (
        <ClassesContext.Provider value={{ allClasses, setAllClasses, classes, setClasses, filters, setFilters, instructors, setInstructors, shifts, setShifts, students, setStudents, revenues, setRevenues, enrollment, setEnrollment, attendance, setAttendance, activities, setActivities, equipments, setEquipments }}>
            {children}
        </ClassesContext.Provider>
    );
};

export const useClasses = () => {
    return useContext(ClassesContext);
};
