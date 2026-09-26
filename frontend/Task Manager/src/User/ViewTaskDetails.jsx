import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from '../components/layouts/DashboardLayout';
import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apipaths';
import moment from 'moment';
import AvatarGroup from '../components/Cards/AvatarGroup';
import { LuSquareArrowOutUpRight } from 'react-icons/lu';

const priorityStyles = {
  Low: 'text-green-600',
  Medium: 'text-orange-600',
  High: 'text-red-600',
};

const ViewTaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);

  const getTaskDetailsByID = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.TASKS.GET_TASK_BY_ID(id));
      if (response.data) {
        setTask(response.data);
      }
    } catch (error) {
      console.error('Error fetching task:', error);
    }
  };

  const updateTodoChecklist = async (index) => {
    const todoChecklist = [...(task?.todoChecklist || [])];
    if (!todoChecklist[index]) return;

    todoChecklist[index].completed = !todoChecklist[index].completed;

    try {
      const response = await axiosInstance.put(
        API_PATHS.TASKS.UPDATE_TODO_CHECKLIST(id),
        { todoChecklist }
      );
      if (response.status === 200) {
        setTask((prev) => ({ ...prev, todoChecklist }));
      }
    } catch (error) {
      console.error('Error updating checklist:', error);
      // revert on failure
      getTaskDetailsByID();
    }
  };

  useEffect(() => {
    if (id) {
      getTaskDetailsByID();
    }
    return () => {};
  }, [id]);

  if (!task) {
    return (
      <DashboardLayout activeMenu="My Tasks">
        <div className="mt-5 text-sm text-gray-400">Loading task details...</div>
      </DashboardLayout>
    );
  }

  const avatars = (task.assignedTo || [])
    .map((user) => (typeof user === 'string' ? '' : user.profileImageUrl))
    .filter(Boolean);

  return (
    <DashboardLayout activeMenu="My Tasks">
      <div className="mt-5">
        <div className="form-card">
          <h2 className="text-xl font-medium">{task.title}</h2>

          <div className="mt-4">
            <p className="text-xs font-medium text-slate-500">Description</p>
            <p className="text-sm text-gray-700 mt-1">{task.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-5">
            <div>
              <p className="text-xs font-medium text-slate-500">Priority</p>
              <p className={`text-sm font-medium mt-1 ${priorityStyles[task.priority] || 'text-gray-700'}`}>
                {task.priority}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium text-slate-500">Due Date</p>
              <p className="text-sm text-gray-700 mt-1">
                {task.dueDate ? moment(task.dueDate).format('Do MMM YYYY') : '-'}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium text-slate-500">Assigned To</p>
              <div className="mt-1">
                {avatars.length > 0 ? (
                  <AvatarGroup avatars={avatars} maxVisible={5} />
                ) : (
                  <p className="text-sm text-gray-400">Unassigned</p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-xs font-medium text-slate-500 mb-2">Todo Checklist</p>
            <div className="space-y-2">
              {(task.todoChecklist || []).map((item, index) => (
                <label
                  key={index}
                  className="flex items-center gap-3 text-sm text-gray-700 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => updateTodoChecklist(index)}
                    className="w-4 h-4 accent-primary"
                  />
                  <span className={item.completed ? 'line-through text-gray-400' : ''}>
                    {item.text}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {task.attachments?.length > 0 && (
            <div className="mt-6">
              <p className="text-xs font-medium text-slate-500 mb-2">Attachments</p>
              <div className="space-y-2">
                {task.attachments.map((link, index) => (
                  <a
                    key={index}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between bg-gray-50 border border-gray-100 px-3 py-2 rounded-md hover:bg-gray-100"
                  >
                    <span className="text-sm text-gray-700 flex items-center gap-2">
                      <span className="text-xs text-gray-400">
                        {index < 9 ? `0${index + 1}` : index + 1}
                      </span>
                      {link}
                    </span>
                    <LuSquareArrowOutUpRight className="text-gray-400" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ViewTaskDetails;