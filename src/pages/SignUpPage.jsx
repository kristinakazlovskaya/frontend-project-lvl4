import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import {
  Form,
  FloatingLabel,
  Button,
  Card,
  Container,
  Row,
  Col,
  Image,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/useAuth.js';
import signUpImg from '../img/signUpImg.jpeg';

const SignUpPage = () => {
  const { t } = useTranslation();

  const auth = useAuth();

  const [authFailed, setAuthFailed] = useState(false);

  const navigate = useNavigate();

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required(`${t('forms.signup.username.validation.required')}`)
        .min(3, `${t('forms.signup.username.validation.length')}`)
        .max(20, `${t('forms.signup.username.validation.length')}`),
      password: Yup.string()
        .required(`${t('forms.signup.password.validation.required')}`)
        .min(6, `${t('forms.signup.password.validation.minLength')}`),
      confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], `${t('forms.signup.passwordConfirmation.validation.match')}`),
    }),
    onSubmit: async (values) => {
      setAuthFailed(false);

      try {
        const res = await axios.post('api/v1/signup', values);
        localStorage.setItem('userId', JSON.stringify(res.data));
        auth.logIn();
        navigate('/');
      } catch (err) {
        if ((err.isAxiosError && err.response.status === 401) || err.response.status === 409) {
          setAuthFailed(true);
          inputRef.current.focus();
          return;
        }
        throw err;
      }
    },
  });

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col md={8} xxl={6} className="col-12">
          <Card className="shadow-sm">
            <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <Image roundedCircle src={signUpImg} />
              </div>
              <Form className="w-50" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">{t('signup.header')}</h1>

                <FloatingLabel controlId="username" label={t('forms.signup.username.label')} className="mb-3">
                  <Form.Control
                    ref={inputRef}
                    required
                    isInvalid={(formik.touched.username && formik.errors.username) || authFailed}
                    name="username"
                    autoComplete="username"
                    placeholder={t('forms.signup.username.placeholder')}
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <Form.Control.Feedback tooltip type="invalid">{formik.errors.username}</Form.Control.Feedback>
                </FloatingLabel>

                <FloatingLabel controlId="password" label={t('forms.signup.password.label')} className="mb-3">
                  <Form.Control
                    required
                    isInvalid={(formik.touched.password && formik.errors.password) || authFailed}
                    name="password"
                    autoComplete="new-password"
                    placeholder={t('forms.signup.password.placeholder')}
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <Form.Control.Feedback tooltip type="invalid">{formik.errors.password}</Form.Control.Feedback>
                </FloatingLabel>

                <FloatingLabel controlId="confirmPassword" label={t('forms.signup.passwordConfirmation.label')} className="mb-4">
                  <Form.Control
                    required
                    isInvalid={(formik.touched.confirmPassword
                      && formik.errors.confirmPassword)
                      || authFailed}
                    name="confirmPassword"
                    autoComplete="new-password"
                    placeholder={t('forms.signup.passwordConfirmation.placeholder')}
                    type="password"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <Form.Control.Feedback tooltip type="invalid">{formik.errors.confirmPassword}</Form.Control.Feedback>

                  {authFailed && <div className="invalid-tooltip d-block">{t('forms.errors.duplicateUser')}</div>}
                </FloatingLabel>

                <Button type="submit" variant="outline-primary" className="w-100">{t('signup.button')}</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUpPage;
