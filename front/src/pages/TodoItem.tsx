import React, { useCallback } from "react";
import { todo } from "./Todos";
import { deleteTodo } from "../api";

function TodoItem({ content, title, id, onDelete }: todo) {
  const handleDelete = useCallback(() => {
    onDelete();
  }, [id, onDelete]);

  return (
    <li>
      <div>제목 : {title}</div>
      <span>컨텐츠 : {content}</span>
      <button onClick={handleDelete}>삭제</button>
      {/* <button onClick={}>수정</button> */}
    </li>
  );
}

export default TodoItem;
