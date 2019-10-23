import styled from "styled-components";

export const ButtonContainer = styled.button`
  font-size: 1.5rem;
  background: white;
  color: ${props => (props.cart ? "var(--mainYellow)" : "var(--lightBlue)")};
  border: 0.1rem solid var(--lightBlue);
  border-radius: 0.5rem;
  padding: 0.2rem 0.5rem;
  cursor: pointer;
  margin: 0.2rem 0.5rem 0.2rem 0;
  transitions: all 0.5s ease-in-out;
  &:hover {
    background: lightgrey;
  }
`;
