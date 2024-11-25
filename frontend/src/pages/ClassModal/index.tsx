import React, { useEffect, useMemo } from 'react';
import './styles.scss';
import Button from '../../components/Button';
import Dropdown from '../../components/DropdownPolenta';
import Input4Number from '../../components/Input4Number';
import { useModal } from '../../contexts/modalContext';
import { useClasses } from '../../contexts/classesContext';
import { instructor } from '../../consts/instructor';
import { modifyClass, addClass } from '../../api/class';
import * as validate from '../../utils/validation';

const ClassModal: React.FC = () => {
  const {
    isClassModalUp,
    setIsClassModalUp,
    classModalData,
    setClassModalData,
    classEditMode,
  } = useModal();

  const { instructors, shifts, activities } = useClasses();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setClassModalData((prevData) => ({
      ...prevData,
      [name]: name === 'quotas' ? Number(value) : value,
    }));
  };

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

  const handleSubmit = async () => {
    if (!classEditMode && classModalData.student_quotas === '' && validate.checkInvalidNumber(classModalData.student_quotas)) {
      alert('Invalid student quotas');
      return;
    }

    const data = {
      dictated: classModalData.dictated === '0' ? false : true,
      instructor_id: classModalData.instructor_id,
      shift_id: parseInt(classModalData.shift_id),
      activity_id: parseInt(classModalData.activity_id),
      student_quotas: parseInt(classModalData.student_quotas),
    }

    if (!classEditMode) {
      await addClass(data);
    } else {
      await modifyClass(parseInt(classModalData.class_id), data);
    }
    closeModal();
  };

  const instructorsList = instructors.map((instructor: instructor) => {
    const fullName = `${instructor.first_name} ${instructor.last_name}`;
    return { value: instructor.id, label: fullName };
  })

  const shiftsList = shifts.map((shift: { id: string; name: string }) => {
    return { value: shift.id, label: shift.name };
  })

  const activitesList = activities.map((activity: { id: string; description: string }) => {
    return { value: activity.id, label: activity.description };
  })

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
            {!classEditMode && (<Dropdown
              label="Dictated"
              options={[
                { value: '', label: '' },
                { value: '1', label: 'Yes' },
                { value: '0', label: 'No' },
              ]}
              value={classModalData.dictated}
              onChange={handleChange}
              name="dictated"
            />)}

            <Dropdown
              label="Instructor"
              options={[{ value: '', label: '' }, ...instructorsList]}
              value={classModalData.instructor_id}
              onChange={handleChange}
              name="instructor_id"
            />

            <Dropdown
              label="Shift"
              options={[{ value: '', label: '' }, ...shiftsList]}
              value={classModalData.shift_id}
              onChange={handleChange}
              name="shift_id"
            />

            {!classEditMode && (
              <Dropdown
                label="Activity"
                options={[{ value: '', label: '' }, ...activitesList]}
                value={classModalData.activity_id}
                onChange={handleChange}
                name="activity_id"
              />
            )}
            {!classEditMode && (
              <Input4Number
                label="Quotas"
                value={classModalData.student_quotas}
                onChange={handleChange}
                name="student_quotas"
              />
            )}
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
