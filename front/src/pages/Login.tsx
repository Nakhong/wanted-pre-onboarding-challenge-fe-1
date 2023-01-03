import React, { useCallback, useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import { Link, useNavigate } from "react-router-dom";
import { baseAxios } from "../api";

interface formData {
  email: string;
  password: string;
}

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
          nav("/todos");
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
    <Container>
      <Link to="/auth/signup">
        <p>회원가입</p>
      </Link>
      <form onSubmit={onSubmit}>
        <h1>로그인</h1>
        <label htmlFor="id">아이디</label>
        <input name="id" type="text" maxLength={15} onChange={handleId} />
        <label htmlFor="password">비밀번호</label>
        <input type="password" minLength={8} onChange={handlePassword} />
        <button>로그인</button>
      </form>
    </Container>
  );
}

export default Login;

const Container = tw.div`
w-full
flex
flex-col
justify-center
items-center
`;
