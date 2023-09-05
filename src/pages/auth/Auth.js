import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const handleLogin = async () => {
    try {
      const userData = {
        login: email,
        password: password,
      };

      let response = await fetch('http://localhost:8080/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
      }

      let data = await response.json();
      console.log("Дані після спроби авторизації:", data);

      if (data.jwtToken) {
        const { jwtToken } = data;

        localStorage.setItem('jwtToken', jwtToken);
        login(jwtToken);

        console.log("Отриманий JWT токен:", jwtToken);

        response = await fetch('http://localhost:8080/api/student', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'Authorization': 'Bearer ' + jwtToken
          }
        });

        if (!response.ok) {
          throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
        }

        const studentData = await response.json();
        console.log("Дані студента:", studentData);

        const { learningGroup, role: newRole } = studentData;
        localStorage.setItem('userRole', newRole);
        login(jwtToken, newRole);

        if(learningGroup) {
          navigate('/'); 
        } else {
          navigate('/guest'); 
        }

      } else {
        setLoginError('Невірний логін або пароль');
      }

    } catch (error) {
      console.error('Помилка при авторизації:', error);
      alert('Сталася помилка при авторизації.');
    }
  };


  const handleRegister = async () => {
    try {
      const userData = {
        login: email,
        password: password,
      };

      const response = await fetch('http://localhost:8080/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Дані після реєстрації:", data);
      alert('Ви зареєстровані!');
    } catch (error) {
      console.error('Помилка при реєстрації:', error);
      alert('Сталася помилка при реєстрації.');
    }
  };

  return (
    <div className="main">
      <h2>Авторизація / Реєстрація</h2>
      <input
        type="email"
        value={email}
        onChange={handleInputChange(setEmail)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={handleInputChange(setPassword)}
        placeholder="Пароль"
      />
      <button onClick={handleLogin}>Увійти</button>
      <button onClick={handleRegister}>Зареєструватися</button>
      {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
    </div>
  );
}

export default Auth;
