import React from "react";
import { Container, Navbar } from "react-bootstrap";
import { BiLogOut } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  const navigate = useNavigate();
  const handleLogOut = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userName");
    navigate("/Login", { replace: true });
  };

  const { tasks } = useSelector((state) => state.tasks);

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="">Go Scrum</Navbar.Brand>
        <Container className="d-flex justify-content-end align-content-center align-items-center">
          <p className="me-1 mb-0 text-white">Tareas creadas:{tasks?.length}</p>
          <p className="me-1 mb-0 text-white">
            {sessionStorage.getItem("userName")}
          </p>
          <BiLogOut size={"1.5em"} color="white" onClick={handleLogOut} />
        </Container>
      </Container>
    </Navbar>
  );
};

export default Header;
