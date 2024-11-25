import React from 'react';
import { useClasses } from '../../contexts/classesContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import './styles.scss';

const Attendance: React.FC = () => {
  const { attendance } = useClasses();
  const maxClasses= Math.max(...attendance.map(row => row.total_classes));


  const chartData = attendance.map(row => ({
    id: row.shift_id,
    shift: row.shift_name,
    classes: row.total_classes,
  }));

  return (
    <div className="chart-container">
      <h2 className="chart-title">Attendance Overview</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" allowDecimals={false} domain={[0, maxClasses]}/>
          <YAxis dataKey="shift" type="category" width={150} />
          <Tooltip />
          <Bar dataKey="classes" fill="#ff7043" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Attendance;
