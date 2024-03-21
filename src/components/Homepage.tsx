import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const [roomName, setRoomName] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleJoin = () => {
    if (!roomName || !username) return; // Basic validation
    navigate(`/chat/${roomName}?username=${username}`);
  };

  const handleCreate = () => {
    if (!roomName || !username) return; // Basic validation
    navigate(`/chat/${roomName}?username=${username}`);
    // You might want to handle the case where the room already exists differently
  };

  return (
    <div>
      <h2>Create or Join a Room</h2>
      <div>
        <input
          type="text"
          placeholder="Room Name"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <button onClick={handleJoin}>Join Room</button>
        <button onClick={handleCreate}>Create Room</button>
      </div>
    </div>
  );
};

export default Homepage;
