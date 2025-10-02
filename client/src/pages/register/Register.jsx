import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Shelf() {
  const [account, setAccount] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [allAccount, setAllAccount] = useState([]);
  const [emailExists, setEmailExists] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:4000/account")
      .then((res) => res.json())
      .then((data) => setAllAccount(data))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    const updated = { ...account, [e.target.name]: e.target.value };
    setAccount(updated);

    if (e.target.name === "email" && allAccount.length > 0) {
      const exists = allAccount.some((a) => a.email === e.target.value);
      setEmailExists(exists);
    }
  };

  const handleRegister = async () => {
    if (emailExists) {
      alert("This email is already registered!");
      return;
    }

    if (account.password !== account.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (
      !account.password ||
      !account.email ||
      !account.username ||
      !account.confirmPassword
    ) {
      alert("All fields are required!");
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: account.email,
          username: account.username,
          password: account.password,
        }),
      });

      if (!res.ok) throw new Error("Failed to register");

      const data = await res.json();

      // ✅ store JWT token
      localStorage.setItem("token", data.token);

      // ✅ redirect after registration
      navigate("/shelves");
    } catch (err) {
      console.error("Error registering:", err);
      alert("Registration failed.");
    }
  };

  return (
    <div className="main">
      <div className="register-field">
        <h1>Create Account</h1>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={account.email}
          onChange={handleChange}
        />
        <input
          name="username"
          type="text"
          placeholder="Username"
          value={account.username}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={account.password}
          onChange={handleChange}
        />
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          value={account.confirmPassword}
          onChange={handleChange}
        />

        <button onClick={handleRegister}>Register</button>
        <label>
          Already have an account? <a href="/login">Login</a>
        </label>
      </div>
    </div>
  );
}

export default Shelf;