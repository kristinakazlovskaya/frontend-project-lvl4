/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import {
  Button,
  Form,
  Container,
  Row,
  Col,
  Card,
  FloatingLabel,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import useAuth from '../hooks/useAuth.js';
import loginImage from '../img/loginImg.jpg';

const LoginPage = () => {
  const auth = useAuth();

  const [authFailed, setAuthFailed] = useState(false);

  const inputRef = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required(),
      password: Yup.string().required(),
    }),
    onSubmit: async (values) => {
      setAuthFailed(false);

      try {
        const res = await axios.post('api/v1/login', values);
        localStorage.setItem('userId', JSON.stringify(res.data));
        auth.logIn();
        navigate('/');
      } catch (err) {
        if (err.isAxiosError && err.response.status === 401) {
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
            <Card.Body className="row p-5">
              <Col md={6} className="col-12 d-flex align-items-center justify-content-center">
                <img className="rounded-circle" src={loginImage} alt="Войти" />
              </Col>

              <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">Войти</h1>

                <FloatingLabel controlId="username" label="Ваш ник" className="mb-3">
                  <Form.Control
                    ref={inputRef}
                    required
                    isInvalid={authFailed}
                    name="username"
                    autoComplete="username"
                    placeholder="Ваш ник"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </FloatingLabel>

                <FloatingLabel controlId="password" label="Пароль" className="mb-3">
                  <Form.Control
                    required
                    isInvalid={authFailed}
                    name="password"
                    autoComplete="current-password"
                    placeholder="Пароль"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <Form.Control.Feedback tooltip type="invalid">Неверные имя пользователя или пароль</Form.Control.Feedback>
                </FloatingLabel>

                <Button type="submit" variant="outline-primary" className="w-100 mb-3">Войти</Button>
              </Form>
            </Card.Body>

            <Card.Footer className="p-4">
              <div className="text-center">
                <span>Нет аккаунта?</span>
                {' '}
                <Link to="/signup">Регистрация</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
