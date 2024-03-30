import React, { useEffect, useRef, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete, MdDone } from "react-icons/md";

type TodoItemProps = {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const TodoItem: React.FC<TodoItemProps> = ({ todo, todos, setTodos }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string | number>(todo.todo);
  const handleDone = (id: number) => {
    setTodos(
      todos.map((item) =>
        item.id === id ? { ...todo, isDone: !todo.isDone } : item
      )
    );
  };
  const handleDelete = (id: number) => {
    setTodos(todos.filter((item) => item.id !== id));
  };
  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit(false);
  };
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);
  return (
    <form className="todo-item" onSubmit={(e) => handleEdit(e, todo.id)}>
      {edit ? (
        <input
          value={editTodo}
          ref={inputRef}
          onChange={(e) => setEditTodo(e.target.value)}
          className="edit-item"
        />
      ) : todo.isDone ? (
        <s className="todo-item-text">{todo.todo}</s>
      ) : (
        <span className="todo-item-text">{todo.todo}</span>
      )}

      {/* Icons */}
      <div>
        <span
          className="icon"
          role="button"
          onClick={() => {
            if (!edit && !todo.isDone) {
              setEdit(!edit);
            }
          }}
        >
          <FaEdit fontSize={20} />
        </span>
        <span
          className="icon"
          role="button"
          onClick={() => handleDelete(todo.id)}
        >
          <MdDelete fontSize={20} />
        </span>
        <span
          className="icon"
          role="button"
          onClick={() => handleDone(todo.id)}
        >
          <MdDone fontSize={20} />
        </span>
      </div>
    </form>
  );
};

export default TodoItem;
