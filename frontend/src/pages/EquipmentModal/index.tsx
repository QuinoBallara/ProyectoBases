import React, { useEffect } from 'react';
import './styles.scss';
import Button from '../../components/Button';
import Dropdown from '../../components/DropdownPolenta';
import Input4Number from '../../components/Input4Number';
import { useModal } from '../../contexts/modalContext';
import { useClasses } from '../../contexts/classesContext';
import Input from '../../components/Input';

export const EquipmentModal: React.FC = () => {
    const {
        isEquipmentModalUp,
        setIsEquipmentModalUp,
        equipmentModalData,
        setEquipmentModalData,
    } = useModal();

    const { activities } = useClasses();

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setEquipmentModalData((prevData) => ({
            ...prevData,
        }));
    };

    useEffect(() => {

    }, [equipmentModalData]);

    const closeModal = () => setIsEquipmentModalUp(false);

    const handleSubmit = () => {
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
                            return { value: activity.description, label: activity.description }
                        })} onChange={handleChange} name='activity' value={equipmentModalData.activity} />
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