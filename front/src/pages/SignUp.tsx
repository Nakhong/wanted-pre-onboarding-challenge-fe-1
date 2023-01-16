import React, { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { baseAxios } from "../api";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styled from "styled-components";
import { emailRegex } from "../util/Regex";
import { formData } from "../types/type";
import { Container, Form, LinkStyle } from "../styles/FormStyled";

function SignUp() {
  const nav = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [checkEmail, setCheckEmail] = useState<boolean>(false);

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const Data: formData = {
        email: email,
        password: password,
      };
      await baseAxios
        .post(`users/create`, Data)
        .then((res) => {
          alert(res.data.message);
          nav("/auth/login");
        })
        .catch((e) => {
          alert(e.response.data.details);
        });
    },
    [email, password]
  );

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailCur = e.target.value;
    setEmail(emailCur);

    if (!emailRegex.test(emailCur)) {
      setCheckEmail(false);
    } else {
      setCheckEmail(true);
    }
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
        {email.length > 0 && (
          <ErrorSpan>
            {checkEmail === true ? "" : "올바른 이메일 형식이 아닙니다!"}
          </ErrorSpan>
        )}
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

const ErrorSpan = styled.span`
  color: red;
`;
