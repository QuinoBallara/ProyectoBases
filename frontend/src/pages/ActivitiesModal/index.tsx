import React, { useEffect } from 'react';
import './styles.scss';
import Button from '../../components/Button';
import Dropdown from '../../components/DropdownPolenta';
import Input4Number from '../../components/Input4Number';
import { useModal } from '../../contexts/modalContext';
import { useClasses } from '../../contexts/classesContext';
import Input from '../../components/Input';
import { addActivity, modifyActivity } from '../../api/activity';

const ActivitiesModal: React.FC = () => {
    const {
        isActivityModalUp,
        setIsActivityModalUp,
        activityModalData,
        setActivityModalData,
        activityEditMode,
    } = useModal();

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setActivityModalData((prevData) => ({
            ...prevData,
            [name]: name === 'quotas' ? Number(value) : value,
        }));
    };

    useEffect(() => {
        console.log(activityModalData.instructor);
    }, [activityModalData]);

    const closeModal = () => setIsActivityModalUp(false);

    const handleSubmit = async () => {
        if (
            activityModalData.description === '' ||
            activityModalData.cost === '' ||
            activityModalData.min_age === '' ||
            activityModalData.max_age === ''
        ) {
            console.log('Not all fields are filled');
            return;
        }
        if (!activityEditMode) {
            await addActivity(activityModalData);
        } else {
            await modifyActivity(activityModalData.id, activityModalData);
        }

        closeModal();
    };

    return (
        isActivityModalUp && (
            <div className="classModalContainer">
                <div className="classModal">
                    <Button
                        className="close-button-classModal"
                        label="Close"
                        onClick={closeModal}
                    />
                    <div className="modal-content">
                        <Input
                            label='Description'
                            value={activityModalData.description}
                            onChange={handleChange}
                            name='description'
                        />
                        <Input4Number
                            label="Cost"
                            value={activityModalData.Cost}
                            onChange={handleChange}
                            name="cost"
                        />
                        <Input4Number
                            label="Min Age"
                            value={activityModalData.min_age}
                            onChange={handleChange}
                            name="min_age"
                        />
                        <Input4Number
                            label="Max Age"
                            value={activityModalData.max_age}
                            onChange={handleChange}
                            name="max_age"
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

export default ActivitiesModal;
