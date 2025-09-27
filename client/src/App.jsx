import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Shelf from "./pages/shelf/Shelf";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";


function App() {
  return (
    <Router>
      <Routes>
        {/* หน้าแรก */}
        <Route path="/" element={<Home/>} />
        <Route path="/shelves" element={<Shelf/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />

      </Routes>
    </Router>
  );
}

export default App;