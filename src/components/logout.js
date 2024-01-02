import React, { useEffect } from "react";
import history from "../history";
//redux
import { connect } from "react-redux";
import { resetGlobal } from "../redux/actions/global";
import { logOut } from "../redux/actions";

const Logout = ({ resetGlobal, logOut }) => {
  useEffect(() => {
    resetGlobal();
    logOut();
    history.push("/");
  }, []);

  return null;
};

export default connect(null, { logOut, resetGlobal })(Logout);
