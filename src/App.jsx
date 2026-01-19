import { useState, useEffect } from "react";
import TodoList from "./components/TodoList";

const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
const token = `Bearer ${import.meta.env.VITE_PAT}`;

export default function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch todos from Airtable
  const fetchTodos = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(url, { headers: { Authorization: token } });
      if (!res.ok) throw new Error("Failed to fetch todos");
      const data = await res.json();

      const fetchedTodos = data.records.map((record) => ({
        id: record.id,
        title: record.fields.title || "",
        done: record.fields.done || false,
      }));

      setTodos(fetchedTodos);
    } catch (err) {
      console.error(err);
      setErrorMessage(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Add new todo
  const addTodo = async () => {
    if (!newTodo.trim()) return;
    try {
      setIsSaving(true);
      const payload = { records: [{ fields: { title: newTodo.trim(), done: false } }] };
      const res = await fetch(url, {
        method: "POST",
        headers: { Authorization: token, "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to add todo");

      const { records } = await res.json();
      const savedTodo = {
        id: records[0].id,
        title: records[0].fields.title || "",
        done: records[0].fields.done || false,
      };
      setTodos([...todos, savedTodo]);
      setNewTodo("");
    } catch (err) {
      console.error(err);
      setErrorMessage(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  // Update todo (edit title or toggle done)
  const updateTodo = async (editedTodo) => {
    const originalTodo = todos.find((t) => t.id === editedTodo.id);
    setTodos(todos.map((t) => (t.id === editedTodo.id ? editedTodo : t)));

    try {
      const payload = {
        records: [{ id: editedTodo.id, fields: { title: editedTodo.title, done: editedTodo.done } }],
      };
      const res = await fetch(url, {
        method: "PATCH",
        headers: { Authorization: token, "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to update todo");
    } catch (err) {
      console.error(err);
      setErrorMessage(`${err.message}. Reverting todo...`);
      setTodos(todos.map((t) => (t.id === originalTodo.id ? originalTodo : t)));
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>My Airtable Todo App</h1>

      <input
        type="text"
        placeholder="New todo..."
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        disabled={isSaving}
      />
      <button onClick={addTodo} disabled={isSaving || !newTodo.trim()}>
        {isSaving ? "Saving..." : "Add Todo"}
      </button>

      {isLoading && <p>Loading todos...</p>}

      {errorMessage && (
        <div style={{ color: "red", marginTop: "1rem" }}>
          <p>{errorMessage}</p>
          <button onClick={() => setErrorMessage("")}>Dismiss</button>
        </div>
      )}

      <TodoList todos={todos} updateTodo={updateTodo} />
    </div>
  );
}
