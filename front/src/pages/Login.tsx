import React, { useCallback, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { baseAxios } from "../api";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import { formData } from "../types/type";

function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      nav("/todos");
    }
  });

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const Data: formData = {
        email: email,
        password: password,
      };
      await baseAxios
        .post("/users/login", Data)
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          nav("/");
        })
        .catch((e) => {
          alert(e.response.data.details);
        });
    },
    [email, password]
  );

  const handleId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <Link to="/auth/signup">
        <p>회원가입</p>
      </Link>
      <Form onSubmit={onSubmit}>
        <h1>로그인</h1>
        <TextField
          id="standard-basic"
          label="이메일"
          variant="standard"
          inputProps={{ maxlength: 30 }}
          onChange={handleId}
        />
        <TextField
          id="standard-basic"
          label="비밀번호"
          variant="standard"
          inputProps={{ minlength: 8 }}
          type="password"
          onChange={handlePassword}
        />
        <Button variant="contained" type="submit">
          로그인
        </Button>
      </Form>
    </>
  );
}

export default Login;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
