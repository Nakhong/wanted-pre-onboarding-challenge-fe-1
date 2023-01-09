import React from "react";
import Container from "@mui/material/Container";

//만약 로그인을 안했으면 로그인 해주세요 창을 띄워준다.
function Home() {
  return (
    <Container maxWidth="sm">
      <a href="/auth/login">로그인 하기</a>
    </Container>
  );
}

export default Home;
