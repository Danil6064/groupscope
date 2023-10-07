import React from "react";
import { redirect, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { apiUrl, url } from "../../helpers/MainConstants";
import "./auth.css";

export default function Auth() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleGoogleSuccess = async (response) => {
    try {
      console.log(
        "Full Google Sign In response:",
        JSON.stringify(response, null, 2)
      );

      const googleToken = response.credential;
      console.log("Received Google Token:", googleToken);

      const decoded = jwt_decode(googleToken);
      console.log("Decoded Google Token:", decoded);

      const learnerName = decoded.given_name;
      const learnerLastname = decoded.family_name;
      const pictureUrl = decoded.picture;
      localStorage.setItem("userPicture", pictureUrl);

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
        body: JSON.stringify({
          idToken: googleToken,
          learnerName: learnerName,
          learnerLastname: learnerLastname,
        }),
      };

      console.log("Sending request to server with options:", requestOptions);

      let res = await fetch(`${url}/oauth2`, requestOptions);
      console.log("Server Response:", res);

      if (!res.ok) {
        console.error("Server Error Response:", await res.text());
        return;
      }

      const data = await res.json();
      console.log("Received data from server after auth:", data);

      if (data.jwtToken) {
        const jwtToken = data.jwtToken;
        localStorage.setItem("jwtToken", jwtToken);
        login(jwtToken);
        console.log("Отриманий JWT токен:", jwtToken);

        res = await fetch(`${apiUrl}/student`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
            Authorization: "Bearer " + jwtToken,
          },
        });

        const studentData = await res.json();
        console.log("Received student data:", studentData);

        const { learningGroup, role: newRole } = studentData;
        localStorage.setItem("learningGroup", learningGroup);
        localStorage.setItem("userRole", newRole);

        // if (learningGroup) {
        //   const newWindow = window.open("/", "_blank");
        //   if (newWindow) newWindow.opener = null;
        //   window.close();
        // } else {
        //   const newWindow = window.open("/guest", "_blank");
        //   if (newWindow) newWindow.opener = null;
        //   window.close();
        // }

        if(learningGroup) {
                  navigate('/');
                } else {
                  navigate('/guest');
                }
      } else {
        console.error("JWT token not found");
      }
    } catch (error) {
      console.error("Error while communicating with server:", error);
    }
  };

  const handleGoogleFailure = (response) => {
    console.error("Google Sign In was unsuccessful:", response);
  };

  return (
    <div className="auth-container">
      <GoogleLogin
        // buttonText="Увійти через Google"
        // ux_mode="redirect"
        onSuccess={handleGoogleSuccess}
        // onSuccess={redirect("/")}
        onFailure={handleGoogleFailure}
      />
    </div>
  );
}

// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from './AuthContext';
// import { GoogleLogin } from '@react-oauth/google';
// import jwt_decode from "jwt-decode";

// function Auth() {
//     const navigate = useNavigate();
//     const { login } = useAuth();

//     const handleGoogleSuccess = async (response) => {
//         console.log('Full Google Sign In response:', JSON.stringify(response, null, 2));

//         const googleToken = response.credential;
//         console.log('Received Google Token:', googleToken);

//         const decoded = jwt_decode(googleToken);
//         console.log('Decoded Google Token:', decoded);

//         const learnerName = decoded.given_name;
//         const learnerLastname = decoded.family_name;

//         const requestOptions = {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Cache-Control': 'no-cache',
//             },
//             body: JSON.stringify({
//                 idToken: googleToken,
//                 learnerName: learnerName,
//                 learnerLastname: learnerLastname
//             }),
//         };

//         console.log('Sending request to server with options:', requestOptions);

//         try {
//             let res = await fetch('http://localhost:8080/oauth2', requestOptions);
//             console.log('Server Response:', res);
//             console.log('Server Response Status:', res.status);
//             console.log('Server Response Headers:', [...res.headers.entries()]);

//             if (!res.ok) {
//                 console.error('Server Error Response:', await res.text());
//                 return;
//             }

