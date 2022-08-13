import React, { useState } from "react";
import { Alert, Form } from "react-bootstrap";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";

const { REACT_APP_API_END_POINT: API_END_POINT } = process.env;

const Login = () => {
  const navigate = useNavigate();
  const [alertConfig, setAlertConfig] = useState({ show: false, message: "" });

  const initialValues = {
    userName: "",
    password: "",
  };

  const onSubmit = () => {
    const endPoint = `${API_END_POINT}auth/login`;
    const user = {
      userName: values.userName,
      password: values.password,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(endPoint, user, { headers })
      .then((response) => {
        //console.log(response);
        if (response.status === 200) {
          localStorage.setItem("token", response?.data?.result?.token);
          localStorage.setItem(
            "userName",
            response?.data?.result?.user?.userName
          );
          navigate("/");
        } else {
          setAlertConfig({
            show: true,
            message: "Nombre de usuario o contraseña incorrectos",
          });
        }
      })
      .catch((error) => {
        setAlertConfig({
          show: true,
          message: "Failed to login: " + error.message,
        });

        //console.log(error);
      });
  };

  const required = "*Campo requerido";
  const validationSchema = Yup.object().shape({
    userName: Yup.string().required(required),
    password: Yup.string().required(required),
  });

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  const { handleChange, handleBlur, errors, touched, values } = formik;

  return (
    <div className="container min-vh-100 d-flex flex-column justify-content-center align-items-center">
      <h2>Login</h2>
      <Alert variant="danger" show={alertConfig.show} transition={true}>
        {alertConfig.message}
      </Alert>
      <Form className="w-50" onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>UserName: </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter User Name"
            name="userName"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.userName && touched.userName && (
            <Form.Text className="text-danger">{errors.userName}</Form.Text>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Contraseña: </Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.password && touched.password && (
            <Form.Text className="text-danger">{errors.password}</Form.Text>
          )}
        </Form.Group>
        <div className="d-grid">
          <button type="submit" className="btn btn-outline-success">
            Login
          </button>
        </div>
      </Form>
      <Link to="/Register">Registrarse</Link>
    </div>
  );
};

export default Login;
