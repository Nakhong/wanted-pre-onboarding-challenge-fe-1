import React from "react";
import { todo } from "./Todos";

function TodoItem({ content, title }: todo) {
  return (
    <li>
      <div>제목 : {title}</div>
      <span>컨텐츠 : {content}</span>
    </li>
  );
}

export default TodoItem;