//             const data = await res.json();
//             console.log('Received data from server after auth:', data);

//             if (data.jwtToken) {
//                 const jwtToken = data.jwtToken;
//                 localStorage.setItem('jwtToken', jwtToken);
//                 login(jwtToken);
//                 console.log("Отриманий JWT токен:", jwtToken);

//                 res = await fetch('http://localhost:8080/api/student', {
//                     method: 'GET',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Cache-Control': 'no-cache',
//                         'Authorization': 'Bearer ' + jwtToken
//                     }
//                 });

//                 const studentData = await res.json();
//                 console.log('Received student data:', studentData);

//                 if (studentData.learningGroup) {
//                     navigate('/');
//                 } else {
//                     navigate('/guest');
//                 }
//             } else {
//                 console.error('JWT token not found');
//             }
//         } catch (error) {
//             console.error('Error while communicating with server:', error);
//         }
//     };

//     const handleGoogleFailure = (response) => {
//         console.error('Google Sign In was unsuccessful:', response);
//     };

//     return (
//         <div className="main">
//             <h2>Авторизація через Google</h2>
//             <GoogleLogin
//                 clientId="170308750708-atmmob9kjjesg9s4286k76at7ha8mgpt.apps.googleusercontent.com"
//                 buttonText="Увійти через Google"
//                 onSuccess={handleGoogleSuccess}
//                 onFailure={handleGoogleFailure}
//             />
//         </div>
//     );
// }

// export default Auth;

// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from './AuthContext';
// import { GoogleLogin } from '@react-oauth/google';
// import jwt_decode from "jwt-decode";

// function Auth() {
//     const navigate = useNavigate();
//     const { login } = useAuth();

//     const handleGoogleSuccess = async (response) => {
//     console.log('Full Google Sign In response:', JSON.stringify(response, null, 2));

//     const googleToken = response.credential;

//     console.log('Received Google Token:', googleToken);

//       // Декодуємо токен
//     const decoded = jwt_decode(googleToken);
//     console.log('Decoded Google Token:', decoded);

//     const learnerName = decoded.given_name;
//     const learnerLastname = decoded.family_name;

// // Візьміть URL картинки з розкодованого токена
// const pictureUrl = decoded.picture;

// // Збережіть цей URL у localStorage
// localStorage.setItem('userPicture', pictureUrl);

// // ... [решта вашого коду]

//     const requestOptions = {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Cache-Control': 'no-cache',
//         },
//         body: JSON.stringify({
//             idToken: googleToken,
//             learnerName: learnerName,
//             learnerLastname: learnerLastname
//         }),
//     };
//     console.log('Sending request to server with options:', requestOptions);

//     try {
//         let res = await fetch('http://localhost:8080/oauth2', requestOptions);

//           // Additional logging for the response
//         console.log('Server Response:', res);
//         console.log('Server Response Status:', res.status);
//         console.log('Server Response Headers:', [...res.headers.entries()]);

//         if (!res.ok) {
//               // Log response text to get error details from the server
//             console.error('Server Error Response:', await res.text());
//             return;
//         }

//         const data = await res.json();
//         console.log('Received data from server after auth:', data);

//         if (data.jwtToken) {
//             const jwtToken = data.jwtToken;
//             localStorage.setItem('jwtToken', jwtToken);
//             login(jwtToken);
//             console.log("Отриманий JWT токен:", jwtToken);

//             res = await fetch('http://localhost:8080/api/student', {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Cache-Control': 'no-cache',
//                     'Authorization': 'Bearer ' + jwtToken
//                 }
//             });

//             const studentData = await res.json();
//             console.log('Received student data:', studentData);

//             const { learningGroup, role: newRole } = studentData;
//             localStorage.setItem('learningGroup', learningGroup);
//             localStorage.setItem('userRole', newRole);
//             if (learningGroup) {
//                 navigate('/');
//             } else {
//                 navigate('/guest');
//             }

//         } else {
//             console.error('JWT token not found');
//         }

//     } catch (error) {
//         console.error('Error while communicating with server:', error);
//     }
// };

//     const handleGoogleFailure = (response) => {
//         console.error('Google Sign In was unsuccessful:', response);
//     };

//     return (
//         <div className="main">
//             <h2>Авторизація через Google</h2>
//             <GoogleLogin
//                 clientId="170308750708-atmmob9kjjesg9s4286k76at7ha8mgpt.apps.googleusercontent.com"
//                 buttonText="Увійти через Google"
//                 onSuccess={handleGoogleSuccess}
//                 onFailure={handleGoogleFailure}
//             />
//         </div>
//     );
// }

// export default Auth;

// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from './AuthContext';
// import { GoogleLogin } from '@react-oauth/google';
// import jwt_decode from "jwt-decode";

// function Auth() {
//     const navigate = useNavigate();
//     const { login } = useAuth();

//     const handleGoogleSuccess = async (response) => {
//         console.log('Google Sign In was successful:', response);

//         const idToken = response.tokenId;
//         console.log('Received idToken:', idToken);

//         const requestOptions = {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ IdToken: idToken }),
//         };

//         console.log('Preparing to make a request with the following options:', requestOptions);

//         try {
//             const res = await fetch('http://localhost:8080/auth2', requestOptions);

//             if (!res.ok) {
//                 console.error('Server responded with an error:', res.status);
//             }

//             const data = await res.json();
//             console.log('Received data from server:', data);

//             if (data.jwtToken) {
//                 localStorage.setItem('jwtToken', data.jwtToken);
//                 login(data.jwtToken);
//                 navigate('/'); // Переадресація на головну сторінку
//             } else {
//                 console.error('JWT token not found');
//             }
//         } catch (error) {
//             console.error('Error while communicating with server:', error);
//         }
//     };

//     const handleGoogleFailure = (response) => {
//         console.error('Google Sign In was unsuccessful:', response);
//     };

//     return (
//         <div className="main">
//             <h2>Авторизація через Google</h2>
//             <GoogleLogin
//                 clientId="170308750708-atmmob9kjjesg9s4286k76at7ha8mgpt.apps.googleusercontent.com"
//                 buttonText="Увійти через Google"
//                 onSuccess={(handleGoogleSuccess) => {
//                         const decoded = jwt_decode(handleGoogleSuccess.credential);
//                         console.log(decoded)
//                         // Тут можна щось робити з декодованим токеном, якщо потрібно.
//                 }}
//                 onFailure={handleGoogleFailure}
//             />
//         </div>
//     );
// }

// export default Auth;

///////////////////

// import React, { useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from './AuthContext';

// function Auth() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loginError, setLoginError] = useState(null);
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const handleInputChange = (setter) => (e) => {
//     setter(e.target.value);
//   };

//   const handleLogin = async () => {
//     try {
//       const userData = {
//         login: email,
//         password: password,
//       };

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

//       let data = await response.json();
//       console.log("Дані після спроби авторизації:", data);

//       if (data.jwtToken) {
//         const { jwtToken } = data;

//         localStorage.setItem('jwtToken', jwtToken);
//         login(jwtToken);

//         console.log("Отриманий JWT токен:", jwtToken);

//         response = await fetch('http://localhost:8080/api/student', {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             'Cache-Control': 'no-cache',
//             'Authorization': 'Bearer ' + jwtToken
//           }
//         });

//         if (!response.ok) {
//           throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
//         }

//         const studentData = await response.json();
//         console.log("Дані студента:", studentData);

//         const { learningGroup, role: newRole } = studentData;
//         localStorage.setItem('userRole', newRole);
//         login(jwtToken, newRole);

//         if(learningGroup) {
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

//   const handleRegister = async () => {
//     try {
//       const userData = {
//         login: email,
//         password: password,
//       };

//       const response = await fetch('http://localhost:8080/register', {
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
//       console.log("Дані після реєстрації:", data);
//       alert('Ви зареєстровані!');
//     } catch (error) {
//       console.error('Помилка при реєстрації:', error);
//       alert('Сталася помилка при реєстрації.');
//     }
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
