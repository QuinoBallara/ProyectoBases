import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app';
import { AuthProvider } from './contexts/authContext';


const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
    </StrictMode>,
  );
} else {
  console.error('Failed to find the root element');
}