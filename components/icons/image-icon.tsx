import React from "react";

export const ImageIcon = ({ className = "" }) => {
  return (
    <svg
      className={`w-12 h-12 text-gray-400 ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M21 5V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H19C20.1 3 21 3.9 21 5ZM5 5V19H19V5H5ZM7 15L10 11L13 15L16 12L19 16H7Z" />
    </svg>
  );
};
