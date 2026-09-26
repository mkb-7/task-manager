import React from 'react';

const AvatarGroup = ({ avatars, maxVisible = 3 }) => {
  const validAvatars = avatars.filter(Boolean);

  return (
    <div className="flex items-center">
      {validAvatars.slice(0, maxVisible).map((avatar, index) => (
        <img
          key={index}
          src={avatar}
          alt={`avatar ${index}`}
          className="w-9 h-9 rounded-full border-2 border-white -ml-3 first:ml-0"
        />
      ))}
      {validAvatars.length > maxVisible && (
        <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 text-sm font-medium text-gray-600 border-2 border-white -ml-3">
          +{validAvatars.length - maxVisible}
        </div>
      )}
    </div>
  );
};

export default AvatarGroup;