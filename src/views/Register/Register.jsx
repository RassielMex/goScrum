import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const { REACT_APP_API_END_POINT: API_END_POINT } = process.env;

const Register = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const endPoint = `${API_END_POINT}auth/data`;
    axios
      .get(endPoint)
      .then((response) => {
        const dataRes = response.data;
        setData(dataRes.result);
      })
      .catch((e) => console.log(e));
  }, [setData]);

  const initialValues = {
    userName: "",
    email: "",
    password: "",
    teamID: "",
    role: "",
    continent: "",
    region: "",
    switch: false,
  };

  const onSubmit = () => {
    const teamID = !values.teamID ? uuidv4() : values.teamID;
    const endPoint = `${API_END_POINT}auth/register`;
    const data = {
      userName: values.userName,
      email: values.email,
      password: values.password,
      teamID: teamID,
      role: values.role,
      continent: values.continent,
      region: values.region,
    };
    console.log(data);
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(endPoint, { user: data }, { headers })
      .then((response) => {
        console.log(response);
        const user = response.data.result.user;

        navigate("/registered/" + user.teamID, { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
    // fetch(endPoint, {
    //   method: "POST",
    //   headers: headers,
    //   body: JSON.stringify({ user: data }),
    // }).then((response) => {
    //   console.log(response);
    // });
  };

  const handleContinentChange = (value) => {
    setFieldValue("continent", value);
    if (value !== "America") {
      setFieldValue("region", "Otro");
    }
  };

  const required = "*Campo requerido";
  const validationSchema = Yup.object().shape({
    userName: Yup.string().required(required).num,
    email: Yup.string().required(required).email("Introduzca un email válido"),
    password: Yup.string()
      .required(required)
      .min(4, "Introduzca 4 caracteres o más"),
    role: Yup.string().required(required),
    continent: Yup.string().required(required),
    region: Yup.string().required(required),
  });

  const formik = useFormik({ initialValues, onSubmit, validationSchema });
  const {
    handleChange,
    handleSubmit,
    errors,
    touched,
    handleBlur,
    values,
    setFieldValue,
  } = formik;

  return (
    <Container
      fluid
      className="min-vh-100 d-flex flex-column justify-content-center align-items-center bg-light"
    >
      <Card className="d-flex align-items-center">
        <Card.Body className="w-100">
          <Card.Title className="text-center">Register</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>UserName: </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter a User Name"
                onChange={handleChange}
                onBlur={handleBlur}
                name="userName"
              />
              {errors.userName && touched.userName && (
                <Form.Text className="text-danger">{errors.userName}</Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email: </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={handleChange}
                onBlur={handleBlur}
                name="email"
              />
              {errors.email && touched.email && (
                <Form.Text className="text-danger">{errors.email}</Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Contraseña: </Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                onChange={handleChange}
                onBlur={handleBlur}
                name="password"
              />
              {errors.password && touched.password && (
                <Form.Text className="text-danger">
                  {formik.errors.password}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Check
                type="checkbox"
                name="switch"
                label={"Pertenezco a un grupo"}
                value={values.switch}
                onChange={() => {
                  setFieldValue("switch", !values.switch);
                }}
              />
              {values.switch && (
                <Form.Control
                  type="text"
                  name="teamID"
                  value={values.teamID}
                  onChange={handleChange}
                  placeholder="Introduzca el ID de su grupo"
                />
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="role">
              <Form.Select
                name="role"
                onChange={handleChange}
                onBlur={handleBlur}
              >
                {data?.Rol?.map((role) => {
                  return (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  );
                })}
              </Form.Select>
              {errors.role && touched.role && (
                <Form.Text className="text-danger">{errors.role}</Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="role">
              <Form.Select
                name="continent"
                onChange={(event) => {
                  handleContinentChange(event.currentTarget.value);
                }}
                onBlur={handleBlur}
              >
                <option value="">Seleccione un continente...</option>
                {data?.continente?.map((c) => {
                  return (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  );
                })}
              </Form.Select>
              {errors.continent && touched.continent && (
                <Form.Text className="text-danger">{errors.role}</Form.Text>
              )}
            </Form.Group>
            {values.continent === "America" && (
              <Form.Group className="mb-3" controlId="region">
                <Form.Select
                  name="region"
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="">Seleccione una region...</option>
                  {data?.region?.map((r) => {
                    return (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    );
                  })}
                </Form.Select>
                {errors.region && touched.region && (
                  <Form.Text className="text-danger">{errors.region}</Form.Text>
                )}
              </Form.Group>
            )}
            <Button type="submit" variant="primary" className="w-100">
              Register
            </Button>
          </Form>
          <Link to="/Login">
            <p className="text-info text-center mt-3">Ya tengo una cuenta</p>
          </Link>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Register;
