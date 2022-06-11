import './App.css';
import Sidebar from './Components/Sidebar/Sidebar.js'
import ChatSection from './Components/Chat/ChatSection.js'

function App() {
  return (
    <div className="app">
      <div className="appBody">
        <Sidebar />
        <ChatSection />
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
