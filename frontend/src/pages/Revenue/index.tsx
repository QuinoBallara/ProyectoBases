

import React, { useEffect } from 'react';
import { useClasses } from '../../contexts/classesContext';
import './styles.scss';
import { activityRevenue } from '../../api/views';

const Revenue: React.FC = () => {

  const { revenues } = useClasses();

  return (
    <div className="table-container">
      <table className="revenue-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Description</th>
            <th>Revenue ($)</th>
          </tr>
        </thead>
        <tbody>
          {revenues.map((row) => (
            <tr key={row.activity_id}>
              <td>{row.activity_id}</td>
              <td>{row.description}</td>
              <td>{row.revenue.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Revenue;