

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
                <th>Attendance</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((row) => (
                <tr key={row.shift_id}>
                  <td>{row.shift_id}</td>
                  <td>{row.shift_name}</td>
                  <td>{row.total_classes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    };

export default Attendance;