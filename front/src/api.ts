import axios from "axios";
import { todo } from "./pages/Todos";

export const baseAxios = axios.create({
  baseURL: "http://localhost:8080",
  // withCredentials: true,
});

export async function createTodo(todo: Todo) {
  return baseAxios.post("/todos", todo, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}

export async function deleteTodo(id: string) {
  return await baseAxios.delete(`/todos/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}

export async function getTodos() {
  return await baseAxios.get("/todos", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}

export interface Todo {
  id: string;
  title: string;
  content: string;
}

export async function updateTodos(data: todo) {
  const total = { title: data.title, content: data.content };
  return await baseAxios.put(`/todos/${data.id}`, total, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}
