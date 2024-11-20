import React, { useEffect } from 'react';
import { ShiftCardsContainer } from '../../components/ShiftCardsContainer';
import Button from '../../components/Button';
import { useModal } from '../../contexts/modalContext';
import ShiftModal from '../ShiftModal';
import { useClasses } from '../../contexts/classesContext';
import { getShifts } from '../../api/shift';

const Shifts: React.FC = () => {
    const { setIsShiftModalUp, isShiftModalUp, setShiftEditMode } = useModal();
    const { shifts, setShifts } = useClasses();

    useEffect(() => {
        const fetchShifts = async () => {
            if (!isShiftModalUp) {
                setShifts(await getShifts());
            }
        }
        fetchShifts();
    }, [isShiftModalUp]);
    return (
        <div style={{ width: '100%' }}>
            <Button
                label="Add Shift"
                onClick={() => {
                    setShiftEditMode(false);
                    setIsShiftModalUp(true);
                }}

            />
            <ShiftCardsContainer />
            <ShiftModal />
        </div>
    );
};

export default Shifts;