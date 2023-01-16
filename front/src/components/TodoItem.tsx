import React, { useCallback, useState } from "react";
import Button from "@mui/material/Button";
import styled from "styled-components";
import FormDialog from "./FormDialog";
import { todoItems } from "../types/type";

function TodoItem({
  content,
  title,
  id,
  onDelete,
  onUpdate,
  todoList,
  setEdit,
}: todoItems) {
  const handleDelete = useCallback(() => {
    if (window.confirm("정말 삭제 하시겠습니까 ?")) {
      onDelete(id);
    }
  }, [id, onDelete]);

  return (
    <div>
      <li>
        <div>할일 : {title}</div>
        <ButtonCon>
          <span>자세한 내용 : {content}</span>
          <Button variant="outlined" onClick={handleDelete}>
            삭제
          </Button>
          <FormDialog
            id={id}
            title={title}
            content={content}
            onUpdate={onUpdate}
            todoList={todoList}
            onDelete={onDelete}
            setEdit={setEdit}
          />
        </ButtonCon>
      </li>
    </div>
  );
}

export default TodoItem;

const ButtonCon = styled.div`
  display: flex;
`;
