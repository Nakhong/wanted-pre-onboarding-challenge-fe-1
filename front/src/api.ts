import axios from "axios";

export const baseAxios = axios.create({
  baseURL: "http://localhost:8080",
  // withCredentials: true,
});

export async function createTodo({ todo }: any) {
  return baseAxios.post("/todos", todo, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}

export function deleteTodo(id: string) {
  return baseAxios.delete(`/todos/${id}`, {
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
