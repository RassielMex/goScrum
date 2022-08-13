import React from "react";
import { useParams } from "react-router-dom";

const Registered = () => {
  const { teamID } = useParams("teamID");

  return <div>Registered with team ID {teamID}</div>;
};

export default Registered;
