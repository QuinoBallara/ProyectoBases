import React, { useEffect } from 'react';
import './styles.scss';
import Button from '../../components/Button';
import Dropdown from '../../components/DropdownPolenta';
import Input4Number from '../../components/Input4Number';
import { useModal } from '../../contexts/modalContext';
import { useClasses } from '../../contexts/classesContext';
import Input from '../../components/Input';
import { addInstructor, modifyInstructor } from '../../api/instructor';

const InstructorModal: React.FC = () => {
  const {
    isInstructorModalUp,
    setIsInstructorModalUp,
    instructorModalData,
    setInstructorModalData,
    instructorEditMode,
  } = useModal();

  const [originalId, setOriginalId] = React.useState('');


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
    setOriginalId(instructorModalData.id);
  }, [instructorModalData]);

  const closeModal = () => {
    setInstructorModalData({
      id: '',
      first_name: '',
      last_name: '',
    })
    setIsInstructorModalUp(false)
  };

  const handleSubmit = async () => {
    if ((!instructorEditMode && instructorModalData.id === '') || instructorModalData.first_name === '' || instructorModalData.last_name === '') {
      console.log('Not all fields are filled');
      return;
    }
    if (!instructorEditMode) {
      console.log(instructorModalData)
      await addInstructor(instructorModalData);
    } else {
      await modifyInstructor(originalId, instructorModalData);
    }

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
            {(!instructorEditMode) && (<Input
              label="ID"
              type="text"
              name="id"
              value={instructorModalData.id || ''}
              onChange={handleChange}
            />)}
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
