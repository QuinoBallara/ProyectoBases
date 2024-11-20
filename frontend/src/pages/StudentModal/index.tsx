import React, { useEffect } from 'react';
import './styles.scss';
import Button from '../../components/Button';
import { useModal } from '../../contexts/modalContext';
import Input from '../../components/Input';
import { useClasses } from '../../contexts/classesContext';
import { addStudent, modifyStudent } from '../../api/student';

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

  const closeModal = () => setIsStudentModalUp(false);

  const handleSubmit = async () => {
    if (studentModalData.id === '' || studentModalData.first_name === '' || studentModalData.last_name === '' && studentModalData.birth_day === '' && studentModalData.phone === '' && studentModalData.mail === '') {
      console.log('Not all fields are filled');
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
