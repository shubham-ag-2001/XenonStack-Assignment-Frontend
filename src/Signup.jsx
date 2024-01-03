import React, { useState } from "react";
import axios from "axios";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
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
    if(formData.phoneNumber.length !== 10){
        alert('Phone Number not valid')
        return;
    }
    // Basic form validation
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
        const rs = await axios.post("https://assignment-80xn.onrender.com/api/auth/register", formData, {headers: {
            "Content-Type": "application/json"
        }});
        console.log(rs);
        alert("User Created");
    } catch (error) {
        console.log(error);
        if(error.response.status === 401){
            alert(error.response.data.msg)
        }
        alert("Error");
    }
    // You can perform additional actions with the form data here
    console.log("Form Data:", formData);
  };

  return (
    <div className="sign-up-container">
      <h2 className="sign-up-heading">Sign Up</h2>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <label className="form-label">
          Name:
          <input
            required="true"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-input"
          />
        </label>
        <br />
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
          Phone Number:
          <input
            required="true"
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
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
        <label className="form-label">
          Confirm Password:
          <input
            required="true"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="form-input"
          />
        </label>
        <br />
        <button type="submit" className="form-button">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
