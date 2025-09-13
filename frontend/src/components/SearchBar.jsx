import React from "react";

export default function SearchBar({ value, onChange, placeholder = "Search..." }) {
  return (
    <div className="flex items-center gap-2">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="p-2 rounded border w-full bg-white dark:bg-gray-800 dark:border-gray-700"
      />
    </div>
  );
}
