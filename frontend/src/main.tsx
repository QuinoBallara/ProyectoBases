import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

const App = () => (
  <ClassesProvider>
    <Router>
      <Routes>
        <Route path="/" element={<TopBarLayout />}>
          <Route index element={<Home />} />
          <Route path="shifts" element={<Shifts />} />
          <Route path="students" element={<Students />} />
          <Route path="instructors" element={<Instructors />} />
          <Route path="revenues" element={<Revenue />} />
          <Route path="enrollment" element={<Enrollment />} />
          <Route path="attendance" element={<Attendance />} />
        </Route>
      </Routes>
    </Router>
  </ClassesProvider>
);

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(<App />);
} else {
  console.error('Root element not found');
}
