import React from "react";

const TodoList = ({ todos }) => {
  return (
    <ul>
      {todos && todos.length > 0 ? (
        todos.map((todo) => (
          <li key={todo.id}>{todo.fields?.title || "Untitled Todo"}</li>
        ))
      ) : (
        <li>No todos yet</li>
      )}
    </ul>
  );
};

export default TodoList;
