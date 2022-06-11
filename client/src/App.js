import './App.css';
import Sidebar from './Components/Sidebar/Sidebar.js'
import Chat from './Components/Chat/Chat.js'

function App() {
  return (
    <div className="app">
      <div className="appBody">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}

export default App;
// +---------+-------------------+
// |         |                   |
// |         +-------------------+
// +---------+                   |
// |         |                   |
// |         |                   |
// | Sidebar |   Chat Component  |
// |         |                   |
// |         |                   |
// |         |                   |
// |         |                   |
// |         |                   |
// +---------+-------------------+
