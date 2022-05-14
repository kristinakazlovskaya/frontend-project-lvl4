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
} from 'react-bootstrap';
import { useFormik } from 'formik';
import useAuth from '../hooks/useAuth.js';
import signUpImg from '../img/signUpImg.jpeg';

const SignUpPage = () => {
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
        .required('Обязательное поле')
        .min(3, 'От 3 до 20 символов')
        .max(20, 'От 3 до 20 символов'),
      password: Yup.string()
        .required('Обязательное поле')
        .min(6, 'Не менее 6 символов'),
      confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Пароли должны совпадать'),
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
                <img src={signUpImg} className="rounded-circle" alt="Регистрация" />
              </div>
              <Form className="w-50" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">Регистрация</h1>

                <FloatingLabel controlId="username" label="Имя пользователя" className="mb-3">
                  <Form.Control
                    ref={inputRef}
                    required
                    isInvalid={(formik.touched.username && formik.errors.username) || authFailed}
                    name="username"
                    autoComplete="username"
                    placeholder="От 3 до 20 символов"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <Form.Control.Feedback tooltip type="invalid">{formik.errors.username}</Form.Control.Feedback>
                </FloatingLabel>

                <FloatingLabel controlId="password" label="Пароль" className="mb-3">
                  <Form.Control
                    required
                    isInvalid={(formik.touched.password && formik.errors.password) || authFailed}
                    name="password"
                    autoComplete="new-password"
                    placeholder="Не менее 6 символов"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <Form.Control.Feedback tooltip type="invalid">{formik.errors.password}</Form.Control.Feedback>
                </FloatingLabel>

                <FloatingLabel controlId="confirmPassword" label="Подтвердите пароль" className="mb-4">
                  <Form.Control
                    required
                    isInvalid={(formik.touched.confirmPassword
                      && formik.errors.confirmPassword)
                      || authFailed}
                    name="confirmPassword"
                    autoComplete="new-password"
                    placeholder="Пароли должны совпадать"
                    type="password"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <Form.Control.Feedback tooltip type="invalid">{formik.errors.confirmPassword}</Form.Control.Feedback>

                  {authFailed && <div className="invalid-tooltip d-block">Такой пользователь уже существует</div>}
                </FloatingLabel>

                <Button type="submit" variant="outline-primary" className="w-100">Зарегистрироваться</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUpPage;
