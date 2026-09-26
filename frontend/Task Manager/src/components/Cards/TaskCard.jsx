import React from 'react';
import moment from 'moment';
import AvatarGroup from '../Cards/AvatarGroup';

const statusStyles = {
  Completed: 'bg-green-100 text-green-600',
  Pending: 'bg-yellow-100 text-yellow-600',
  'In Progress': 'bg-cyan-100 text-cyan-600',
};

const priorityStyles = {
  High: 'bg-red-100 text-red-600',
  Medium: 'bg-orange-100 text-orange-600',
  Low: 'bg-green-100 text-green-600',
};

const TaskCard = ({ task, onClick }) => {
  const completedCount =
    task.todoChecklist?.filter((item) => item.completed)?.length || 0;
  const totalCount = task.todoChecklist?.length || 0;
  const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const avatars = (task.assignedTo || [])
    .map((user) => (typeof user === 'string' ? '' : user.profileImageUrl))
    .filter(Boolean);

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl border border-gray-200/60 p-4 cursor-pointer hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between mb-2">
        <span
          className={`text-xs font-medium px-2 py-1 rounded-full ${
            statusStyles[task.status] || 'bg-gray-100 text-gray-600'
          }`}
        >
          {task.status}
        </span>
        <span
          className={`text-xs font-medium px-2 py-1 rounded-full ${
            priorityStyles[task.priority] || 'bg-gray-100 text-gray-600'
          }`}
        >
          {task.priority}
        </span>
      </div>

      <h3 className="text-sm font-medium text-gray-800 mb-1 truncate">
        {task.title}
      </h3>
      <p className="text-xs text-gray-500 mb-3 line-clamp-2">
        {task.description}
      </p>

      {totalCount > 0 && (
        <div className="mb-3">
          <div className="flex justify-between text-[11px] text-gray-500 mb-1">
            <span>
              Task Done: {completedCount}/{totalCount}
            </span>
            <span>{progress}%</span>
          </div>
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mt-3">
        <p className="text-[11px] text-gray-400">
          {task.dueDate
            ? `Due: ${moment(task.dueDate).format('Do MMM YYYY')}`
            : 'No due date'}
        </p>

        {avatars.length > 0 && (
          <AvatarGroup avatars={avatars} maxVisible={3} />
        )}
      </div>
    </div>
  );
};

export default TaskCard;