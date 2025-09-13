import React from "react";

export default function Loader({ size = 8 }) {
  return (
    <div className="flex items-center justify-center">
      <div className={`loader ease-linear rounded-full border-4 border-t-4 border-gray-200 dark:border-gray-700`} style={{ width: `${size}rem`, height: `${size}rem` }} />
      <style>{`
        .loader { border-top-color: #3490dc; animation: spin 1s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
