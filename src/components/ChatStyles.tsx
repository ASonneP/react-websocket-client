interface ChatStylesType {
  chatContainer: React.CSSProperties;
  messagesContainer: React.CSSProperties;
  getMessageStyle: (socketId?: string) => React.CSSProperties;
  inputContainer: React.CSSProperties;
  input: React.CSSProperties;
  button: React.CSSProperties;
}

// const getRandomColor = () => {
//   const letters = "0123456789ABCDEF";
//   let color = "#";
//   for (let i = 0; i < 6; i++) {
//     color += letters[Math.floor(Math.random() * 16)];
//   }
//   return color;
// };

const ChatStyles: ChatStylesType = {
  chatContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    maxWidth: "600px",
    margin: "0 auto",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  messagesContainer: {
    height: "300px",
    width: "100%",
    overflowY: "auto",
    border: "1px solid #ddd",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "4px",
    backgroundColor: "#f9f9f9",
  },
  getMessageStyle: (socketId?: string) => ({
    // backgroundColor: getRandomColor(),
    backgroundColor: "#33E0FF",
    padding: "8px",
    margin: "5px 0",
    borderRadius: "4px",
    maxWidth: "80%",
  }),
  inputContainer: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  input: {
    flexGrow: 1,
    marginRight: "8px",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px 20px",
    cursor: "pointer",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#007bff",
    color: "white",
  },
};

export default ChatStyles;
