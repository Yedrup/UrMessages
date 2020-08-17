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
  margin: 4rem auto;
  padding: 1.5rem;
  text-align: left;
  border: 1px solid grey;
  line-height: 1.5;
  font-size: 1.5rem;
  font-weight: 600;
  label {
    display: block;
    margin: 1rem 0;
    text-align: left;
    .subtitle {
      display: inline-block;
      margin: 1rem 0;
      font-size: 1.85rem;
      font-weight: 500;
      color: ${({ theme }) => theme.lightgrey};
    }
  }
  input,
  textarea,
  select {
    width: 100%;
    padding: 1.25rem;
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
      height: 0.7rem;
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
