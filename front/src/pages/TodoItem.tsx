import React, { useCallback } from "react";
import Button from "@mui/material/Button";
import { todo } from "./Todos";

function TodoItem({ content, title, id, onDelete }: todo) {
  const handleDelete = useCallback(() => {
    onDelete();
  }, [id, onDelete]);

  return (
    <li>
      <div>제목 : {title}</div>
      <span>컨텐츠 : {content}</span>
      <Button variant="outlined" onClick={handleDelete}>
        삭제
      </Button>
      {/* <button onClick={}>수정</button> */}
    </li>
  );
}

export default TodoItem;
