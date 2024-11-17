import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Home } from './pages/Home';
import { ClassesProvider } from './contexts/classesContext';

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <ClassesProvider>
      <Home />
    </ClassesProvider>
  );
} else {
  console.error('Root element not found');
}
