import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
      try {
        const rs = await axios.post("https://assignment-80xn.onrender.com/api/auth/login", formData, {headers: {
            "Content-Type": "application/json"
        }});
        console.log(rs);
        alert("Logged In");

    } catch (error) {
        console.log(error);
        if(error.response.status === 401){
            alert(error.response.data.msg)
        }
        else{
          alert("Error");
        }
    }
    console.log("Login Data:", formData);
  };

  return (
    <div className="login-container">
      <h2 className="login-heading">Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label className="form-label">
          Email:
          <input
            required="true"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
          />
        </label>
        <br />
        <label className="form-label">
          Password:
          <input
            required="true"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-input"
          />
        </label>
        <br />
        <button type="submit" className="form-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
