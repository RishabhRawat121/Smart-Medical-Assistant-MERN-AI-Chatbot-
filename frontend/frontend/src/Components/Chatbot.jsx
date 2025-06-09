import React, { useState } from "react";
import axios from "axios";
import  "../../src/index.css"

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input.trim()) return;

    const date = new Date();
    const strTime = `${date.getHours()}:${date.getMinutes()}`;

    const userMessage = {
      sender: "user",
      text: input,
      time: strTime,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const response = await axios.post("http://localhost:8080/get", { msg: input });
      const botMessage = {
        sender: "bot",
        text: response.data,
        time: strTime,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message", error);
    }
  };

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center h-100">
        <div className="col-md-8 col-xl-6 chat">
          <div className="card">
            <div className="card-header msg_head">
              <div className="d-flex bd-highlight">
                <div className="img_cont">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/387/387569.png"
                    className="rounded-circle user_img"
                    alt="bot"
                  />
                  <span className="online_icon"></span>
                </div>
                <div className="user_info">
                  <span>Medical Chatbot</span>
                  <p>Ask me anything!</p>
                </div>
              </div>
            </div>

            <div className="card-body msg_card_body" id="messageFormeight">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`d-flex mb-4 justify-content-${
                    msg.sender === "user" ? "end" : "start"
                  }`}
                >
                  {msg.sender === "bot" && (
                    <div className="img_cont_msg">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/387/387569.png"
                        className="rounded-circle user_img_msg"
                        alt="bot"
                      />
                    </div>
                  )}
                  <div
                    className={`msg_cotainer${
                      msg.sender === "user" ? "_send" : ""
                    }`}
                  >
                    {msg.text}
                    <span
                      className={`msg_time${
                        msg.sender === "user" ? "_send" : ""
                      }`}
                    >
                      {msg.time}
                    </span>
                  </div>
                  {msg.sender === "user" && (
                    <div className="img_cont_msg">
                      <img
                        src="https://i.ibb.co/d5b84Xw/Untitled-design.png"
                        className="rounded-circle user_img_msg"
                        alt="user"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="card-footer">
              <form className="input-group" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="msg"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  autoComplete="off"
                  className="form-control type_msg"
                  required
                />
                <div className="input-group-append">
                  <button type="submit" className="input-group-text send_btn">
                    <i className="fas fa-location-arrow"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
