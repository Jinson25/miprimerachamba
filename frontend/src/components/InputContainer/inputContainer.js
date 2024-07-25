import React from "react";

export default function InputContainer({ label, bgColor, children }) {
  return (
    <div>
      <label className="block text-gray-600 text-sm font-medium absolute top-2  bg-white px-1">
        {label}
      </label>
      <div
        className={`mb-4 rounded border border-gray-300 text-center p-2 ${bgColor}`}
      >
        <div className="text-center">{children}</div>
      </div>
    </div>
  );
}
