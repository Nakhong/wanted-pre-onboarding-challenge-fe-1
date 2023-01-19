import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { formData } from "../types/type";
import { Container, Form, LinkStyle } from "../styles/FormStyled";
import useLogin from "../hooks/auth/userLogin";

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { loginRequest } = useLogin();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const Data: formData = {
      email,
      password,
    };
    loginRequest(Data);
  };

  const handleId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <h1>로그인</h1>
        <TextField
          fullWidth
          id="standard-basic"
          label="이메일"
          variant="standard"
          inputProps={{ maxlength: 30 }}
          onChange={handleId}
        />
        <TextField
          fullWidth
          id="standard-basic"
          label="비밀번호"
          variant="standard"
          inputProps={{ minlength: 8 }}
          type="password"
          onChange={handlePassword}
        />
        <Button fullWidth variant="contained" type="submit">
          로그인
        </Button>
        <LinkStyle to="/auth/signup">
          <p>회원가입</p>
        </LinkStyle>
      </Form>
    </Container>
  );
}

export default Login;
