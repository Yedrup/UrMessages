import WrapperUIMessage from './WrapperUIMessage';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';

export const animationMessage = keyframes`
  0% {
    opacity: .5;
    transform: scale(0.5);
  }
  5% {
    opacity: 1;
    transform: scale(1);
  }
  90% {
    opacity: 1;
    transform: scale(1);
  }
  99% {
    transform: scale(0.5);
  }
  99% {
    opacity: 0;
    transform: scale(0);
  }

`;

const SuccessMessageStyled = styled.div`
  padding: 2rem 1rem;
  background: ${({ theme }) => theme.success};
  font-size: 2rem;
  animation: ${animationMessage} 3s ease-out;
  p {
    margin: 0;
  }
  .info__label__icon {
    margin-right: 1rem;
  }
`;

const SuccessMessage = ({ success, children, className }) => {
  if (!success || !success.message) return null;
  const { icon = '✅', message } = success;
  return (
    <WrapperUIMessage message={success}>
      <SuccessMessageStyled className={className}>
        <span className="info__label__icon">{icon}</span>
        <span className="info__label__message"> {message}</span>
        {children}
      </SuccessMessageStyled>
    </WrapperUIMessage>
  );
};

SuccessMessage.propTypes = {
  success: PropTypes.object,
  children: PropTypes.any,
  className: PropTypes.string,
};

export default SuccessMessage;
