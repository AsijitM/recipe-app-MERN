import React, { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  return (
    <div className="auth">
      <Login />
      <Register />
    </div>
  );
}

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [_, setCookies] = useCookies(['access_token']);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post(
        'https://reciepe-backend.onrender.com/auth/login',
        {
          username,
          password,
        }
      );

      setCookies('access_token', result.data.token);
      window.localStorage.setItem('userID', result.data.userID);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Form
      username={username}
      password={password}
      setUsername={setUsername}
      setPassword={setPassword}
      label="Log In"
      onSubmit={onSubmit}
    />
  );
};

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('https://reciepe-backend.onrender.com/auth/register', {
        username,
        password,
      });
      alert('Registration Successful!!');
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Form
      username={username}
      password={password}
      setUsername={setUsername}
      setPassword={setPassword}
      label="Register"
      onSubmit={onSubmit}
    />
  );
};

const Form = ({
  username,
  password,
  setUsername,
  setPassword,
  label,
  onSubmit,
}) => {
  return (
    <div className="auth-container">
      <form action="submit" onSubmit={onSubmit}>
        <h2>{label}</h2>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">{label}</button>
      </form>
    </div>
  );
};
