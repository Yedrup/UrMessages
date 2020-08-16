import { useContext } from 'react';
import WrapperUIMessage from './WrapperUIMessage';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { UserStateContext } from '../../contexts/UserContext';

const InfoMessageStyled = styled.div`
  padding: 1rem;
  background: ${({ theme }) => theme.info};
  font-size: 2rem;
  p {
    margin: 0;
  }
  .info__label {
    margin-right: 1rem;
  }
`;

const InfoMessage = ({ info, children, className }) => {
  if (!info || !info.message) return null;
  const { icon = 'ℹ️' } = info;
  const { stateUser } = useContext(UserStateContext);
  return (
    <WrapperUIMessage message={info} conditionToReset={stateUser?.isConnected}>
      <InfoMessageStyled className={className}>
        <span className="info__label">{icon}</span>
        <span> {info.message}</span>
        {children}
      </InfoMessageStyled>
    </WrapperUIMessage>
  );
};

InfoMessage.propTypes = {
  error: PropTypes.object,
};

export default InfoMessage;
