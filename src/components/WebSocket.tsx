import { useContext, useEffect, useState } from "react";
import { WebsocketContext } from "../contexts/WebSocketContext";
import "./Websocket.css"; // Import the CSS file for styling
import { FaPaperPlane } from "react-icons/fa"; // Import an icon from react-icons

type MessagePayload = {
  content: string;
  msg: string;
};

export const Websocket = () => {
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState<MessagePayload[]>([]);
  const socket = useContext(WebsocketContext);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected!");
    });
    socket.on("onMessage", (newMessage: MessagePayload) => {
      console.log("onMessage event received");
      console.log(newMessage);
      setMessages((prev) => [...prev, newMessage]);
    });
    return () => {
      console.log("Unregistering Events...");
      socket.off("connect");
      socket.off("onMessage");
    };
  }, [socket]);

  const onSubmit = () => {
    socket.emit("newMessage", value);
    setValue("");
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <div className="websocket-container">
      <div className="chat-window">
        <div className="chat-header">Web Chat 💬</div>
        <div className="chat-body">
          {messages.map((msg, index) => (
            <div key={index} className="message">
              <p>{msg.content}</p>
            </div>
          ))}
        </div>
        <div className="chat-footer">
          <input
            type="text"
            placeholder="Type a message..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="message-input"
          />
          <button onClick={onSubmit} className="send-button">
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
};
