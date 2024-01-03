import React, { useState } from "react";
import axios from "axios";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
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
    if(formData.phone.length !== 10){
        alert('Phone Number not valid')
        return;
    }
    try {
        const rs = await axios.post("https://assignment-80xn.onrender.com/api/contact", formData, {headers: {
            "Content-Type": "application/json"
        }});
        console.log(rs);
        alert("Message Recieved");
    } catch (error) {
        console.log(error);
        if(error.response.status === 401){
            alert(error.response.data.msg)
        }
        alert("Error");
    }
    console.log("Form Data:", formData);
  };
  return (
    <div className="contact">
      <h1>Kindly fill the form below to contact.</h1>
      <div className="forming">
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              required="true"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Email:
            <input
              required="true"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Phone Number :
            <input
              required="true"
              type="number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Message:
            <textarea
              required="true"
              name="message"
              value={formData.message}
              onChange={handleChange}
            />
          </label>
          <br />
          <button className="submitbt" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
