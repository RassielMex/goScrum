import React from "react";
import { Container, Navbar } from "react-bootstrap";
import { BiLogOut } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate("/Login", { replace: true });
  };

  const { tasks } = useSelector((state) => state.taskReducer);

  return (
    <Navbar bg="success" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Go Scrum</Navbar.Brand>
        {/* <Nav className="me-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav> */}
        <Container className="d-flex justify-content-end align-content-center align-items-center">
          <p className="me-1 mb-0 text-light ">
            Tareas creadas:{tasks?.length}
          </p>
          <p className="me-1 mb-0 text-light">
            {localStorage.getItem("userName")}
          </p>
          <BiLogOut size={"1.5em"} color="white" onClick={handleLogOut} />
        </Container>
      </Container>
    </Navbar>
  );
};

export default Header;
