
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Websocket } from './components/WebSocket'; 
import Homepage from './components/Homepage'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/chat/:roomName" element={<Websocket />} />
      </Routes>
    </Router>
  );
}

export default App;

