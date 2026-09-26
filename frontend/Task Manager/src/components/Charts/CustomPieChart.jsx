import React from 'react';
import { PieChart, 
  Pie,
  Cell, 
  Tooltip, 
  ResponsiveContainer, 
  Legend,
 } from 'recharts';
import CustomTooltip from './CustomTooltip';
import CustomLegend from './CustomLegend';

// data: [{ status: "Pending", count: 3 }, ...]
// colors: array of hex strings, one per slice
const CustomPieChart = ({ data, colors }) => {
  const hasData = Array.isArray(data) && data.some((d) => d.count > 0);

  if (!hasData) {
    return (
      <div className="flex items-center justify-center h-[300px] text-sm text-gray-400">
        No data to display
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer width="100%" height={325}>
        <PieChart>
          <Pie
            data={data}
            dataKey="count"
            nameKey="status"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            labelLine={false}
            paddingAngle={2}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors?.[index % colors.length] || '#8884d8'} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip/>} />
          <Legend content={<CustomLegend />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomPieChart;