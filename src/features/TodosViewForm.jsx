import React, { useState, useEffect } from "react";

const TodosViewForm = ({ 
  sortField, 
  setSortField, 
  sortDirection, 
  setSortDirection, 
  queryString, 
  setQueryString 
}) => {
  const [localQueryString, setLocalQueryString] = useState(queryString);

  useEffect(() => {
    const debounce = setTimeout(() => {
      setQueryString(localQueryString);
    }, 500);

    return () => clearTimeout(debounce);
  }, [localQueryString, setQueryString]);

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="search">Search: </label>
      <input
        id="search"
        type="text"
        value={localQueryString}
        onChange={(e) => setLocalQueryString(e.target.value)}
      />

      <button 
        type="button" 
        onClick={() => setLocalQueryString("")}
      >
        Clear
      </button>

      <div style={{ marginTop: "10px" }}>
        <label>Sort By: </label>
        <select value={sortField} onChange={(e) => setSortField(e.target.value)}>
          <option value="createdTime">Created Time</option>
          <option value="title">Title</option>
        </select>

        <select value={sortDirection} onChange={(e) => setSortDirection(e.target.value)}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </form>
  );
};

export default TodosViewForm;
