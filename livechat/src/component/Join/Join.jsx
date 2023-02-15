import React, { useState } from "react";
import "./join.css";
import { NavLink } from "react-router-dom";

let user;

const sendUser = () => {
  user = document.getElementById("joininput").value;
  document.getElementById("joininput").value = "";
};

let logo =
  "https://th.bing.com/th/id/OIP.g4tJ61XEo38jNk7ULfk-iQHaH3?w=157&h=180&c=7&r=0&o=5&dpr=1.2&pid=1.7";

const Join = () => {
  const [name, setName] = useState("");

  return (
    <div className="JoinPage">
      <div className="JoinContainer">
        <img src={logo} alt="logo" />
        <h1>Live Chat</h1>
        <input
          type="text"
          id="joininput"
          placeholder="Enter Your Name"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <NavLink
          onClick={(e) => !name ? e.preventDefault() : null}
          to="/chat"
        >
          <button className="joinbtn" onClick={sendUser}>
            Log in
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default Join;
export { user };
