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




// // import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import React, { createContext, useContext, useState } from 'react';

// const AuthContext = createContext();

// export const useAuth = () => {
//     return useContext(AuthContext);
// };




// export const AuthProvider = ({ children }) => {
//   const initialToken = localStorage.getItem('jwtToken');
//   const initialUserRole = localStorage.getItem('userRole');

//   const [jwtToken, setJwtToken] = useState(initialToken);
//   const [userRole, setUserRole] = useState(initialUserRole);

//   const login = (token, role) => {
//       localStorage.setItem('jwtToken', token);
//       localStorage.setItem('userRole', role);
//       setJwtToken(token);
//       setUserRole(role);
//   };

//   const logout = () => {
//       localStorage.removeItem('jwtToken');
//       localStorage.removeItem('userRole');
//       setJwtToken(null);
//       setUserRole(null);
//   };

//   const contextValue = {
//       isAuthenticated: Boolean(jwtToken),
//       userRole: userRole,
//       login: login,
//       logout: logout
//   };

//   return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
// };







// // import { instance } from "./../../api.config";

// function Auth() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loginError, setLoginError] = useState(null);
//   const navigate = useNavigate();

//   const handleInputChange = (setter) => (e) => {
//     setter(e.target.value);
//   };

//   const makeRequest = async (url, onSuccess) => {
//     try {
//       const userData = {
//         login: email,
//         password: password,
//       };
      
//       const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(userData),
//       });

//       if (!response.ok) {
//         throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
//       }

//       const data = await response.json();
//       onSuccess(data);
//     } catch (error) {
//       console.error(`Помилка при ${url === 'auth' ? 'авторизації' : 'реєстрації'}:`, error);
//       alert(`Сталася помилка при ${url === 'auth' ? 'авторизації' : 'реєстрації'}.`);
//     }
//   };

//   const handleLogin = async () => {
//     try {
//       const userData = {
//         login: email,
//         password: password,
//       };
//       console.log(`Відправка запиту до http://localhost:8080/auth з даними:`, userData);
  
//       let response = await fetch('http://localhost:8080/auth', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(userData),
//       });
  
//       if (!response.ok) {
//         throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
//       }
  
//       console.log(`Відповідь від http://localhost:8080/auth:`, response);
  
//       let data = await response.json();
//       console.log("Дані після спроби авторизації:", data);
  
//       if (data.jwtToken) {
//         localStorage.setItem('jwtToken', data.jwtToken);
//         console.log("Отриманий JWT токен:", data.jwtToken);
  
//         response = await fetch('http://localhost:8080/api/student', {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             'Cache-Control': 'no-cache',
//             'Authorization': 'Bearer ' + data.jwtToken
//           }
//         });
  
//         if (!response.ok) {
//           throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
//         }
  
//         console.log("Відповідь від /student:", response);
//         const studentData = await response.json();
//         console.log("Дані студента:", studentData);

//         // встановити userRole в localStorage та стан компоненту
//         const role = studentData.role; // отримати роль з даних студента
//         localStorage.setItem('userRole', role);
//         useAuth().login(data.jwtToken, role);
  
//         if(studentData.learningGroup) {
//           navigate('/'); 
//         } else {
//           navigate('/guest'); 
//         }
  
//       } else {
//         setLoginError('Невірний логін або пароль');
//       }
  
//     } catch (error) {
//       console.error('Помилка при авторизації:', error);
//       alert('Сталася помилка при авторизації.');
//     }
//   };

  

//   const handleRegister = () => {
//     makeRequest('http://localhost:8080/register', (data) => {
//       console.log("Дані після реєстрації:", data);
//       alert('Ви зареєстровані!');
//     });
//   };

//   return (
//     <div className="main">
//       <h2>Авторизація / Реєстрація</h2>
//       <input
//         type="email"
//         value={email}
//         onChange={handleInputChange(setEmail)}
//         placeholder="Email"
//       />
//       <input
//         type="password"
//         value={password}
//         onChange={handleInputChange(setPassword)}
//         placeholder="Пароль"
//       />
//       <button onClick={handleLogin}>Увійти</button>
//       <button onClick={handleRegister}>Зареєструватися</button>
//       {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
//     </div>
//   );
// }

// export default Auth;


















// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// function Auth() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loginError, setLoginError] = useState(null);

//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//   };

//   const handlePasswordChange = (e) => {
//     setPassword(e.target.value);
//   };

//   const navigate = useNavigate();

//   const handleLogin = () => {
//     const userData = {
//       login: email,
//       password: password,
//     };

//     // Perform a POST request to the server for login
//     fetch('http://localhost:8080/auth', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(userData),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.jwtToken) {
//           // Save JWT token in localStorage
//           localStorage.setItem('jwtToken', data.jwtToken);
//           setLoginError(null);
//           navigate('/guest'); // Use navigate instead of history.push
//         } else {
//           setLoginError('Невірний логін або пароль');
//         }
//       })
//       .catch((error) => {
//         console.error('Помилка при авторизації:', error);
//         setLoginError('Сталася помилка при авторизації.');
//       });
//   };

//   const handleRegister = () => {
//     const userData = {
//       login: email,
//       password: password,
//     };

//     // Perform a POST request to the server for registration
//     fetch('http://localhost:8080/register', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(userData),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         // Handle the response data for successful registration
//         alert('Ви зареєстровані!');
//       })
//       .catch((error) => {
//         console.error('Помилка при реєстрації:', error);
//         alert('Сталася помилка при реєстрації.');
//       });
//   };

//   // Cleanup function to remove JWT token on component unmount
//   useEffect(() => {
//     return () => {
//       localStorage.removeItem('jwtToken');
//     };
//   }, []);

//   return (
//     <div className="main">
//       <h2>Авторизація / Реєстрація</h2>
//       <input
//         type="email"
//         value={email}
//         onChange={handleEmailChange}
//         placeholder="Email"
//       />
//       <input
//         type="password"
//         value={password}
//         onChange={handlePasswordChange}
//         placeholder="Пароль"
//       />
//       <button onClick={handleLogin}>Увійти</button>
//       <button onClick={handleRegister}>Зареєструватися</button>
//       {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
//     </div>
//   );
// }

// export default Auth;
