import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Logo from '../assets/logo.svg'
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from '../utils/APIRoutes';

export default function Login() {

  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });


  useEffect(() => {
    if (localStorage.getItem('chat-user-app')) {
      navigate("/");
    }
  }, []);


  const handleChange = (e) => {

    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  }

  const handleValidation = () => {
    const { username, password } = values;
    if (username === "") {
      toast.error("Email and Password is required.");
      return false;
    } else if (password === "") {
      toast.error("Email and Password is required.");
      return false;
    }
    return true;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (handleValidation()) {
      const { username, password } = values;

      // loginRoute url defined in assets
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg);
      }
      if (data.status === true) {
        localStorage.setItem(
          'chat-user-app',
          // User data stored in JSON string 
          JSON.stringify(data.user)
        );
        navigate("/");
      }

    }
  }

  return (
    <>
      <FormContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="header">
            <img src={Logo} alt="logo" />
            <h1>Chatter</h1>
          </div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            min="3"
            onChange={(e) => handleChange(e)}
          />
          <input
            placeholder="Password"
            type="password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Log In</button>
          <span>
            New User ? <Link to="/register">Click to register</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  )
}


const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;

  .header {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`