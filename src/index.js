import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/auth/Auth";
import Guest from "./pages/guest/Guest";
import Home from "./pages/home/Home";
import Header from "./components/header/Header";
import TaskPage from "./pages/tasksPage/TaskPage";
import SuccessfulStudent from "./pages/successfulStudent/SuccessfulStudent";
import SuccessfulGroup from "./pages/successfulGroup/SuccessfulGroup";
import { AuthProvider } from "./pages/auth/AuthContext";
import { StudentProvider } from "../src/helpers/StudentContext";
import PrivateRoute from "./pages/auth/PrivateRoute";
import { GoogleOAuthProvider } from "@react-oauth/google";

function RootComponent() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <StudentProvider>
          <GoogleOAuthProvider clientId="170308750708-atmmob9kjjesg9s4286k76at7ha8mgpt.apps.googleusercontent.com">
            <Header />
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route path="/guest" element={<Guest />} />
              <Route
                path="/"
                element={
                  <PrivateRoute roles={["HEADMAN", "STUDENT"]}>
                    <Home />
                  </PrivateRoute>
                }
              />
              <Route
                path="/subject/:subjectName"
                element={
                  <PrivateRoute roles={["HEADMAN", "STUDENT"]}>
                    <TaskPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/successfulStudent/:subjectName?"
                element={
                  <PrivateRoute roles={["HEADMAN", "STUDENT"]}>
                    <SuccessfulStudent />
                  </PrivateRoute>
                }
              />
              <Route
                path="/successfulGroup/:subjectName?"
                element={
                  <PrivateRoute roles={["HEADMAN"]}>
                    <SuccessfulGroup />
                  </PrivateRoute>
                }
              />
            </Routes>
          </GoogleOAuthProvider>
        </StudentProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RootComponent />);
reportWebVitals();

// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import reportWebVitals from './reportWebVitals';
// import './main.css';

// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Auth from './pages/auth/Auth';
// import Guest from './pages/guest/Guest';
// import Home from './pages/home/Home';
// import Header from './components/header/Header';
// import TaskPage from './pages/tasksPage/TaskPage';
// import SuccessfulStudent from './pages/successfulStudent/SuccessfulStudent';
// import SuccessfulGroup from './pages/successfulGroup/SuccessfulGroup';
// import { AuthProvider } from './pages/auth/AuthContext';
// import { StudentProvider } from '../src/helpers/StudentContext';
// import PrivateRoute from './pages/auth/PrivateRoute';

// // import { GoogleLogin } from '@react-oauth/google'; // Додавання GoogleLogin
// import { GoogleOAuthProvider } from '@react-oauth/google';
// const rootElement = document.getElementById('root');

// const root = ReactDOM.createRoot(rootElement);

// root.render(

//     <BrowserRouter>
//         <AuthProvider>
//             <StudentProvider>
//             <GoogleOAuthProvider clientId="170308750708-atmmob9kjjesg9s4286k76at7ha8mgpt.apps.googleusercontent.com">
//                 <Header />
//                 <Routes>
//                     <Route path='/auth' element={<Auth />} />
//                     <Route path='/guest' element={<Guest />} />
//                     <Route path="/" element={
//                         <PrivateRoute roles={['HEADMAN', 'STUDENT']}>
//                             <Home />
//                         </PrivateRoute>
//                     } />
//                     <Route path="/subject/:subjectName" element={
//                         <PrivateRoute roles={['HEADMAN', 'STUDENT']}>
//                             <TaskPage />
//                         </PrivateRoute>
//                     } />
//                     <Route path="/successfulStudent/:subjectName?" element={
//                         <PrivateRoute roles={['HEADMAN', 'STUDENT']}>
//                             <SuccessfulStudent />
//                         </PrivateRoute>
//                     } />
//                     <Route path="/successfulGroup/:subjectName?" element={
//                         <PrivateRoute roles={['HEADMAN']}>
//                             <SuccessfulGroup />
//                         </PrivateRoute>
//                     } />
//                 </Routes>
//                 </GoogleOAuthProvider>
//             </StudentProvider>
//         </AuthProvider>
//     </BrowserRouter>
// );

// reportWebVitals();
