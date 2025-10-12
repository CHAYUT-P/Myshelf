import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";


function Shelf() {
  const [allAccount, setAllAccount] = useState([]);
  const [account,setAccount] = useState({
    username: "",
    password: "",
  })

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:4000/account")
      .then((res) => res.json())
      .then((data) => {
        setAllAccount(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: account.username,
          email: account.username,
          password: account.password,
        }),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        alert(data.error || "Login failed");
        return;
      }
  
      localStorage.setItem("token", data.token);      
      navigate("/shelves");
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };

  const handleChange = (e) => {
    setAccount({
      ...account,
      [e.target.name]: e.target.value,
    });
    console.log(account);

  };


  return (
    <div className="main">
        <div className="register-field">
            <h1>
                Login
            </h1>

            <input name="username" value={account.username} type="text" placeholder="Email / Username" onChange={handleChange}></input>
            <input name="password" value={account.password} type="text" placeholder="Password" onChange={handleChange}></input>
 
            <button onClick={handleLogin}>Login</button>
            <label>Don't have an account? <a href="/register">Register</a></label>
        </div>
    </div>
  );
}

export default Shelf;
