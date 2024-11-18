

import React from 'react';
import { useClasses } from '../../contexts/classesContext';
import './styles.scss';

const Attendance: React.FC = () => {
    const {attendance} = useClasses();
    return (
        <div className="table-container">
          <table className="attendance-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Shift</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.shift}</td>
                  <td>{row.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    };

export default Attendance;