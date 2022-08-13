import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { Button, Form } from "react-bootstrap";
import * as Yup from "yup";

const { REACT_APP_API_END_POINT: API_END_POINT } = process.env;

const TaskForm = ({ showAlert }) => {
  const initialValues = {
    title: "",
    status: "",
    importance: "",
    description: "",
  };

  const onSubmit = () => {
    const endPoint = `${API_END_POINT}task/`;
    const task = {
      title: values.title,
      status: values.status,
      importance: values.importance,
      description: values.description,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
    axios
      .post(endPoint, { task }, { headers })
      .then((response) => {
        //console.log(response);
        showAlert(true, "Tu tarea ha sido creada");
        resetForm();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const required = "*Campo Oblligatorio";

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required(required)
      .min(4, "Introduzca al menos 4 caracteres"),
    status: Yup.string().required(required),
    importance: Yup.string().required(required),
    description: Yup.string().required(required),
  });

  const formik = useFormik({ initialValues, onSubmit, validationSchema });
  const {
    handleChange,
    handleSubmit,
    errors,
    handleBlur,
    touched,
    values,
    resetForm,
  } = formik;

  return (
    <>
      <h3>Crear Tareas</h3>
      <p>Crea tu tarea</p>
      <Form onSubmit={handleSubmit}>
        <Form.Control
          placeholder="Titulo"
          className="m-1"
          name="title"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.title}
        />
        {errors.title && touched.title && (
          <Form.Text className="text-bg-danger text-light ms-1">
            {errors.title}
          </Form.Text>
        )}
        <Form.Select
          name="status"
          className="m-1"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.status}
        >
          <option value="">Seleccione una opcion</option>
          <option value="NEW">New</option>
          <option value="IN PROGRESS">In Progress</option>
          <option value="FINISHED">Finished</option>
        </Form.Select>
        {errors.status && touched.status && (
          <Form.Text className="text-bg-danger text-light ms-1">
            {errors.status}
          </Form.Text>
        )}
        <Form.Select
          name="importance"
          className="m-1"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.importance}
        >
          <option value="">Seleccione una opcion</option>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </Form.Select>
        {errors.importance && touched.importance && (
          <Form.Text className="text-bg-danger text-light ms-1">
            {errors.importance}
          </Form.Text>
        )}
        <textarea
          name="description"
          placeholder="Escribe una descripción"
          className="m-1 d-block"
          onChange={handleChange}
          value={values.description}
        ></textarea>
        {errors.description && touched.description && (
          <Form.Text className="text-bg-danger text-light ms-1">
            {errors.description}
          </Form.Text>
        )}
        <Button variant="outline-success" className="m-1 d-block" type="submit">
          Crear
        </Button>
      </Form>
    </>
  );
};

export default TaskForm;
