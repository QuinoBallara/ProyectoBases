import { TopBarLayout } from './pages/TopBarLayout';
import { Home } from './pages/Home';
import { ClassesProvider } from './contexts/classesContext';
import './index.css';
import Shifts from './pages/Shifts';
import Students from './pages/Students';
import Instructors from './pages/Instructors';
import Revenue from './pages/Revenue';
import Enrollment from './pages/Enrollment';
import Attendance from './pages/Attendance';
import { useAuth } from './contexts/authContext';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import { ModalProvider } from './contexts/modalContext';
import { Activities } from './pages/Activities';
import { Equipment } from './pages/Equipment';

export const App = () => {
    const { isAuthenticated } = useAuth();



    return (
        <Router>
            <ModalProvider>
                <ClassesProvider>
                    <Routes>
                        <Route path="/" element={isAuthenticated ? <TopBarLayout /> : <Navigate to='/login' />}>
                            <Route index element={<Home />} />
                            <Route path="home" element={<Home />} />
                            <Route path="shifts" element={<Shifts />} />
                            <Route path="students" element={<Students />} />
                            <Route path="instructors" element={<Instructors />} />
                            <Route path="equipment" element={<Equipment />} />
                            <Route path="revenues" element={<Revenue />} />
                            <Route path="enrollment" element={<Enrollment />} />
                            <Route path="attendance" element={<Attendance />} />
                            <Route path="activities" element={<Activities />} />
                        </Route>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Routes>
                </ClassesProvider>
            </ModalProvider>
        </Router>
    );
};