import React from 'react';
import { ShiftCardsContainer } from '../../components/ShiftCardsContainer';
import Button from '../../components/Button';
import { useModal } from '../../contexts/modalContext';
import ShiftModal from '../ShiftModal';

const Shifts: React.FC = () => {

    const {setIsShiftModalUp} = useModal();
    return (
        <div style={{ width: '100%' }}>
            <Button
                label="Add Shift"
                onClick={() => setIsShiftModalUp(true)}
            
            />
            <ShiftCardsContainer/>
            <ShiftModal/>
        </div>
    );
};

export default Shifts;