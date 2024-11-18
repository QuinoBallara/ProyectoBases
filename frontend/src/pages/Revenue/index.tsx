

import React from 'react';
import { useClasses } from '../../contexts/classesContext';
import './styles.scss';

const Revenue: React.FC = () => {
    const {revenues} = useClasses();
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
                <tr key={row.id}>
                  <td>{row.id}</td>
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