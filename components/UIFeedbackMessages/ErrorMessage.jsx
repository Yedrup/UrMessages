import { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { UIStateContext } from '../../contexts/UIContext';
import WrapperUIMessage from './WrapperUIMessage';

const ErrorMessageStyled = styled.div`
  padding: 1rem;
  background: ${({ theme }) => theme.error};
  p {
    margin: 0;
  }
  .error__label {
    margin-right: 0.5rem;
    font-weight: 800;
  }
`;

const ErrorMessage = ({ error }) => {
  if (!error || !error.message) return null;

  const displayMessage = error?.customMessage
    ? error.customMessage
    : 'Something went wrong';
  const { stateUI } = useContext(UIStateContext);

  return (
    <WrapperUIMessage message={error} conditionToReset={stateUI?.isError}>
      <ErrorMessageStyled>
        <span className="error__label">Oh no! 😕</span>
        <span>{displayMessage}</span>
      </ErrorMessageStyled>
    </WrapperUIMessage>
  );
};

ErrorMessage.propTypes = {
  error: PropTypes.object,
};

export default ErrorMessage;
