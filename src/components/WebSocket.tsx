import { useContext, useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { WebsocketContext } from "../contexts/WebSocketContext";
import "./Websocket.css";
import { FaPaperPlane, FaUserFriends } from "react-icons/fa";

type MessagePayload = {
  content: string;
  msg: string;
};

export const Websocket = () => {
  const { roomName } = useParams(); // Assuming you're using React Router and have a route like /chat/:roomName
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState<MessagePayload[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<number>(0);
  const socket = useContext(WebsocketContext);

  const endOfMessagesRef = useRef<null | HTMLDivElement>(null);
  const prevUserCountRef = useRef<number>(0); // Store the previous user count

  useEffect(() => {
    if (socket) {
      // Join the room upon connecting
      socket.emit("joinRoom", { room: roomName, username: "SomeUsername" }); // Replace "SomeUsername" with the actual username

      // Listen for messages and user count
      socket.on("onMessage", (newMessage: MessagePayload) => {
        console.log("onMessage event received", newMessage);
        setMessages((prev) => [...prev, newMessage]);
      });
      socket.on("userCount", (count: number) => {
        // Check if the incoming user count is different from the previous one
        if (count !== prevUserCountRef.current) {
          setOnlineUsers(count);
          // Update the previous user count reference
          prevUserCountRef.current = count;
        }
      });

      return () => {
        console.log("Unregistering Events...");
        // Clean up event listeners
        socket.off("onMessage");
        socket.off("userCount");
      };
    }
  }, [socket, roomName]);

  const onSubmit = () => {
    if (value.trim()) {
      socket.emit("newMessage", { room: roomName, message: value });
      setValue("");
    }
  };

  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <div className="websocket-container">
      {/* Chat UI */}
      <div className="chat-window">
        <div className="chat-header">
          <div className="online-users">
            <FaUserFriends /> <span>{onlineUsers}</span>
          </div>
          <div className="web-chat">Web Chat 💬</div>
        </div>
        <div className="chat-body">
          {messages.map((msg, index) => (
            <div key={index} className="message">
              <p>{msg.content}</p>
            </div>
          ))}
          <div ref={endOfMessagesRef} />
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
