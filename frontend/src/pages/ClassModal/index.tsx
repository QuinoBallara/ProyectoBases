import React, { useEffect } from 'react';
import './styles.scss';
import Button from '../../components/Button';
import Dropdown from '../../components/DropdownPolenta';
import Input4Number from '../../components/Input4Number';
import { useModal } from '../../contexts/modalContext';
import { useClasses } from '../../contexts/classesContext';

const ClassModal: React.FC = () => {
  const {
    isClassModalUp,
    setIsClassModalUp,
    classModalData,
    setClassModalData,
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

  useEffect(() => {
    console.log(classModalData.instructor);
  }, [classModalData]);

  const closeModal = () => {
    setClassModalData({
      instructor: '',
      shift: '',
      activity: '',
      quotas: 0,
    })
    setIsClassModalUp(false)
  };

  const handleSubmit = () => {
    console.log('Submitted form:', classModalData);
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
              options={instructors.map((instructor: { first_name: string; last_name: string }) => {
                const fullName = `${instructor.first_name} ${instructor.last_name}`;
                return { value: fullName, label: fullName };
              })}
              value={classModalData.instructor}
              onChange={handleChange}
              name="instructor"
            />
            <Dropdown
              label="Shift"
              options={shifts.map((shift: { name: string }) => {
                return { value: shift.name, label: shift.name };
              })}
              value={classModalData.shift}
              onChange={handleChange}
              name="shift"
            />
            <Dropdown
              label="Activity"
              options={activities.map((activity: { description: string }) => {
                return { value: activity.description, label: activity.description };
              })}
              value={classModalData.activity}
              onChange={handleChange}
              name="activity"
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
