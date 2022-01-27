import styled from "styled-components";

interface InputProps {
  readonly error?: boolean;
}
interface Ibtn {
  readonly big?: boolean;
  readonly secondary?: boolean;
}
export const Title = styled.h1`
  font-size: 2.7rem;
  color: #11bdff;
  margin: 2rem 0;
`;
export const Form = styled.form`
  max-width: 50rem;
  width: 100%;
  padding: 3rem 0;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  .redirect {
    font-size: 1.6rem;
    margin-top: 1.5rem;
  }
`;
export const Holder = styled.div`
  max-width: 25rem;
  width: 100%;
  disply: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  position: relative;
`;
export const Label = styled.label`
  font-size: 1.4rem;
  color: #11bdff;
`;
export const Input = styled.input<InputProps>`
  width: 100%;
  max-width: 25rem;
  padding: 1rem 0;
  border-radius: 3px;
  border: 1px solid ${(props) => (props.error ? "red" : "#11bdff")};
  text-indent: 1rem;
  font-size: 1.6rem;
`;
export const SubmitInput = styled.input<Ibtn>`
  background-color: ${(props) => (props.secondary ? "#fff" : "transparent")};
  color: #11bdff;
  border: 1px solid #11bdff;
  transition: background-color 0.3s, color 0.3s;
  width: 100%;
  max-width: ${(props) => props.big && "25rem"};
  padding: 1rem 2rem;
  font-size: 1.6rem;
  &:hover {
    cursor: pointer;
    background-color: #11bdff;
    color: #fff;
  }
`;
export const CheckBox = styled.input`
  opacity: 0;
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 50%;
  height: 2.5rem;
  width: 2.5rem;
  z-index: 10;
  &:checked + span {
    background-color: #11bdff;
  }
  &:checked + span::after {
    display: block;
  }
`;
export const Message = styled.span<InputProps>`
  margin-top: 1rem;
  font-size: 1.4rem;
  color: ${(props) => (props.error ? "red" : "#333")};
`;
export const Mark = styled.span`
  position: absolute;
  left: 50%;
  top: 0;
  height: 2.5rem;
  width: 2.5rem;
  background-color: #eee;

  &::after {
    display: none;
    left: 9px;
    top: 5px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
    position: absolute;
    content: "";
  }
`;
