import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";



function Home() {
    const [user, setUser] = useState(null);
    const [shelves, setShelves] = useState([]);
    const navigate = useNavigate();
  
    useEffect(() => {
      const userId = localStorage.getItem("activeUserId");
      if (!userId) {
        navigate("/login");
        return;
      }
  
      // fetch active user
      fetch("http://localhost:4000/activeAccount")
        .then(res => res.json())
        .then(data => setUser(data));
  
      // fetch shelves
      fetch(`http://localhost:4000/accountShelf?userId=${userId}`)
        .then(res => res.json())
        .then(data => setShelves(data));
    }, []);

    return(
    <div>
        <nav>
            <div className="logo">
                <a>MyShelf</a>
            </div>
            <div className="all-right-items">
                <div className="nav-items">
                    <a href="/login">About</a>
                    <a href="/shelves">shelves</a>
                </div>
                <div className="get-started">
                    <a href="/register">Get started</a>
                </div>
            </div>
        </nav>

        <div>
            
        </div>
    </div>)
}

export default Home;
