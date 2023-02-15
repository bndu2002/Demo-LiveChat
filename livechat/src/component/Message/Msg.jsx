import React from "react";
import "./msg.css";

function Msg({ user, message, classs }) {
  if (user) {
    return (
      <div className={`msgbox left ${classs}`}>{`${user}:${message}`}</div>
    );
  } else {
    return <div className={`msgbox right ${classs}`}>{`You : ${message}`}</div>;
  }
}

export default Msg;
