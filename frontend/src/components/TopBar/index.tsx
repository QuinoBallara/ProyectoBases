import React from 'react';
import "./styles.scss";
import Button from '../Button';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';

export const TopBar = () => {
    const navigate = useNavigate();
    const { setAuthData, setIsAuthenticated } = useAuth();

    const handleLogOut = () => {
        setAuthData({ isAuthenticated: false, token: '' });
        setIsAuthenticated(false);
        navigate('/login');
    };

    return (
        <div className='topBar'>
            <div className='topBarTitle'>
                <img
                    src="https://www.ucu.edu.uy/plantillas/images/logo_ucu.svg"
                    alt="UCU Logo"
                    className='logo'
                />
            </div>
            <div className='topBarNavs'>
                {[
                    { path: '/', label: 'Classes' },
                    { path: '/activities', label: 'Activities' },
                    { path: '/shifts', label: 'Shifts' },
                    { path: '/students', label: 'Students' },
                    { path: '/instructors', label: 'Instructors' },
                    { path: '/equipment', label: 'Equipment' },
                    { path: '/revenues', label: 'Revenue' },
                    { path: '/enrollment', label: 'Enrollment' },
                    { path: '/attendance', label: 'Attendance' },
                ].map((item) => (
                    <nav key={item.path}>
                        <Link to={item.path}>
                            <p>{item.label}</p>
                        </Link>
                    </nav>
                ))}
                <nav className="logOutButton">
                    <Button
                        label="Log Out"
                        onClick={handleLogOut}
                        className="log-out"
                    />
                </nav>
            </div>
        </div>
    );
};
