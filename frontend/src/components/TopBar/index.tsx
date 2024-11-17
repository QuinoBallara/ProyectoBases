import React from 'react'
import "./styles.scss"

import Button from '../Button'

export const TopBar = () => {
    return (
        <div className='topBar'>
            <div className="topBarUpperButtonsContainer">
                <Button
                    label="Activities"
                    onClick={() => console.log('Home')}
                />
                <Button
                    label="Shifts"
                    onClick={() => console.log('Home')}
                />
                <Button
                    label="Students"
                    onClick={() => console.log('Home')}
                />
                <Button
                    label="Instructors"
                    onClick={() => console.log('Home')}
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
