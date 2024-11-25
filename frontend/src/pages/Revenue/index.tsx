
import React from 'react';

import { useClasses } from '../../contexts/classesContext';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import './styles.scss';

const Revenue: React.FC = () => {
  const { revenues } = useClasses();


  const maxRevenue = Math.max(...revenues.map(row => row.revenue));


  const chartData = revenues.map(row => ({
    id: row.activity_id,
    description: row.description,
    revenue: row.revenue,
    remaining: maxRevenue - row.revenue, 
  }));

  return (
    <div className="chart-container">
      <h2>Revenue Overview</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            type="number" 
            domain={[0, maxRevenue]} 
            allowDecimals={false} 
          />
          <YAxis dataKey="description" type="category" width={200} />
          <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
          <Bar dataKey="revenue" fill="#82ca9d" stackId="a" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Revenue;
