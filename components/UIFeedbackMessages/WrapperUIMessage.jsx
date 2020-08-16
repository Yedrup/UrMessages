import styled from 'styled-components';
import PropTypes from 'prop-types';

const UIMessageStyled = styled.div`
  margin: 2rem 0;
  box-shadow: ${({ theme }) => theme.elevation2};
  text-align: left;
  color: white;
  text-shadow: ${({ theme }) => theme.black} 0.2px 0.2px;
  font-weight: 500;
`;

const WrapperUIMessage = ({ children, message, conditionToReset }) => {
  if (!children) return null;
  return <UIMessageStyled>{children}</UIMessageStyled>;
};

WrapperUIMessage.propTypes = {
  children: PropTypes.object,
};

export default WrapperUIMessage;
