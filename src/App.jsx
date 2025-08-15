import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Leftbar from './components/Leftbar/Sidebar'
import Topbar from './components/Topbar/Topbar'

function App() {
  const [isLeftbarOpen, setIsLeftbarOpen] = useState(false);

  const toggleLeftbar = () => {
    setIsLeftbarOpen(!isLeftbarOpen);
  };

  return (
    <div>
      <Topbar isOpen={isLeftbarOpen} toggleOpen={toggleLeftbar} />
      <Leftbar isOpen={isLeftbarOpen} />
      {/* other content */}
    </div>
  );
}


export default App
