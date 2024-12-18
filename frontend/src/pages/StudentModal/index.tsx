import React, { useEffect } from 'react';
import './styles.scss';
import Button from '../../components/Button';
import { useModal } from '../../contexts/modalContext';
import Input from '../../components/Input';
import { useClasses } from '../../contexts/classesContext';
import { addStudent, modifyStudent } from '../../api/student';
import * as validate from '../../utils/validation';

const StudentModal: React.FC = () => {
  const {
    isStudentModalUp,
    setIsStudentModalUp,
    studentModalData,
    setStudentModalData,
    studentEditMode,
  } = useModal();

  const [originalId, setOriginalId] = React.useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setStudentModalData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    setOriginalId(studentModalData.id);
  }, [isStudentModalUp]);

  const closeModal = () => {
    setStudentModalData({
      id: '',
      first_name: '',
      last_name: '',
      birth_day: '',
      phone: '',
      mail: '',
    })
    setIsStudentModalUp(false)
  };

  const handleSubmit = async () => {
    if ((!studentEditMode && studentModalData.id === '') || studentModalData.first_name === '' || studentModalData.last_name === '' && studentModalData.birth_day === '' && studentModalData.phone === '' && studentModalData.mail === '') {
      alert('Not all fields are filled');
      return;
    }

    if (!validate.validateName(studentModalData.first_name)) {
      alert('Invalid first name');
      return;
    }

    if (!validate.validateName(studentModalData.last_name)) {
      alert('Invalid last name');
      return;
    }

    if (!studentEditMode && !validate.idValidation(studentModalData.id)) {
      alert('Invalid ID');
      return;
    }

    if (!validate.dateValidation(studentModalData.birth_day)) {
      alert('Invalid birth date');
      return;
    }

    if (!validate.phoneValidation(studentModalData.phone)) {
      alert('Invalid phone');
      return;
    }

    if (!validate.emailValidation(studentModalData.mail)) {
      alert('Invalid email');
      return;
    }

    if (!studentEditMode) {
      await addStudent(studentModalData);
    } else {
      await modifyStudent(originalId, studentModalData);
    }
    closeModal();
  };

  return (
    isStudentModalUp && (
      <div className="studentModalContainer">
        <div className="studentModal">
          <Button
            className="close-button-studentModal"
            label="Close"
            onClick={closeModal}
          />
          <div className="modal-content">
            {(!studentEditMode) && (<Input
              label="ID"
              type="text"
              name="id"
              value={studentModalData.id || ''}
              onChange={handleChange}
            />)}
            <div className="form-group">
              <Input
                label="First Name"
                type="text"
                name="first_name"
                value={studentModalData.first_name || ''}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">

              <Input
                type="text"
                label="Last Name"
                name="last_name"
                value={studentModalData.last_name || ''}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="birth_date">Birth Date</label>
              <Input
                type="date"
                label=""
                name="birth_day"
                value={studentModalData.birth_day || ''}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <Input
                type="tel"
                label="Phone"
                name="phone"
                value={studentModalData.phone || ''}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">

              <Input
                type="email"
                label="Email"
                name="mail"
                value={studentModalData.mail || ''}
                onChange={handleChange}
              />
            </div>
          </div>
          <Button
            className="submit-button-studentModal"
            label="Submit"
            onClick={handleSubmit}
          />
        </div>
      </div>
    )
  );
};

export default StudentModal;
