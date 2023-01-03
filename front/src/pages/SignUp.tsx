import React, { useCallback, useState } from "react";
import tw from "tailwind-styled-components";
import { Link, useNavigate } from "react-router-dom";
import { baseAxios } from "../api";

interface SignUpData {
  email: string;
  password: string;
}

function SignUp() {
  const nav = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (password !== confirmPassword) {
        alert("비밀번호가 일치하지 않습니다");
      }
      const Data: SignUpData = {
        email: email,
        password: password,
      };
      await baseAxios
        .post(`users/create`, Data)
        .then((res) => {
          alert(res.data.message);
          nav("/login");
        })
        .catch((e) => {
          console.log(e.response.data.details);
        });
    },
    [email, password, confirmPassword]
  );

  const handleId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <Container>
      <Link to="/auth/login">
        <p>로그인</p>
      </Link>
      <form onSubmit={onSubmit}>
        <h1>회원가입</h1>
        <label htmlFor="id">아이디</label>
        <input name="id" type="text" maxLength={15} onChange={handleId} />
        <label htmlFor="password">비밀번호</label>
        <input type="password" minLength={8} onChange={handlePassword} />
        <label htmlFor="password">비밀번호 확인</label>
        <input type="password" minLength={8} onChange={handleConfirmPassword} />
        <button>회원가입</button>
      </form>
    </Container>
  );
}

export default SignUp;

const Container = tw.div`
w-full
flex
flex-col
justify-center
items-center
`;
