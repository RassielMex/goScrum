import React, { useState } from "react";
import { Badge, Button, Card, CloseButton, Col, Row } from "react-bootstrap";

const Task = ({ task, onDelete, onEditSatus }) => {
  const [showLessButton, setShowLessButton] = useState(false);
  const {
    _id,
    title,
    createdAt,
    user: { userName },
    description,
    status,
    importance,
  } = task;

  const dateTime = new Date(createdAt).toDateString();
  const limitString = (str) => {
    if (str.length > 170) {
      return { string: str.slice(0, 167).concat("..."), addButton: true };
    }
    return { string: str, addButton: false };
  };

  return (
    <Card className="mb-2 p-3">
      <Row>
        <Col xs={10}>
          <h5>{title}</h5>
          <p>{dateTime}</p>
          <h6>{userName}</h6>
          <Badge
            bg={
              status === "NEW"
                ? "info"
                : status === "IN PROGRESS"
                ? "secondary"
                : "success"
            }
            className="me-1 mb-1"
            onClick={() => {
              onEditSatus(task);
            }}
          >
            {status}
          </Badge>
          <Badge
            bg={
              importance === "LOW"
                ? "primary"
                : importance === "MEDIUM"
                ? "warning"
                : "danger"
            }
            className="me-1"
          >
            {importance}
          </Badge>
          <p>{!showLessButton && limitString(description).string}</p>
          {!showLessButton && limitString(description).addButton && (
            <Button
              size="sm"
              variant="outline-primary"
              className="me-1"
              onClick={() => {
                setShowLessButton(true);
              }}
            >
              Ver mas...
            </Button>
          )}
          {showLessButton && limitString(description).addButton && (
            <>
              <p>{description}</p>
              <Button
                size="sm"
                variant="outline-primary"
                className="me-1"
                onClick={() => {
                  setShowLessButton(false);
                }}
              >
                ver menos
              </Button>
            </>
          )}
        </Col>
        <Col xs={2} className="d-flex justify-content-end">
          <CloseButton
            onClick={() => {
              onDelete(_id);
            }}
          ></CloseButton>
        </Col>
      </Row>
    </Card>
  );
};

export default Task;
