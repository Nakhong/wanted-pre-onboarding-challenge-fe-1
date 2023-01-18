import React, { useState, useRef, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createTodo, deleteTodo, getTodos, updateTodos } from "../api";
import TodoItem from "../components/todo/TodoItem";
import { Todo, todoItems } from "../types/type";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Form, TodoContainer, TodosUl } from "../styles/FormStyled";

function Todos() {
  const nav = useNavigate();
  const titleRef = useRef<HTMLInputElement>(null);
  const contentsRef = useRef<HTMLInputElement>(null);
  const [todolist, setTodolist] = useState<todoItems[]>([]);
  const [edit, setEdit] = useState<boolean>(true);

  // get
  useEffect(() => {
    getTodos().then((res) => {
      const data: todoItems[] = res.data.data;
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
    nav("/auth/login");
  };

  // post
  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const title = titleRef.current!.value;
      const content = contentsRef.current!.value;
      const data = { title, content };
      await createTodo(data).then((res) => {
        const newTodo = res.data.data;
        setTodolist([...todolist, newTodo]);
      });
      titleRef.current!.value = "";
      contentsRef.current!.value = "";
    },
    [todolist]
  );

  // update
  const onUpdate = useCallback((todo: Todo) => {
    setTodolist((prev: todoItems[]) =>
      prev.map((item: todoItems) =>
        item.id === todo.id ? { ...item, todo } : item
      )
    );
    setEdit(!edit);
    updateTodos(todo);
  }, []);

  return (
    <TodoContainer>
      <div>
        <h1>Todo List</h1>
        <Button fullWidth onClick={handleLogout}>
          로그아웃
        </Button>
      </div>
      <Form onSubmit={onSubmit}>
        <TextField
          inputRef={titleRef}
          autoFocus
          margin="dense"
          id="content"
          label="할일"
          type="text"
          fullWidth
          variant="standard"
        />
        <TextField
          inputRef={contentsRef}
          autoFocus
          margin="dense"
          id="content"
          label="자세한 내용"
          type="text"
          fullWidth
          variant="standard"
        />
        <Button type="submit">추가</Button>
      </Form>
      <TodosUl>
        {todolist.map((todo) => {
          return (
            <div>
              <TodoItem
                key={todo.id}
                {...todo}
                todoList={todo}
                onDelete={onDelete}
                onUpdate={onUpdate}
                setEdit={setEdit}
              ></TodoItem>
            </div>
          );
        })}
      </TodosUl>
    </TodoContainer>
  );
}

export default Todos;
