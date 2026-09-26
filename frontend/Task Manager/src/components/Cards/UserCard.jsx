import React from 'react';

const UserCard = ({ userInfo }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200/60 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img
          src={userInfo?.profileImageUrl}
          alt={userInfo?.name}
          className="w-12 h-12 rounded-full border border-gray-200 object-cover"
        />
        <div>
          <p className="text-sm font-medium">{userInfo?.name}</p>
          <p className="text-xs text-gray-500">{userInfo?.email}</p>
        </div>
      </div>
      </div>

      <div className="flex items-end gap-3 mt-5">
        <StatCard
          label="Pending"
          count={userInfo?.pendingTasks || 0}
          status="Pending"
        />
        <StatCard
          label="In Progress"
          count={userInfo?.inProgressTasks || 0}
          status="In Progress"
        />
        <StatCard
          label="Completed"
          count={userInfo?.completedTasks || 0}
          status="Completed"
        />
      </div>
    </div>
  );
};

export default UserCard;

const statusStyles = {
  Pending: 'bg-yellow-100 text-yellow-600',
  'In Progress': 'bg-cyan-100 text-cyan-600',
  Completed: 'bg-green-100 text-green-600',
};

const StatCard = ({ label, count, status }) => {
  return (
    <div className="flex flex-col items-center flex-1">
      <span
        className={`text-sm font-semibold w-8 h-8 flex items-center justify-center rounded-full ${
          statusStyles[status] || 'bg-gray-100 text-gray-600'
        }`}
      >
        {count}
      </span>
      <span className="text-[11px] text-gray-500 mt-1">{label}</span>
    </div>
  );
};