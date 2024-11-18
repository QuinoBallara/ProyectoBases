

import React from 'react';
import { useClasses } from '../../contexts/classesContext';
import './styles.scss';

const Enrollment: React.FC = () => {
    const {enrollment} = useClasses();
    return (
        <div className="table-container">
          <table className="enrollment-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Description</th>
                <th>Revenue ($)</th>
              </tr>
            </thead>
            <tbody>
              {enrollment.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.description}</td>
                  <td>{row.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    };

export default Enrollment;