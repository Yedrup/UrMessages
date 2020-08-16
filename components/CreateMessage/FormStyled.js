import styled, { keyframes } from 'styled-components';

export const loading = keyframes`
  from {
    background-position: 0 0;
  }
  to {
    background-position: 100% 100%;
  }
`;

const FormStyled = styled.form`
  margin: 2rem auto;
  border: 2px solid grey;
  padding: 1.5rem;
  line-height: 1.5;
  font-size: 1.5rem;
  font-weight: 600;
  label {
    display: block;
    margin-bottom: 1rem;
    text-align: left;
  }
  input,
  textarea,
  select {
    width: 100%;
    padding: 0.5rem;
    font-size: 1.5rem;
    border: 1px solid black;
    background: white;
    &:focus {
      outline: 0;
      border-color: ${({ theme }) => theme.highlight};
    }
  }
  textarea {
    min-height: 7rem;
  }
  button {
    align-self: center;
  }
  button,
  input[type='submit'] {
    font-size: 1.5rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05rem;
  }
  fieldset {
    border: 0;
    padding: 0;

    &[disabled] {
      opacity: 0.25;
    }
    &::before {
      height: 10px;
      content: '';
      display: block;
      background-image: linear-gradient(
        ${({ theme }) => theme.gradientToRight}
      );
    }
    &[aria-busy='true']::before {
      background-size: 50% auto;
      animation: ${loading} 5s linear infinite;
    }
  }
`;

export default FormStyled;
