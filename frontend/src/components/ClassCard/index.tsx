import React, { useEffect, useMemo, useState } from 'react';

import { ClassProps } from '../../consts/classProps'

import './styles.scss'
import Button from '../Button'
import { deleteClass, getClasses } from '../../api/class'
import { useModal } from '../../contexts/modalContext';
import Dropdown from '../DropdownPolenta';
import { useClasses } from '../../contexts/classesContext';
import { addClassStudent, deleteClassStudent, getClassStudentsByClassId } from '../../api/classStudent';

export const ClassCard = (props: ClassProps) => {
  const { setIsClassModalUp, setClassModalData, setClassEditMode } = useModal();
  const { students, equipments, setClasses } = useClasses();

  const handleEdit = (): void => {
    setClassEditMode(true);
    setClassModalData(props);
    setIsClassModalUp(true);
  };

  const [selectedAddStudent, setSelectedAddStudent] = useState<string>('');
  const [selectedDeleteStudent, setSelectedDeleteStudent] = useState<string>('');
  const [enrolledStudents, setEnrolledStudents] = useState<{ class_id: string; equipment_id: string | null; student_id: string }[]>([]);
  const [selectedEquipment, setSelectedEquipment] = useState<string>('');

  const fetchEnrolledStudents = async () => {
    const data = await getClassStudentsByClassId(props.class_id);
    setEnrolledStudents(data);
  };

  useEffect(() => {
    fetchEnrolledStudents();
  }, [props.class_id]);

  const deleteStudentsOptions = useMemo(() => {
    const enrolledStudentIds = enrolledStudents.map(enrolled => enrolled.student_id);
    const options = students
      .filter(student => enrolledStudentIds.includes(student.id.toString()))
      .map(student => ({
        value: student.id.toString(),
        label: `${student.first_name} ${student.last_name}`,
      }));
    return [{ value: '', label: 'Select a student' }, ...options];
  }, [students, enrolledStudents]);

  const addStudentsOptions = useMemo(() => {
    const enrolledStudentIds = enrolledStudents.map(enrolled => enrolled.student_id);
    const options = students
      .filter(student => !enrolledStudentIds.includes(student.id.toString()))
      .map(student => ({
        value: student.id.toString(),
        label: `${student.first_name} ${student.last_name}`,

      }));
    return [{ value: '', label: 'Select a student' }, ...options];
  }, [students, enrolledStudents]);

  const equipmentOptions = useMemo(() => {
    return [
      { value: '', label: 'No equipment' },
      ...equipments.map(equipment => ({
        value: equipment.id.toString(),
        label: equipment.description,
      })),
    ];
  }, [equipments]);

  const addStudent = async (): Promise<void> => {
    if (selectedAddStudent !== '') {
      await addClassStudent({
        class_id: parseInt(props.class_id),
        student_id: selectedAddStudent,
        equipment_id: selectedEquipment === '' ? null : parseInt(selectedEquipment),
      });
      await fetchEnrolledStudents();
      setSelectedAddStudent('');
      setSelectedEquipment('');
    }
  };

  const handleDelete = async (): Promise<void> => {
    if (selectedDeleteStudent !== '') {
      await deleteClassStudent(props.class_id, selectedDeleteStudent);
      await fetchEnrolledStudents();
      setSelectedDeleteStudent('');
      setClasses(await getClasses());
    }
  };

  return (
    <div className="card">
      <div className="cardText">
        <h2 className="card-title">{props.activity_description}</h2>
        <p>
          <b>Instructor:</b> {props.instructor_first_name}
        </p>
        <p>
          <b>Shift:</b> {props.shift_name}
        </p>
        <p>
          <b>Quotas:</b> {props.student_quotas}
        </p>
      </div>

      <div className="cardButtonsContainer">
        <div className="addStudent-box">
          <Dropdown
            label="Equipment"
            value={selectedEquipment}
            onChange={value => setSelectedEquipment(value.target.value)}
            name="Add Equipment"
            options={equipmentOptions}
          />
          <Dropdown
            label="Student"
            value={selectedAddStudent}
            onChange={value => setSelectedAddStudent(value.target.value)}
            name="Add Student"
            options={addStudentsOptions}
          />
          <Button label="Add" onClick={addStudent} />
        </div>
        <div className="deleteStudent-box">
          <Dropdown
            label="Student"
            value={selectedDeleteStudent}
            onChange={value => setSelectedDeleteStudent(value.target.value)}
            name="Delete Student"
            options={deleteStudentsOptions}
          />
          <Button label="Delete" onClick={handleDelete} />
        </div>
        <Button className="edit-button" label="Edit" onClick={handleEdit} />
        <Button className="delete-button" label="Delete" onClick={() => console.log('Delete class')} />
      </div>
    </div>
  );
};
