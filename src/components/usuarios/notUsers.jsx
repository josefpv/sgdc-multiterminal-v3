import React from "react";

const NotUsers = () => {
  return (
    <React.Fragment>
      <h1
        className="display-1"
        style={{ color: "#fc0303", textAlign: "center" }}
      >
        <i className="fa fa-users"></i>
      </h1>
      <p style={{ textAlign: "center" }} className="lead">
        No hay usuarios registrados
      </p>
    </React.Fragment>
  );
};

export default NotUsers;
