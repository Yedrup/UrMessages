import { useContext, useState, useEffect } from 'react';
import { DataDispatchContext } from '../../contexts/DataContext';
import { UIDispatchContext, UIStateContext } from '../../contexts/UIContext';
import FormStyled from './FormStyled';
import { MessageClass } from '../../lib/classes';
import { postMessage } from '../../lib/data-treatment-service';
import NProgress from 'nprogress';

const CreateMessage = ({ ctx }) => {
  const { id, isPublic, parentId } = ctx;
  const type = isPublic ? 'public' : 'private';

  const { dispatchData } = useContext(DataDispatchContext);
  const { dispatchUI } = useContext(UIDispatchContext);
  const { stateUI } = useContext(UIStateContext);

  let defaultFormValues = { title: '', content: '', type };
  const [values, setValues] = useState(defaultFormValues);

  const handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const sendMessage = async ({ title, content, type }) => {
    dispatchUI({
      type: 'START_BUSY',
    });
    NProgress.start();
    let newFormattedMessage = new MessageClass({
      id,
      parentId,
      isPublic,
      name,
      title,
      content,
    });
    // post a new message
    await postMessage({ message: newFormattedMessage })
      .then(result => {
        // dispatch the new list updated
        dispatchData({
          type: 'CREATE_MESSAGE',
          payload: { result, type },
        });
        NProgress.done();
        dispatchUI({
          type: 'END_BUSY',
        });
      })
      .catch(err => {
        console.log('err', err);
        dispatchUI({
          type: 'IS_ERROR',
          payload: { ...err },
        });
      });
  };

  return (
    <FormStyled
      data-test="form"
      id="test"
      onSubmit={async e => {
        e.preventDefault();
        sendMessage(values);
        setValues({ ...defaultFormValues });
      }}
    >
      <fieldset disabled={stateUI?.isBusy} aria-busy={stateUI?.isBusy}>
        <label htmlFor="title">
          Title
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
          Message
          <textarea
            id="content"
            name="content"
            placeholder="Enter A Message"
            required
            onChange={handleChange}
            value={values.content}
          />
        </label>
        <button type="submit" className="c-button">
          Submit{stateUI.isBusy ? 'ting' : ''}
        </button>
      </fieldset>
    </FormStyled>
  );
};

export default CreateMessage;
