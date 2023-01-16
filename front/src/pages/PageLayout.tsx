import React, { ReactNode } from "react";
import styled from "styled-components";
import Container from "@mui/material/Container";

function PageLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Main>
        <Container maxWidth="sm">{children}</Container>
      </Main>
    </>
  );
}

export default PageLayout;

const Main = styled.main`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  min-height: 50vh;
`;
