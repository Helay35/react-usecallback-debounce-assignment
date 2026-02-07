import { useState, useEffect } from "react";

function TodosViewForm({ queryString, setQueryString }) {
  // ✅ Local state for debouncing
  const [localQueryString, setLocalQueryString] = useState(queryString);

  // ✅ REQUIRED: Debounce input (500ms)
  useEffect(() => {
    const debounce = setTimeout(() => {
      setQueryString(localQueryString);
    }, 500);

    return () => clearTimeout(debounce);
  }, [localQueryString, setQueryString]);

  return (
    <div style={{ marginBottom: "1rem" }}>
      <label>
        Search:{" "}
        <input
          type="text"
          value={localQueryString}
          onChange={(e) => setLocalQueryString(e.target.value)}
        />
      </label>

      <button
        style={{ marginLeft: "0.5rem" }}
        onClick={() => setLocalQueryString("")}
      >
        Clear
      </button>
    </div>
  );
}

export default TodosViewForm;
