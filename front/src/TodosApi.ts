import { baseAxios } from "./api";
import { todo } from "./pages/Todos";

export async function createTodo({ todo }: any) {
  return baseAxios.post("/todos", todo, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}

export function deleteTodo(id: string | number) {
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
