import React, { useState, useRef, useEffect, useCallback } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { todoItems } from "../types/type";

export default function FormDialog(props: any) {
  const [todoTitle, setTitle] = useState(props.title);
  const [todoContent, setContent] = useState(props.content);
  let titleRef = useRef<HTMLInputElement>(null);
  const contentsRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const id = props.id;
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const titleTodo = titleRef.current!.value;
      const contentTodo = contentsRef.current!.value;
      const todo = {
        id,
        title: titleTodo,
        content: contentTodo,
      };
      await props.onUpdate(todo);
      setOpen(false);
      props.setEdit(true);
    },
    [props.onUpdate]
  );

  const handleDelete = useCallback(() => {
    if (window.confirm("정말 삭제 하시겠습니까 ?")) {
      props.onDelete(id);
    }
  }, [id, props.onDelete]);

  const handleClose = () => {
    setOpen(false);
    setTitle(props.title);
    setContent(props.content);
  };

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        자세히 보기
      </Button>
      <Dialog open={open} onClose={handleSubmit}>
        <DialogTitle>오늘 할 일</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              inputRef={titleRef}
              value={todoTitle}
              onChange={handleTitle}
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
              value={todoContent}
              onChange={handleContent}
              autoFocus
              margin="dense"
              id="content"
              label="자세한 내용"
              type="text"
              fullWidth
              variant="standard"
            />
            <DialogActions>
              <Button type="submit">수정하기</Button>
              <Button onClick={handleDelete}>삭제하기</Button>
              <Button onClick={handleClose}>취소</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
