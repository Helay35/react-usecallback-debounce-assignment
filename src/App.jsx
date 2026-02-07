import { useState, useCallback, useEffect } from "react";
import TodosViewForm from "./TodosViewForm";

// ✅ MOCK DATA (replaces Airtable)
const MOCK_TODOS = [
  { id: 1, title: "Buy groceries", createdTime: "2026-01-01" },
  { id: 2, title: "Finish coding assignment", createdTime: "2026-01-02" },
  { id: 3, title: "Review React hooks", createdTime: "2026-01-03" },
  { id: 4, title: "Submit assignment", createdTime: "2026-01-04" },
];

function App() {
  const [todos, setTodos] = useState([]);
  const [queryString, setQueryString] = useState("");

  // ✅ REQUIRED: useCallback for URL encoding
  const encodeUrl = useCallback(() => {
    return queryString.toLowerCase();
  }, [queryString]);

  // ✅ Simulated fetch (filters mock data instead of API)
  useEffect(() => {
    const encodedQuery = encodeUrl();

    const filteredTodos = MOCK_TODOS.filter((todo) =>
      todo.title.toLowerCase().includes(encodedQuery)
    );

    setTodos(filteredTodos);
  }, [queryString, encodeUrl]);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Todo List</h1>

      <TodosViewForm
        queryString={queryString}
        setQueryString={setQueryString}
      />

      {todos.length === 0 ? (
        <p>No todos yet</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <strong>{todo.title}</strong> — {todo.createdTime}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
