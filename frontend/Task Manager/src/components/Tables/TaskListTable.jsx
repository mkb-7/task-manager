import React from 'react';
import moment from 'moment';

const statusStyles = {
  Completed: 'bg-green-100 text-green-600',
  Pending: 'bg-yellow-100 text-yellow-600',
  Inprogress: 'bg-cyan-100 text-cyan-600',
};

const priorityStyles = {
  High: 'bg-red-100 text-red-600',
  Medium: 'bg-orange-100 text-orange-600',
  Low: 'bg-green-100 text-green-600',
};

const TaskListTable = ({ tableData }) => {
  if (!tableData || tableData.length === 0) {
    return (
      <p className="text-sm text-gray-400 mt-4">No recent tasks found.</p>
    );
  }

  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full">
        <thead>
          <tr className="text-left">
            <th className="py-2 px-3 text-xs md:text-[13px] text-gray-500 font-medium">
              Name
            </th>
            <th className="py-2 px-3 text-xs md:text-[13px] text-gray-500 font-medium">
              Status
            </th>
            <th className="py-2 px-3 text-xs md:text-[13px] text-gray-500 font-medium">
              Priority
            </th>
            <th className="py-2 px-3 text-xs md:text-[13px] text-gray-500 font-medium hidden md:table-cell">
              Created On
            </th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((task) => (
            <tr key={task._id} className="border-t border-gray-200">
              <td className="py-3 px-3 text-sm text-gray-700 truncate max-w-[200px]">
                {task.title}
              </td>
              <td className="py-3 px-3">
                <span
                  className={`px-2 py-1 text-xs rounded-full font-medium ${
                    statusStyles[task.status] || 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {task.status}
                </span>
              </td>
              <td className="py-3 px-3">
                <span
                  className={`px-2 py-1 text-xs rounded-full font-medium ${
                    priorityStyles[task.priority] || 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {task.priority}
                </span>
              </td>
              <td className="py-3 px-3 text-sm text-gray-500 hidden md:table-cell">
                {task.createdAt
                  ? moment(task.createdAt).format('Do MMM YYYY')
                  : '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskListTable;