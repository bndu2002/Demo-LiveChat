import React, { useEffect, useState } from "react";
import ReactScrollToBottom from "react-scroll-to-bottom";
import { user } from "../Join/Join";
import Msg from "../Message/Msg";
import "./chat.css";
import socketIo from "socket.io-client";

let socket;
const ENDPOINT = "http://localhost:4500/";

const Chat = () => {
  const [id, setId] = useState("");
  const [msgs, setmsgs] = useState([]);

  const send = () => {
    let message = document.getElementById("chatinput").value;

    socket.emit("message", { message, id });
    document.getElementById("chatinput").value = "";
  };

  console.log(msgs);

  useEffect(() => {
    socket = socketIo(ENDPOINT, { transports: ["websocket"] });

    socket.on("connect", () => {
      setId(socket.id);
    });

    socket.emit("joined", { user });

    socket.on("welcome", (data) => {
      setmsgs([...msgs, data]);
      console.log(data.user, data.message);
    });

    socket.on("userJoined", (data) => {
      setmsgs([...msgs, data]);
      console.log(data.user, data.message);
    });

    socket.on("user left", (data) => {
      setmsgs([...msgs, data]);
      console.log(data.user, data.message);
    });

    return () => {
      socket.on("disconnect");
      socket.off();
    }},[]);

  useEffect(() => {
    socket.on("sendMessage", (data) => {
      setmsgs([...msgs, data]);
      console.log(data);
    });
    return () => {
      socket.off();
    };
  }, [msgs]);

  return (
    <div className="chatpage">
      <div className="chatcontainer">
        <div className="header">
            <h2>Live Chat</h2>
            {/* add a button here */}
            <a href="/"><h1>❌</h1></a>
            
        </div>
        <ReactScrollToBottom className="chatbox">
          {
          msgs.map((val, ind) => {
            console.log("val",val)
            return (
              <Msg
                user= {val.id === id ? "" : val.user}
                message={val.message}
                classs={val.id === id ? "right" : "left"}
              />
            );
          })
          }
        </ReactScrollToBottom>
        <div className="inputbox">
          <input onKeyDown = {(event)=>{return event.keyCode === 13 ? send() : null}} type="text" id="chatinput" />
          <button onClick={send} className="sendbtn">
            <h1>✈</h1>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
