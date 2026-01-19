import { useState, useEffect } from "react";

export default function TodoList({ todos, updateTodo }) {
  if (!todos.length) return <p>No todos yet!</p>;

  return (
    <ul style={{ padding: 0, listStyle: "none" }}>
      {todos.map((todo) => (
        <TodoListItem key={todo.id} todo={todo} updateTodo={updateTodo} />
      ))}
    </ul>
  );
}

function TodoListItem({ todo, updateTodo }) {
  const [workingTitle, setWorkingTitle] = useState(todo.title);

  useEffect(() => {
    setWorkingTitle(todo.title);
  }, [todo.title]);

  const toggleDone = () => updateTodo({ ...todo, done: !todo.done });

  const handleBlur = () => {
    if (workingTitle !== todo.title) updateTodo({ ...todo, title: workingTitle });
  };

  return (
    <li style={{ marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <input type="checkbox" checked={todo.done} onChange={toggleDone} />
      <input
        type="text"
        value={workingTitle}
        onChange={(e) => setWorkingTitle(e.target.value)}
        onBlur={handleBlur}
        style={{
          textDecoration: todo.done ? "line-through" : "none",
          border: "1px solid #ccc",
          borderRadius: "4px",
          padding: "0.25rem",
          flex: 1,
        }}
      />
    </li>
  );
}
