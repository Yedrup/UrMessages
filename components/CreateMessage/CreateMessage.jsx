import { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import NProgress from 'nprogress';
import { DataDispatchContext } from '../../contexts/DataContext';
import { UIDispatchContext, UIStateContext } from '../../contexts/UIContext';
import { UserStateContext } from '../../contexts/UserContext';
import { MessageClass } from '../../lib/classes';
import { postMessage } from '../../lib/data-treatment-service';
import SigninButton from '../Sign/SigninButton';
import FormStyled from './FormStyled';
import Error from '../UIFeedbackMessages/ErrorMessage';
import Info from '../UIFeedbackMessages/InfoMessage';
import Success from '../UIFeedbackMessages/SuccessMessage';

const InfoStyled = styled(Info)`
  display: flex;
  align-items: center;
  button {
    margin-left: 2rem;
    padding: 1rem 0;
    background: ${({ theme }) => theme.highlightSecondary};
    color: white;
    font-size: 1.95rem;
  }
`;

const CreateMessage = ({ ctx }) => {
  const { id, isPublic, parentId } = ctx;

  const { dispatchData } = useContext(DataDispatchContext);
  const { dispatchUI } = useContext(UIDispatchContext);
  const { stateUI } = useContext(UIStateContext);
  const { stateUser } = useContext(UserStateContext);

  const type = isPublic ? 'public' : 'private';
  let defaultFormValues = { title: '', content: '', type };

  const [values, setValues] = useState(defaultFormValues);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  // Reset the form on disconnection
  useEffect(() => {
    if (!stateUser.isConnected) setValues({ ...defaultFormValues });
    return () => {};
  }, [stateUser?.isConnected]);

  // Reset success Message to false to make it disappear
  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    }
    return () => {};
  }, [isSuccess]);

  const handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const sendMessage = async ({ title, content, type }) => {
    dispatchUI({
      type: 'START_BUSY',
    });
    setIsFormSubmitting(true);
    NProgress.start();
    let newFormattedMessage = new MessageClass({
      id,
      parentId,
      isPublic,
      name,
      title,
      user: stateUser?.userId,
      content,
    });

    try {
      const result = await postMessage({ message: newFormattedMessage });
      // Dispatch the new list updated
      dispatchData({
        type: 'CREATE_MESSAGE',
        payload: { result, type },
      });
      dispatchUI({
        type: 'END_BUSY',
      });
      // Reset the form on success
      setValues({ ...defaultFormValues });
      // Allow to display success message
      setIsSuccess(true);
    } catch (err) {
      // Allow to display error message
      setError(err);
      dispatchUI({
        type: 'IS_ERROR',
      });
      dispatchUI({
        type: 'END_BUSY',
      });
    }
    NProgress.done();
    setIsFormSubmitting(false);
  };

  return (
    <>
      {!stateUser?.isConnected && (
        <InfoStyled info={{ message: 'You need to Sign In to send messages!' }}>
          <span className="createMessage__info--signin">
            <SigninButton />
          </span>
        </InfoStyled>
      )}
      <FormStyled
        data-test="form"
        id="test"
        onSubmit={async e => {
          e.preventDefault();
          sendMessage(values);
        }}
      >
        <fieldset
          disabled={stateUI?.isBusy || !stateUser.isConnected}
          aria-busy={stateUI?.isBusy}
        >
          {error && stateUI.isError && <Error error={error} />}
          {isSuccess && (
            <Success success={{ message: 'Message successfully sent!' }} />
          )}
          <label htmlFor="title">
            <span className="subtitle">Title</span>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Title"
              required
              onChange={handleChange}
              value={values.title}
            />
          </label>
          <label htmlFor="content">
            <span className="subtitle">Message</span>
            <textarea
              id="content"
              name="content"
              placeholder="Enter A Message"
              required
              onChange={handleChange}
              value={values.content}
            />
          </label>
          <button
            type="submit"
            className="c-button"
            data-testid="button-submit-message"
          >
            Submit{stateUI?.isBusy && isFormSubmitting ? 'ting' : ''}
          </button>
        </fieldset>
      </FormStyled>
    </>
  );
};

export default CreateMessage;
