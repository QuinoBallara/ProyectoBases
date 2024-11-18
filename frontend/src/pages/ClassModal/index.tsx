import React, { useState } from 'react';
import './styles.scss';
import Button from '../../components/Button';
import Dropdown from '../../components/DropdownPolenta';
import Input4Number from '../../components/Input4Number';
import { useModal } from '../../contexts/modalContext';

const ClassModal: React.FC = () => {
  const [formState, setFormState] = useModal();

  const [isClassModalUp, setIsClassModalUp] = useModal(); 

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const closeModal = () => setIsClassModalUp(false);

  const handleSubmit = () => {
    console.log('Submitted form:', formState);
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
              options={[
                { value: 'any', label: 'Any' },
                { value: '1', label: 'Instructor 1' },
                { value: '2', label: 'Instructor 2' },
                { value: '3', label: 'Instructor 3' },
              ]}
              value={formState.instructor}
              onChange={handleChange}
              name="instructor"
            />
            <Dropdown
              label="Shift"
              options={[
                { value: 'any', label: 'Any' },
                { value: 'morning', label: 'Morning' },
                { value: 'afternoon', label: 'Afternoon' },
                { value: 'night', label: 'Night' },
              ]}
              value={formState.shift}
              onChange={handleChange}
              name="shift"
            />
            <Dropdown
              label="Activity"
              options={[
                { value: 'any', label: 'Any' },
                { value: 'yoga', label: 'Yoga' },
                { value: 'pilates', label: 'Pilates' },
                { value: 'crossfit', label: 'Crossfit' },
              ]}
              value={formState.activity}
              onChange={handleChange}
              name="activity"
            />
            <Input4Number
              label="Quotas"
              value={formState.quotas}
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
