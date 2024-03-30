type Actions =
  | { type: "ADD_TODO"; payload: string }
  | { type: "TODO_DONE"; payload: number }
  | { type: "DELETE_TODO"; payload: number };

const TodoReducerFunction = (state: Todo[], action: Actions): Todo[] => {
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        { id: Date.now(), todo: action.payload, isDone: false },
      ];
    case "DELETE_TODO":
      return state.filter((todo) => todo.id !== action.payload);

    case "TODO_DONE":
      return state.map((todo) =>
        todo.id === action.payload ? { ...todo, isDone: !todo.isDone } : todo
      );
    default:
      return state;
  }
};

export default TodoReducerFunction;
