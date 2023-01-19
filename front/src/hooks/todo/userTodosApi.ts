import { baseAxios } from "../../util/axios";
import { Todo } from "../../types/type";

const createTodo = async (Data: Record<string, string>) => {
  const res = await baseAxios.post(`/todos`, Data);
  return res.data.data;
};

const getTodo = async () => {
  const res = await baseAxios.get("/todos");
  return res.data.data;
};

const getTodoById = async (id: string) => {
  const res = await baseAxios.get(`/todos/${id}`);
  return res.data.data;
};

const deleteTodo = async (id: string) => {
  await baseAxios.delete(`/todos/${id}`);
};

const updateTodo = async (data: Todo) => {
  return await baseAxios.put(`/todos/${data.id}`, data);
};

export { createTodo, getTodo, getTodoById, deleteTodo, updateTodo };
