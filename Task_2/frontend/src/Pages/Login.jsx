import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CSS/Login.css';

const checkUser = (email, password) => {
  return fetch("/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ 'email': email, 'password': password }),
  });
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [user, setUser] = useState(false);
  const [token, setToken] = useState('');

  const navigate = useNavigate();

  const onButtonClick = () => {
    setEmailError('');
    setPasswordError('');

    checkUser(email, password).then((res) => {
      if (!res.ok) throw new Error(res.status);
      else return res.text();
    }).then((text) => {
      setToken(text);
      setUser(true);
    }).catch((error) => {
      console.log('error: ' + error)
    });
  };

  return (
    user ? navigate('/product', { state: { token } }) :
      <div className={'mainContainer'}>
        <div className={'titleContainer'}>
          <div>Login</div>
        </div>
        <br />
        <div className={'inputContainer'}>
          <input
            type='email'
            value={email}
            placeholder="Email Address"
            onChange={(ev) => setEmail(ev.target.value)}
            className={'inputBox'}
          />
          <label className="errorLabel">{emailError}</label>
        </div>
        <br />
        <div className={'inputContainer'}>
          <input
            type='password'
            value={password}
            placeholder="Password"
            onChange={(ev) => setPassword(ev.target.value)}
            className={'inputBox'}
          />
          <label className="errorLabel">{passwordError}</label>
        </div>
        <br />
        <div className={'inputContainer'}>
          <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Log in'} />
        </div>
      </div>
  )
}

export default Login;