import React from 'react';
import styled from 'styled-components';

export const Box = ({ header, content, color }) => {
  return (
    <Container>
      <strong>
        {header} <Text color={color}>{content}</Text>
      </strong>
    </Container>
  );
};

const Container = styled.div`
  background: #fafafa;
  padding: 10px;
  margin: 10px;
  width: 300px;
  border: 1px solid #ececec;
`;

const Text = styled.div`
  color: ${(props) => props.color};
`;
