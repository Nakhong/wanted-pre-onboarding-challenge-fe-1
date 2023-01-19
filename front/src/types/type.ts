export interface formData {
  email: string;
  password: string;
}
export interface Todo {
  id: string;
  title: string;
  content: string;
  createdAt?: string;
  updateAt?: string;
}

export type Todos = {
  title: string;
  content: string;
};
