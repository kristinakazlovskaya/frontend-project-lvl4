/* eslint-disable jsx-a11y/label-has-associated-control */

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import loginImage from '../img/loginImg.jpg';

const Login = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required(),
      password: Yup.string().required(),
    }),
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
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

              <form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                <h1 className="text-center mb-4">Войти</h1>

                <div className="form-floating mb-3">
                  <input name="username" autoComplete="username" required placeholder="Ваш ник" id="username" className="form-control" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.firstName} />
                  <label htmlFor="username">Ваш ник</label>
                </div>

                <div className="form-floating mb-4">
                  <input name="password" autoComplete="current-password" required placeholder="Пароль" type="password" id="password" className="form-control" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} />
                  <label className="form-label" htmlFor="password">Пароль</label>
                </div>

                <button type="submit" className="w-100 mb-3 btn btn-outline-primary">Войти</button>
              </form>
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

export default Login;
