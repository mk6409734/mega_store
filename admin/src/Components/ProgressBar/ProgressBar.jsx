import React from "react";

export const ProgressBar = ({ value, type }) => {
  const clamped = Math.max(0, Math.min(100, Number(value) || 0));
  const colorClass =
    type === "success"
      ? "bg-green-500"
      : type === "warning"
      ? "bg-yellow-500"
      : type === "error"
      ? "bg-red-500"
      : "bg-blue-500";
  return (
    <div className="w-24 h-auto overflow-hidden rounded-md bg-gray-200">
      <span
        className={`block h-2 ${colorClass}`}
        style={{ width: `${clamped}%` }}
      ></span>
    </div>
  );
};
