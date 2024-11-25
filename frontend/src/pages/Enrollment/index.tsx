import React from 'react';
import { useClasses } from '../../contexts/classesContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import './styles.scss';

const Enrollment: React.FC = () => {
  const { enrollment } = useClasses();

  const maxStudents = Math.max(...enrollment.map(row => row.total_students));

  // Transform data for the chart
  const chartData = enrollment.map(row => ({
    id: row.activity_id,
    description: row.description,
    students: row.total_students,
  }));

  return (
    <div className="chart-container">
      <h2>Enrollment Overview</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" allowDecimals={false} domain={[0, maxStudents]}/>
          <YAxis dataKey="description" type="category" width={200} />
          <Tooltip />
          <Bar dataKey="students" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Enrollment;
