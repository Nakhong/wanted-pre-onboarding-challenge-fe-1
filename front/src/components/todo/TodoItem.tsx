import React from "react";
import styled from "styled-components";
import FormDialog from "./FormDialog";
import { Todo } from "../../types/type";

function TodoItem({ content, title, id }: Todo) {
  return (
    <Container>
      <Li>
        <div>
          <span>{title}</span>
        </div>
        <div>
          <FormDialog id={id} title={title} content={content} />
        </div>
      </Li>
    </Container>
  );
}

export default TodoItem;

const Container = styled.div`
  width: 100%;
  display: flex;
`;

const Li = styled.li`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 10px 10px 10px 20px;
  margin-bottom: 5px;
  border: 0.5px solid #c1d7f3;
  border-radius: 20px;
  color: #c1d7f3;
  font-weight: bold;
  line-height: 35px;
`;
