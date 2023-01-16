import axios from "axios";
import { Todo } from "./types/type";

const baseAxios = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

async function createTodo(todo: Record<string, string>) {
  return baseAxios.post("/todos", todo);
}

async function deleteTodo(id: string) {
  return await baseAxios.delete(`/todos/${id}`);
}

async function getTodos() {
  return await baseAxios.get("/todos");
}

async function getTodosId() {
  return await baseAxios.get("/todos");
}

async function updateTodos(data: Todo) {
  const total = { title: data.title, content: data.content };
  return await baseAxios.put(`/todos/${data.id}`, total);
}

export { baseAxios, createTodo, deleteTodo, getTodos, updateTodos, getTodosId };
