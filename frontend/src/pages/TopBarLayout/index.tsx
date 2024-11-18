import React from 'react';
import { Outlet } from 'react-router-dom';
import { TopBar } from '../../components/TopBar';
import './styles.scss';

export const TopBarLayout = () => (
  <div className="top-bar-layout">
    <TopBar />
    <main className="content">
      <Outlet />
    </main>
  </div>
);
