import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t p-4 text-center text-sm text-gray-600 dark:text-gray-400">
      © {new Date().getFullYear()} AlumniConnect — Built for college projects
    </footer>
  );
}
