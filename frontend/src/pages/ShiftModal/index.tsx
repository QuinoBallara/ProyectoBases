import React, { useEffect } from 'react';
import './styles.scss';
import Button from '../../components/Button';
import Dropdown from '../../components/DropdownPolenta';
import Input4Number from '../../components/Input4Number';
import { useModal } from '../../contexts/modalContext';
import { useClasses } from '../../contexts/classesContext';
import Input from '../../components/Input';
import { addShift, modifyShift } from '../../api/shift';
import * as validate from '../../utils/validation';

const ShiftModal: React.FC = () => {
  const {
    isShiftModalUp,
    setIsShiftModalUp,
    shiftModalData,
    setShiftModalData,
    shiftEditMode,
  } = useModal();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setShiftModalData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
  }, [shiftModalData]);

  const closeModal = () => {
    setShiftModalData({
      id: '',
      name: '',
      start_time: '',
      end_time: '',
    })
    setIsShiftModalUp(false)
  };

  const handleSubmit = async () => {
    if (shiftModalData.name === '' || shiftModalData.start_time === '' || shiftModalData.end_time === '') {
      alert('Not all fields are filled');
      return;
    }

    if (!validate.validateName(shiftModalData.name)) {
      alert('Invalid name');
      return;
    }

    if (!shiftEditMode) {
      await addShift(shiftModalData);
    } else {
      await modifyShift(shiftModalData.id, shiftModalData);
    }
    closeModal();
  };

  return (
    isShiftModalUp && (
      <div className="shiftModalContainer">
        <div className="shiftModal">
          <Button
            className="close-button-shiftModal"
            label="Close"
            onClick={closeModal}
          />
          <div className="modal-content">
            <Input
              label="Name"
              type="text"
              name="name"
              value={shiftModalData.name || ''}
              onChange={handleChange}
            />
            <label htmlFor="start_time">Start Time</label>
            <Input
              label=""
              type="time"
              name="start_time"
              value={shiftModalData.start_time || ''}
              onChange={handleChange}
            />
            <label htmlFor="end_time">End Time</label>
            <Input
              label=""
              type="time"
              name="end_time"
              value={shiftModalData.end_time || ''}
              onChange={handleChange}
            />
          </div>
          <Button
            className="submit-button-shiftModal"
            label="Submit"
            onClick={handleSubmit}
          />
        </div>
      </div>
    )
  );
};

export default ShiftModal;
