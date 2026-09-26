import React from 'react';

// data: [{ status: "Pending", count: 3 }, ...]
// colors: array of hex strings, one per slice
const CustomTooltip = ({ active, payload }) => {
  if(active && payload && payload.length) {
    return (
      <div className="flex items-center justify-center h-[300px] text-sm text-gray-400">
      <p className="text-xs font-semibold text-purple-800 mb-1">{payload[0].name}</p>
      <p className="text-sm text-gray-600">
        Count: <span className="text-sm font-medium text-gray-900">{payload[0].name}</span>
      </p>
      </div>
    );
  }
 return null;
}

export default CustomTooltip;