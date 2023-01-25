import { useQuery } from "react-query";
import { getTodo } from "../userTodosApi";

function useUserTodoList() {
  const { data: Todo, status } = useQuery("todos", getTodo);

  return { Todo, status };
}
export default useUserTodoList;
