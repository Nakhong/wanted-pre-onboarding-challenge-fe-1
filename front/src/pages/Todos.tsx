import React, { useState, useRef, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { baseAxios, deleteTodo, getTodos, updateTodos } from "../api";
import TodoItem from "../components/TodoItem";
import Container from "@mui/material/Container";

export interface todo {
  title?: string;
  content?: string;
  id: string;
  onDelete(): void;
  onUpdate: (data: any) => void;
  todoList?: any;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

function Todos() {
  const nav = useNavigate();
  const titleRef = useRef<HTMLInputElement>(null);
  const contentsRef = useRef<HTMLInputElement>(null);
  const [todolist, setTodolist] = useState<todo[]>([]);
  const [edit, setEdit] = useState<boolean>(true);
  const token = localStorage.getItem("token");

  // useEffect(() => {
  //   if (!token) {
  //     window.location.href = "/auth/login";
  //   }
  // }, []);

  // get
  useEffect(() => {
    getTodos().then((res) => {
      const data: todo[] = res.data.data;
      setTodolist(data);
    });
  }, [edit]);

  // delete
  const onDelete = (id: string) => {
    setTodolist((prev) => prev.filter((todo) => todo.id !== id));
    deleteTodo(id);
  };

  const handleLogout = () => {
    localStorage.clear();
    nav("/");
  };

  // post
  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const title = titleRef.current!.value;
      const content = contentsRef.current!.value;
      const data = { title, content };

      const newTodo: todo = await baseAxios
        .post("/todos", data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          return res.data.data;
        });
      setTodolist([...todolist, newTodo]);
      titleRef.current!.value = "";
      contentsRef.current!.value = "";
    },
    [todolist]
  );

  // update
  const onUpdate = useCallback((todo: todo) => {
    setTodolist((prev: todo[]) =>
      prev.map((item: todo) => (item.id === todo.id ? { ...item, todo } : item))
    );
    setEdit(!edit);
    updateTodos(todo);
  }, []);

  return (
    <Container maxWidth="sm">
      <div>
        <h1>Todo List</h1>
        <button onClick={handleLogout}>로그아웃</button>
      </div>
      <form onSubmit={onSubmit}>
        <input ref={titleRef} type="text" id="todoInput" placeholder="할일" />
        <input type="text" placeholder="자세한 내용" ref={contentsRef} />
        <button type="submit">추가</button>
      </form>
      <ul>
        {todolist.map((todo) => {
          return (
            <div>
              <TodoItem
                key={todo.id}
                {...todo}
                todoList={todo}
                onDelete={() => onDelete(todo.id)}
                onUpdate={onUpdate}
                setEdit={setEdit}
              ></TodoItem>
            </div>
          );
        })}
      </ul>
    </Container>
  );
}

export default Todos;
