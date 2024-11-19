import React from 'react'
import "./styles.scss"

import Button from '../Button'
import { useNavigate } from 'react-router-dom'

export const TopBar = () => {
    const navigate = useNavigate()
    return (
        <div className='topBar'>
            <div className="topBarUpperButtonsContainer">
                <Button
                    label="Classes"
                    onClick={() => navigate('/')}
                />
                <Button
                    label="Activities"
                    onClick={() => navigate('/activities')}
                />
                <Button
                    label="Shifts"
                    onClick={() => navigate('/shifts')}
                />
                <Button
                    label="Students"
                    onClick={() => navigate('/students')}
                />
                <Button
                    label="Instructors"
                    onClick={() => navigate('/instructors')}
                />
            </div>
            <div className="topBarLowerButtonsContainer">
                <Button
                    label="Revenues"
                    onClick={() => navigate('/revenues')}
                />
                <Button
                    label="Enrollment"
                    onClick={() => navigate('/enrollment')}
                />
                <Button
                    label="Attendance"
                    onClick={() => navigate('/attendance')
                    }
                />
            </div>
        </div>

    )
}
