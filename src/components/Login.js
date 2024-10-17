import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";
import picLogin from "../img/login.png";

export const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  axios.defaults.withCredentials = true;

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("https://mernstackquiz-8.onrender.com/login", {
        email,
        password,
      })
      .then((res) => {
        if (res.data.status === "Success") {
          if (res.data.role === "admin") {
            navigate("/teacher");
          } else {
            navigate("/");
            return navigate(`/`, {
              state: { email: email, password: password },
            });
          }
        }

        //navigate('/')
        // console.log(res.data);
      })
      .catch((err) => alert(err));
  };

  return (
    <div className="loginContainer">
      <div className="panel-lite">
        <div className="thumbur">
          <img src={picLogin} alt="" />
        </div>
        <h4>Login</h4>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              required="required"
            />
            <label className="form-label">البريد الالكتروني </label>
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              required="required"
            />
            <label className="form-label"> كلمة السر</label>
          </div>
          <Link to="/register">
            <a href="#"> سجل حساب الان</a>
          </Link>
          <button className="floating-btn">
            <i className="icon-arrow" />
          </button>
        </form>
      </div>
    </div>
  );
};
