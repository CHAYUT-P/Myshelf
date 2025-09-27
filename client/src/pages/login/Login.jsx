import { useState, useEffect } from "react";
import "./Login.css";


function Shelf() {
  const [account, setAccount] = useState({});

  return (
    <div className="main">
        <div className="register-field">
            <h1>
                Login
            </h1>

            <input value={account.email} type="text" placeholder="Email / Username"></input>
            <input value={account.password} type="text" placeholder="Password"></input>
            
            <button>Register</button>
            <label>Don't have an account? <a href="/register">Register</a></label>
        </div>
    </div>
  );
}

export default Shelf;
