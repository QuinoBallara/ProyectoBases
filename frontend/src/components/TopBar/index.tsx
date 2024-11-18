import React from 'react'
import "./styles.scss"

import Button from '../Button'

export const TopBar = () => {
    return (
        <div className='topBar'>
            <div className="topBarUpperButtonsContainer">
                <Button
                    label="Activities"
                    onClick={() => window.location.href = '/'}
                />
                <Button
                    label="Shifts"
                    onClick={() => window.location.href = '/shifts'}
                />
                <Button
                    label="Students"
                    onClick={() => window.location.href = '/students'}
                />
                <Button
                    label="Instructors"
                    onClick={() => window.location.href = '/instructors'}
                />
            </div>
            <div className="topBarLowerButtonsContainer">
                <Button
                    label="Revenues"
                    onClick={() => console.log('Home')}
                />
                <Button
                    label="Enrollment"
                    onClick={() => console.log('Home')}
                />
                <Button
                    label="Attendance"
                    onClick={() => console.log('Home')}
                />
            </div>
        </div>
        
    )
}
