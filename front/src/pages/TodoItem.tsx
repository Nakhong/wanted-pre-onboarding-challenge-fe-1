import React, { useCallback, useState } from "react";
import Button from "@mui/material/Button";
import { todo } from "./Todos";
import FormDialog from "../components/FormDialog";
import styled from "styled-components";

function TodoItem({ content, title, id, onDelete, onUpdate, todoList }: todo) {
  const handleDelete = useCallback(() => {
    onDelete();
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
            todoItem={todoList}
          />
        </ButtonCon>
      </li>
    </div>
  );
}

export default TodoItem;
//  수정하기 누르면 모달로 input 2개 나오고 수정하기 누르면

const ButtonCon = styled.div`
  display: flex;
`;
