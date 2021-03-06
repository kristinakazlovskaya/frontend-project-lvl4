import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  InputGroup,
  FormControl,
  ButtonGroup,
  Button,
  Form,
} from 'react-bootstrap';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import filter from 'leo-profanity';
import useAuth from '../hooks/useAuth.js';
import useContent from '../hooks/useContent.js';

const AddMessageForm = () => {
  const { t } = useTranslation();

  const content = useContent();

  const currentChannelId = useSelector((state) => state.channels.currentChannelId);

  const inputRef = useRef();

  const auth = useAuth();

  const submitForm = (values, actions) => {
    if (values.newMessage === '') {
      return;
    }

    const newMessage = {
      body: filter.clean(values.newMessage),
      channelId: currentChannelId,
      username: auth.getUser(),
    };

    content.socket.emit('newMessage', newMessage, (response) => {
      if (response.status !== 'ok') {
        toast.error(t('toasts.networkError'));
      }
    });
    actions.setSubmitting(false);
    actions.resetForm();
    inputRef.current.focus();
  };

  useEffect(() => {
    inputRef.current.focus();
  }, [currentChannelId]);

  return (
    <Formik
      initialValues={{ newMessage: '' }}
      onSubmit={(values, actions) => {
        submitForm(values, actions);
      }}
    >
      {(props) => (
        <Form
          noValidate
          className="py-1 border rounded-2"
          onSubmit={props.handleSubmit}
        >
          <InputGroup hasValidation>
            <FormControl
              ref={inputRef}
              type="text"
              name="newMessage"
              aria-label={t('chat.label')}
              placeholder={t('chat.placeholder')}
              className="border-0 p-0 ps-2"
              value={props.values.newMessage}
              onBlur={props.handleBlur}
              onChange={props.handleChange}
            />
            <ButtonGroup
              as={Button}
              vertical
              disabled={props.values.newMessage === ''}
              role="button"
              type="submit"
              variant="default"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
              </svg>
              <span className="visually-hidden">{t('chat.sendButton')}</span>
            </ButtonGroup>
          </InputGroup>
        </Form>
      )}
    </Formik>
  );
};

export default AddMessageForm;
