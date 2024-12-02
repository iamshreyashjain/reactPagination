import React, { useState } from "react";
import './App.css'

export const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const [current, setCurrent] = useState(currentPage || 1);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrent(page);
    onPageChange(page);
  };

  const renderPages = () => {
    const pages = [];

    if (totalPages <= 7) {
      // Show all pages if total pages <= 7
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1); // First page
      if (current > 4) pages.push("..."); // Ellipsis before middle pages

      const start = Math.max(2, current - 1);
      const end = Math.min(totalPages - 1, current + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (current < totalPages - 3) pages.push("..."); // Ellipsis after middle pages
      pages.push(totalPages); // Last page
    }

    return pages.map((page, index) =>
      page === "..." ? (
        <span key={index} className="pagination-ellipsis">
          ...
        </span>
      ) : (
        <button
          key={index}
          className={`pagination-page ${page === current ? "active" : ""}`}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      )
    );
  };

  return (
    <div className="pagination">
      <button
        className="pagination-button"
        disabled={current === 1}
        onClick={() => handlePageChange(current - 1)}
      >
        Previous
      </button>
      {renderPages()}
      <button
        className="pagination-button"
        disabled={current === totalPages}
        onClick={() => handlePageChange(current + 1)}
      >
        Next
      </button>
    </div>
  );
};

// Example usage
export default function App() {
  const totalPages = 77;

  const handlePageChange = (page) => {
    console.log("Current Page:", page);
  };

  return (
    <div className="App">
      <h1>Pagination Example</h1>
      <Pagination totalPages={totalPages} currentPage={1} onPageChange={handlePageChange} />
    </div>
  );
}
