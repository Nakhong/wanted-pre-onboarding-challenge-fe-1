import React, { useState, useRef, useEffect, useCallback } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { baseAxios, Todo } from "../api";

export default function FormDialog(props: any) {
  const titleRef = useRef<HTMLInputElement>(null);
  const contentsRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const id = props.id;
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const title = titleRef.current!.value;
      const content = contentsRef.current!.value;
      const todo = {
        id,
        title,
        content,
      };
      if (!todo) {
        return;
      }
      await props.onUpdate(todo);
      setOpen(false);
    },
    [updateTodos]
  );

  const handleClose = () => {
    setOpen(false);
  };

  async function updateTodos(data: any) {
    const total = { title: data.title, content: data.content };
    return await baseAxios.put(`/todos/${data.id}`, total, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }

  // const handlePost = async () => {
  //   setFormTitle(titleRef.current!.value);
  //   setFormContent(contentsRef.current!.value);
  //   const data: any = { id: props.id, title: FormTitle, content: FormContent };
  //   await updateTodos(data);
  //   setOpen(false);
  // };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        수정
      </Button>
      <Dialog open={open} onClose={handleSubmit}>
        <DialogTitle>오늘 할 일</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              inputRef={titleRef}
              autoFocus
              margin="dense"
              id="title"
              label="제목"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              inputRef={contentsRef}
              autoFocus
              margin="dense"
              id="content"
              label="자세한 내용"
              type="text"
              fullWidth
              variant="standard"
            />
            <DialogActions>
              <Button onClick={handleClose}>취소</Button>
              <Button type="submit">수정하기</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
