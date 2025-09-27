import { useState, useEffect, use } from "react";
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

  const handleLogin = () => {
    // find by username OR email
    const user = allAccount.find(
      (u) =>
        (u.username === account.username || u.email === account.username) &&
        u.password === account.password
    );

    if (!user) {
      alert("Invalid username/email or password");
      return;
    }

    localStorage.setItem("activeUserId", user.id);

    navigate("/shelves");
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
