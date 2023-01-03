import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Todos() {
  const nav = useNavigate();
  const [todos, setTodos] = useState();

  const handleLogout = () => {
    localStorage.clear();
    nav("/");
  };

  return (
    <div>
      <button onClick={handleLogout}>로그아웃</button>
      <h1>Todo List</h1>
      <input type="text" />
      <button type="button">추가</button>
    </div>
  );
}

export default Todos;
