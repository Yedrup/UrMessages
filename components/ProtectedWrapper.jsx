import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { UserStateContext } from '../contexts/UserContext';
import SigninPresentation from '../components/Sign/SigninPresentation';
import styled from 'styled-components';

/* This manage the protected pieces of content (pages or components) which requires a condition to fulfil to render.
The default condition is to be on private page and logged or on public page.
A fallback component can be given and will be displayed in case of condition not fulfilled*/
const ProtectedWrapper = ({ children, fallBack, accessCondition }) => {
  const router = useRouter();
  const { type: typeFromRouter } = router.query;
  const { stateUser } = useContext(UserStateContext);
  const [hasRightToAccess, setHasRightToAccess] = useState(accessCondition);
  const [currentType, setCurrentType] = useState(router.query.type);

  if (currentType !== typeFromRouter) {
    setCurrentType(typeFromRouter);
  }
  const isPrivate = currentType === 'private';
  const isAccessConditionProvided = typeof accessCondition !== 'undefined';
  let defaultAccessCondition =
    (isPrivate && stateUser?.isConnected) || !isPrivate;

  useEffect(() => {
    // If the property accessCondition not provided we use the default one
    let accessConditionToUse = isAccessConditionProvided
      ? accessCondition
      : defaultAccessCondition;
    setHasRightToAccess(accessConditionToUse);
    return () => {};
  }, [stateUser?.isConnected, currentType]);

  const DefaultMessageStyled = styled.div`
    font-size: 2rem;
  `;
  return (
    <div>
      {!hasRightToAccess && fallBack && <>{fallBack}</>}
      {!hasRightToAccess && !fallBack && (
        <>
          <DefaultMessageStyled>
            ✋ You are not allowed to access this page!
          </DefaultMessageStyled>
          <SigninPresentation />
        </>
      )}
      {hasRightToAccess && children}
    </div>
  );
};

export default ProtectedWrapper;
