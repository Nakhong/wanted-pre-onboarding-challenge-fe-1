export interface formData {
  email: string;
  password: string;
}
export interface Todo {
  id: string;
  title: string;
  content: string;
}

// todoitem에 interface로 들어간다.
export interface todoItems extends Todo {
  onDelete: (id: string) => void;
  onUpdate: (data: Todo) => void;
  todoList: Todo;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

//update에 타입으로 들어간다.
