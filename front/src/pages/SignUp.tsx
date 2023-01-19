import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { emailRegex } from "../util/Regex";
import { formData } from "../types/type";
import { Container, ErrorMessage, Form, LinkStyle } from "../styles/FormStyled";
import useRegister from "../hooks/auth/userSignUp";

function SignUp() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { registerRequest } = useRegister();
  const isEmailValid = !emailRegex.test(email);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const Data: formData = {
      email: email,
      password: password,
    };
    registerRequest(Data);
  };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailCur = e.target.value;
    setEmail(emailCur);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <h1>회원가입</h1>
        <TextField
          fullWidth
          id="standard-basic"
          label="이메일"
          variant="standard"
          onChange={handleEmail}
        />
        {email.length > 0
          ? isEmailValid && (
              <ErrorMessage>올바른 이메일 형식이 아닙니다!</ErrorMessage>
            )
          : ""}
        <TextField
          fullWidth
          id="standard-basic"
          label="비밀번호"
          variant="standard"
          type="password"
          inputProps={{ minlength: 8 }}
          onChange={handlePassword}
        />
        <Button fullWidth variant="contained" type="submit">
          회원가입
        </Button>
        <LinkStyle to="/auth/login">
          <p>로그인 화면으로</p>
        </LinkStyle>
      </Form>
    </Container>
  );
}

export default SignUp;
