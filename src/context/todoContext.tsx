import React, { createContext, FC, useState } from 'react';

export interface Todo {
  id: string;
  content: string;
  completed: boolean;
}

interface ITodoContext {
  todos: Todo[];
  filterValue: string;
  addTodo: (content: string) => void;
  toggleTodo: (id: string) => void;
  removeTodo: (id: string) => void;
  setFilterValue: (value: string) => void;
}

export const TodoContext = createContext<ITodoContext>({
  todos: [],
  filterValue: '',
  addTodo: () => {},
  toggleTodo: () => {},
  removeTodo: () => {},
  setFilterValue: () => {},
});

export const TodoContextProvider: FC = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([
    {
      content: 'Todo 1',
      completed: false,
      id: '1',
    },
    {
      content: 'Todo 2',
      completed: false,
      id: '2',
    },
    {
      content: 'Todo 3',
      completed: false,
      id: '3',
    },
    {
      content: 'Todo 4',
      completed: false,
      id: '4',
    },
    {
      content: 'Todo 5',
      completed: false,
      id: '5',
    },
    {
      content: 'Todo 6',
      completed: false,
      id: '6',
    },
  ]);

  const [filterValue, setFilterValue] = useState('');

  const addTodo = (content: string) => {
    setTodos([
      ...todos,
      {
        id: String(Math.random()),
        content,
        completed: false,
      },
    ]);
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const removeTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <TodoContext.Provider
      value={{
        todos: todos.filter(todo =>
          todo.content.toLowerCase().includes(filterValue.toLowerCase()),
        ),
        filterValue,
        addTodo,
        toggleTodo,
        removeTodo,
        setFilterValue,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
