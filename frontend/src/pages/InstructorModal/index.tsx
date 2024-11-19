import React, { useEffect } from 'react';
import './styles.scss';
import Button from '../../components/Button';
import Dropdown from '../../components/DropdownPolenta';
import Input4Number from '../../components/Input4Number';
import { useModal } from '../../contexts/modalContext';
import { useClasses } from '../../contexts/classesContext';
import Input from '../../components/Input';

const InstructorModal: React.FC = () => {
  const {
    isInstructorModalUp,
    setIsInstructorModalUp,
    instructorModalData,
    setInstructorModalData,
  } = useModal();


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setInstructorModalData((prevData) => ({
      ...prevData,
      [name]: value, 
    }));
  };

  useEffect(() => {
  }, [instructorModalData]);

  const closeModal = () => setIsInstructorModalUp(false);

  const handleSubmit = () => {
    closeModal();
  };

  return (
    isInstructorModalUp && (
      <div className="instructorModalContainer">
        <div className="instructorModal">
          <Button
            className="close-button-instructorModal"
            label="Close"
            onClick={closeModal}
          />
          <div className="modal-content">
            <Input  
              label="ID"
              type="text"
              name="id"
              value={instructorModalData.id || ''}
              onChange={handleChange}
            />
            <Input
              label="First Name"
              type="text"
              name="first_name"
              value={instructorModalData.first_name || ''}
              onChange={handleChange}
            />
            <Input
              label="Last Name"
              type="text"
              name="last_name"
              value={instructorModalData.last_name || ''}
              onChange={handleChange}
            />
          </div>
          <Button
            className="submit-button-instructorModal"
            label="Submit"
            onClick={handleSubmit}
          />
        </div>
      </div>
    )
  );
};

export default InstructorModal;
