import React, { useEffect } from 'react';
import './styles.scss';
import Button from '../../components/Button';
import Dropdown from '../../components/DropdownPolenta';
import Input4Number from '../../components/Input4Number';
import { useModal } from '../../contexts/modalContext';
import { useClasses } from '../../contexts/classesContext';
import Input from '../../components/Input';
import { addActivity, modifyActivity } from '../../api/activity';
import * as validate from '../../utils/validation';
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
    }, [activityModalData]);

    const closeModal = () => {
        setActivityModalData({
            description: '',
            cost: 0,
            min_age: 0,
            max_age: 0,
        })
        setIsActivityModalUp(false)
    };

    const handleSubmit = async () => {
        if (
            activityModalData.description === '' ||
            activityModalData.cost === '' ||
            activityModalData.min_age === '' ||
            activityModalData.max_age === ''
        ) {
            alert('Not all fields are filled');
            return;
        }

        if (!validate.validateDescription(activityModalData.description)) {
            alert('Invalid description');
            return;
        }

        if (validate.checkInvalidNumber(activityModalData.cost)) {
            alert('Invalid cost');
            return;
        }

        if (!validate.validateAge(activityModalData.min_age.toString())) {
            alert('Invalid min age');
            return;
        }

        if (!validate.validateAge(activityModalData.max_age.toString())) {
            alert('Invalid max age');
            return;
        }

        if (activityModalData.min_age > activityModalData.max_age) {
            alert('Min age is greater than max age');
            return;
        }

        const data = {
            description: activityModalData.description,
            cost: parseInt(activityModalData.cost),
            min_age: parseInt(activityModalData.min_age),
            max_age: parseInt(activityModalData.max_age),
        }

        if (!activityEditMode) {
            await addActivity(data);
        } else {
            await modifyActivity(activityModalData.id, data);
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
                            value={activityModalData.cost}
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
