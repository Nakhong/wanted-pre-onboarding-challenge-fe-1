import { useMutation, useQueryClient } from "react-query";
import { createTodo } from "../userTodosApi";
import { Todo } from "../../../types/type";
import { deleteTodo, updateTodo } from "../userTodosApi";

const TodoMutation = () => {
  const queryClient = useQueryClient();
  const { mutate: createMutations } = useMutation(
    (id: Record<string, string>) => createTodo(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("todos");
      },
    }
  );
  const { mutate: deleteMutation } = useMutation(
    (id: string) => deleteTodo(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("todos");
      },
    }
  );
  const { mutate: updateMutation } = useMutation(
    (todo: Todo) => updateTodo(todo),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("todos");
      },
    }
  );

  return { createMutations, deleteMutation, updateMutation };
};

export default TodoMutation;
