import React from 'react';
import { useClasses } from '../../contexts/classesContext';
import './styles.scss';

const Enrollment: React.FC = () => {
  const { enrollment } = useClasses();
  return (
    <div className="table-container">
      <table className="enrollment-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Description</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {enrollment.map((row) => (
            <tr key={row.activity_id}>
              <td>{row.activity_id}</td>
              <td>{row.description}</td>
              <td>{row.total_students}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Enrollment;