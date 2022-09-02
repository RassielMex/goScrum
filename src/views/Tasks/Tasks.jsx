import React, { useEffect, useState } from "react";
import { Col, Container, Row, Alert, Form, FormGroup } from "react-bootstrap";
import Header from "../../components/Header/Header";
import Task from "../../components/Task/Task";
import TaskForm from "../../components/TaskForm/TaskForm";
import debounce from "lodash/debounce";
import { useSelector, useDispatch } from "react-redux";
import {
  getTasks,
  deleteTask,
  editStatus,
} from "../../store/actions/tasksActions";
const Tasks = () => {
  const [list, setList] = useState([]);
  const [renderList, setRenderList] = useState([]);
  const [fromWho, setFromWho] = useState("");
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    //const endPoint = `${API_END_POINT}task${fromWho}`;
    // const endPoint = "https://goscrum-api.alkemy.org/task";
    // const headers = {
    //   "Content-Type": "application/json",
    //   Authorization: "Bearer " + localStorage.getItem("token"),
    // };
    // axios.get(endPoint, { headers }).then((response) => {
    //   setList(response.data.result);
    //   setRenderList(response.data.result);
    // });
    dispatch(getTasks(fromWho));
  }, [fromWho, dispatch]);

  const { tasks } = useSelector((state) => {
    return state.taskReducer;
  });

  useEffect(() => {
    //console.log("Task changed");
    if (tasks?.length > 0) {
      setList(tasks);
      setRenderList(tasks);
    } else {
      //console.log("task == 0");
      setList([]);
      setRenderList([]);
    }
  }, [tasks]);

  useEffect(() => {
    if (search) {
      setRenderList(list.filter((task) => task.title.startsWith(search)));
    } else {
      setRenderList(list);
    }
  }, [search, list]);

  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const handleShowAlert = (show, message) => {
    setShowAlert(show);
    setMessage(message);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };

  const handleChangeImportance = (event) => {
    if (event.currentTarget.value === "ALL") {
      setRenderList(list);
    } else {
      setRenderList(
        list.filter((task) => task.importance === event.currentTarget.value)
      );
    }
  };

  const handleFromWhoChange = (event) => {
    const id = event.currentTarget.id;
    if (id === "me") {
      setFromWho("me");
    } else {
      setFromWho("");
    }
  };

  const handleSearch = debounce((event) => {
    setSearch(event?.target?.value);
  }, 1000);

  const handleDeleteTask = (id) => {
    //console.log(id);
    dispatch(deleteTask(id));
  };

  const handleEditStatus = (task) => {
    dispatch(editStatus(task));
  };

  const renderNewTasks = renderList.filter((task) => task.status === "NEW");
  const renderInProgressTasks = renderList.filter(
    (task) => task.status === "IN PROGRESS"
  );
  const renderFinishedTasks = renderList.filter(
    (task) => task.status === "FINISHED"
  );

  return (
    <>
      <Header />
      <Alert
        variant="success"
        show={showAlert}
        dismissible
        transition={true}
        onClose={() => {
          setShowAlert(false);
        }}
      >
        {message}
      </Alert>
      <Container fluid className="bg-light">
        <Container>
          <Row>
            <Col lg={4}>
              <TaskForm showAlert={handleShowAlert} />
            </Col>
            <Col>
              <h3 className="mt-4">Mis tareas</h3>
              <Form className="mb-3">
                <FormGroup>
                  <Form.Check
                    label="Todas"
                    type="radio"
                    name="Tareas"
                    inline
                    id="all"
                    onChange={handleFromWhoChange}
                  />
                  <Form.Check
                    label="Mis tareas"
                    type="radio"
                    name="Tareas"
                    inline
                    id="me"
                    onChange={handleFromWhoChange}
                  />
                </FormGroup>
                <Form.Control
                  type="text"
                  placeholder="Búsqueda...."
                  onChange={handleSearch}
                  className="my-1"
                />
                <FormGroup>
                  <Form.Select
                    name="importance"
                    onChange={handleChangeImportance}
                  >
                    <option value="">Seleccione una...</option>
                    <option value="ALL">ALL</option>
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                  </Form.Select>
                </FormGroup>
              </Form>
              <Row>
                <Col md={4}>
                  {renderNewTasks?.map((task) => {
                    return (
                      <Task
                        key={task?._id}
                        task={task}
                        onDelete={handleDeleteTask}
                        onEditSatus={handleEditStatus}
                      />
                    );
                  })}
                </Col>
                <Col md={4}>
                  {renderInProgressTasks.map((task) => {
                    return (
                      <Task
                        key={task?._id}
                        task={task}
                        onDelete={handleDeleteTask}
                        onEditSatus={handleEditStatus}
                      />
                    );
                  })}
                </Col>
                <Col md={4}>
                  {renderFinishedTasks.map((task) => {
                    return (
                      <Task
                        key={task?._id}
                        task={task}
                        onDelete={handleDeleteTask}
                        onEditSatus={handleEditStatus}
                      />
                    );
                  })}
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default Tasks;
