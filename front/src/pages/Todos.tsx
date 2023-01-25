import React, { useRef, useCallback } from "react";
import TodoItem from "../components/todo/TodoItem";
import { Todo } from "../types/type";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Form, TodoContainer, TodosUl } from "../styles/FormStyled";
import TodoMutation from "../hooks/todo/mutation/mutation";
import useUserTodoList from "../hooks/todo/queries/query";
import { HandleLogout } from "../util/isLogout";

function Todos() {
  const titleRef = useRef<HTMLInputElement>(null);
  const contentsRef = useRef<HTMLInputElement>(null);
  const { createMutations } = TodoMutation();
  const { Todo, status } = useUserTodoList();

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const data = {
        title: titleRef.current!.value,
        content: contentsRef.current!.value,
      };
      createMutations(data);
      titleRef.current!.value = "";
      contentsRef.current!.value = "";
    },
    [createMutations]
  );

  if (status === "loading") {
    return <div>Loading</div>;
  }
  if (status === "error") {
    return <div>Error</div>;
  }

  return (
    <TodoContainer>
      <div>
        <h1>Todo List</h1>
        <Button fullWidth onClick={HandleLogout}>
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
        {Todo.map((todo: Todo) => {
          return (
            <div>
              <TodoItem
                key={todo.id}
                title={todo.title}
                content={todo.content}
                id={todo.id}
              ></TodoItem>
            </div>
          );
        })}
      </TodosUl>
    </TodoContainer>
  );
}

export default Todos;
