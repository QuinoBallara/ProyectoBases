import React, { useEffect, useMemo } from 'react';
import './styles.scss';
import Button from '../../components/Button';
import Dropdown from '../../components/DropdownPolenta';
import Input4Number from '../../components/Input4Number';
import { useModal } from '../../contexts/modalContext';
import { useClasses } from '../../contexts/classesContext';
import { instructor } from '../../consts/instructor';
import { modifyClass } from '../../api/class';

const ClassModal: React.FC = () => {
  const {
    isClassModalUp,
    setIsClassModalUp,
    classModalData,
    setClassModalData,
  } = useModal();
  
  const { instructors, shifts, activities } = useClasses();
  

  const activity = useMemo(() => {
    if (classModalData.activity_id != '') {
      return activities.find(
        (activity) => activity.id === classModalData.activity_id
      );
    } else {
      return { id: '', description: '' };
    }
  
  }, [activities, classModalData.activity_id]);
  const instructor = useMemo(() => {
    if (classModalData.instructor_id != '') {
      return instructors.find(
        (instructor) => instructor.id === classModalData.instructor_id
      );
    } else {
      return { id: '', first_name: '', last_name: '' };
    }
  }, [instructors, classModalData.instructor_id]);
  const shift = useMemo(() => {
    if (classModalData.shift_id != '') {
      return shifts.find(
        (shift) => shift.id === classModalData.shift_id
      );
    }
    return { id: '', name: '' };
  }, [shifts, classModalData.shift_id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setClassModalData((prevData) => ({
      ...prevData,
      [name]: name === 'quotas' ? Number(value) : value,
    }));
  };

  useEffect(() => {
    console.log(classModalData.instructor);
  }, [classModalData]);

  const closeModal = () => {
    setClassModalData({
      activity_description: '',
      activity_id: '',
      dictated: '',
      instructor_first_name: '',
      instructor_id: '',
      shift_id: '',
      shift_name: '',
      student_quotas: '',
    })
    setIsClassModalUp(false)
  };

  const handleSubmit = () => {
    modifyClass(parseInt(classModalData.class_id), {
      dictated: Boolean(parseInt(classModalData.dictated)),
      instructor_id: classModalData.instructor_id,
      shift_id: parseInt(classModalData.shift_id),
      activity_id: parseInt(classModalData.activity_id),
      student_quotas: parseInt(classModalData.student_quotas),
    });
    closeModal();
  };

  return (
    isClassModalUp && (
      <div className="classModalContainer">
        <div className="classModal">
          <Button
            className="close-button-classModal"
            label="Close"
            onClick={closeModal}
          />
          <div className="modal-content">
          <Dropdown
            label="Instructor"
            options={instructors.map((instructor: instructor) => {
              const fullName = `${instructor.first_name} ${instructor.last_name}`;
              return { value: instructor.id, label: fullName };
            })}
            value={classModalData.instructor_id} 
            onChange={handleChange}
            name="instructor_id" 
          />

          <Dropdown
            label="Shift"
            options={shifts.map((shift: { id: string; name: string }) => {
              return { value: shift.id, label: shift.name };
            })}
            value={classModalData.shift_id} 
            onChange={handleChange}
            name="shift_id" 
          />

          <Dropdown
            label="Activity"
            options={activities.map((activity: { id: string; description: string }) => {
              return { value: activity.id, label: activity.description };
            })}
            value={classModalData.activity_id} 
            onChange={handleChange}
            name="activity_id" 
          />

            <Input4Number
              label="Quotas"
              value={classModalData.quotas}
              onChange={handleChange}
              name="quotas"
            />
          </div>
          <Button
            className="submit-button-classModal"
            label="Submit"
            onClick={handleSubmit}
          />
        </div>
      </div>
    )
  );
};

export default ClassModal;
