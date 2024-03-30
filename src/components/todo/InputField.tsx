import { useRef } from "react";
import "./styles.css";

interface InputFieldProps {
  todo: string | number;
  setTodo: React.Dispatch<React.SetStateAction<string | number>>;
  handleAdd: (e: React.FormEvent) => void;
}

export const InputField: React.FC<InputFieldProps> = ({
  todo,
  setTodo,
  handleAdd,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      className="input"
      onSubmit={(e) => {
        handleAdd(e);
        inputRef.current?.blur();
      }}
    >
      <input
        type="text"
        ref={inputRef}
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder="Enter a task"
        className="input-box"
      />
      <button type="submit" className="submit-btn">
        Go
      </button>
    </form>
  );
};
