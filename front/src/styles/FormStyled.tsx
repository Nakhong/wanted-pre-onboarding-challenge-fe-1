import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: felx;
  justify-content: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const ErrorMessage = styled.span`
  color: red;
`;

const LinkStyle = styled(Link)`
  box-sizing: border-box;
  display: block;
  text-decoration: none;
  color: #1876d2;
  &:hover {
    color: blue;
  }
`;

const TodoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TodosUl = styled.ul`
  width: 500px;
  padding: 0;
  list-style: none;
`;

export { TodoContainer, TodosUl, Container, Form, ErrorMessage, LinkStyle };
