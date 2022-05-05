/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import useAuth from '../hooks/useAuth.js';

import loginImage from '../img/loginImg.jpg';

const LoginPage = () => {
  const auth = useAuth();

  const [authFailed, setAuthFailed] = useState(false);

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const navigate = useNavigate();

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
          inputRef.current.select();
          return;
        }
        throw err;
      }
    },
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img className="rounded-circle" src={loginImage} alt="Войти" />
              </div>

              <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">Войти</h1>

                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    ref={inputRef}
                    required
                    isInvalid={authFailed}
                    name="username"
                    autoComplete="username"
                    placeholder="Ваш ник"
                    id="username"
                    className="form-control"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                  />
                  <Form.Label htmlFor="username">Ваш ник</Form.Label>
                </Form.Group>

                <Form.Group className="form-floating mb-4">
                  <Form.Control
                    required
                    isInvalid={authFailed}
                    name="password"
                    autoComplete="current-password"
                    placeholder="Пароль"
                    type="password"
                    id="password"
                    className="form-control"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                  />
                  <Form.Label className="form-label" htmlFor="password">Пароль</Form.Label>
                  <Form.Control.Feedback tooltip type="invalid">Неверные имя пользователя или пароль</Form.Control.Feedback>
                </Form.Group>

                <Button type="submit" variant="outline-primary" className="w-100 mb-3">Войти</Button>
              </Form>
            </div>

            <div className="card-footer p-4">
              <div className="text-center">
                <span>Нет аккаунта?</span>
                {' '}
                <Link to="/signup">Регистрация</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
