import React, { useEffect } from 'react';
import './styles.scss';
import Button from '../../components/Button';
import Dropdown from '../../components/DropdownPolenta';
import Input4Number from '../../components/Input4Number';
import { useModal } from '../../contexts/modalContext';
import { useClasses } from '../../contexts/classesContext';
import Input from '../../components/Input';
import { addEquipment, modifyEquipment } from '../../api/equipment';
import * as validate from '../../utils/validation';

export const EquipmentModal: React.FC = () => {
    const {
        isEquipmentModalUp,
        setIsEquipmentModalUp,
        equipmentModalData,
        setEquipmentModalData,
        equipmentEditMode,
    } = useModal();

    const { activities } = useClasses();

    const activity = activities.find((activity) => activity.id === equipmentModalData.activity_id);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setEquipmentModalData((prevData: typeof equipmentModalData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    useEffect(() => {

    }, [equipmentModalData]);

    const closeModal = () => {
        setEquipmentModalData({
            description: '',
            activity: '',
            cost: 0,
        });
        setIsEquipmentModalUp(false)
    };

    const handleSubmit = async () => {
        if (equipmentModalData.description === '') {
            alert('Not all fields are filled');
            return;
        }

        if (!validate.validateDescription(equipmentModalData.description)) {
            alert('Invalid description');
            return;
        }

        if (validate.checkInvalidNumber(equipmentModalData.cost)) {
            alert('Invalid cost');
            return;
        }
        const data = {
            activity_id: parseInt(equipmentModalData.activity_id),
            description: equipmentModalData.description,
            cost: parseInt(equipmentModalData.cost),
        }

        if (!equipmentEditMode) {
            await addEquipment(data);
        } else {
            await modifyEquipment(equipmentModalData.id, data);
        }

        closeModal();
    };

    return (
        isEquipmentModalUp && (
            <div className='equipmentModalContainer'>
                <div className='equipmentModal'>
                    <Button
                        className='close-button-equipmentModal'
                        label='Close'
                        onClick={closeModal}
                    />
                    <div className='modal-content'>
                        <Input
                            label='Description'
                            type='text'
                            name='description'
                            value={equipmentModalData.description || ''}
                            onChange={handleChange}
                        />
                        <Dropdown label='Activity' options={activities.map((activity) => {
                            return { value: activity.id, label: activity.description }
                        })} onChange={handleChange} name='activity_id' value={activity} />
                        <Input4Number label='Cost' value={equipmentModalData.cost || 0} onChange={handleChange} name='cost' />
                    </div>
                    <Button
                        className='submit-button-equipmentModal'
                        label='Submit'
                        onClick={handleSubmit}
                    />
                </div>
            </div>
        )
    )

}