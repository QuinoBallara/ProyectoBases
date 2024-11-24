import React from 'react'
import "./styles.scss"

import Button from '../Button'
import { Link, useNavigate } from 'react-router-dom'

export const TopBar = () => {
    const navigate = useNavigate()
    return (
        <div className='topBar'>
            <div className='topBarTitle'>
                <img src="https://www.ucu.edu.uy/plantillas/images/logo_ucu.svg" alt="logo" className='logo' />
            </div>
            <div className='topBarNavs'>
                <nav>
                    <Link to='/'>
                        <p>Classes</p>
                    </Link>
                </nav>

                <nav>
                    <Link to='/activities'>
                        <p>Activities</p>
                    </Link>
                </nav>

                <nav>
                    <Link to='/shifts'>
                        <p>Shifts</p>
                    </Link>
                </nav>

                <nav>
                    <Link to='/students'>
                        <p>Students</p>
                    </Link>
                </nav>

                <nav>
                    <Link to='/instructors'>
                        <p>Instructors</p>
                    </Link>
                </nav>

                <nav>
                    <Link to='/equipment'>
                        <p>Equipment</p>
                    </Link>
                </nav>

                <nav>
                    <Link to='/revenues'>
                        <p>Revenues</p>
                    </Link>
                </nav>

                <nav>
                    <Link to='/enrollment'>
                        <p>Enrollment</p>
                    </Link>
                </nav>

                <nav>
                    <Link to='/attendance'>
                        <p>Attendance</p>
                    </Link>
                </nav>
            </div>

        </div>

    )
}
