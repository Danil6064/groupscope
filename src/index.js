import React from 'react';
<<<<<<< HEAD
import ReactDOM from 'react-dom/client';
=======
import ReactDOM from 'react-dom';
>>>>>>> 9c66d1cf54a1d5acc5699260c428742d2f684960
import reportWebVitals from './reportWebVitals';
import './main.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Auth from './pages/auth/Auth';
import Guest from './pages/guest/Guest';
import Home from './pages/home/Home';
import Header from './components/header/Header';
import TaskPage from './pages/tasksPage/TaskPage';
import SuccessfulStudent from './pages/successfulStudent/SuccessfulStudent';
import SuccessfulGroup from './pages/successfulGroup/SuccessfulGroup';
import { AuthProvider } from './pages/auth/AuthContext';
import { StudentProvider } from '../src/helpers/StudentContext';
import PrivateRoute from './pages/auth/PrivateRoute';

const rootElement = document.getElementById('root');

const root = ReactDOM.createRoot(rootElement);

<<<<<<< HEAD
root.render(
  <BrowserRouter>
    <AuthProvider>
      <StudentProvider>
        <Header />
        <Routes>
          <Route path='/auth' element={<Auth />} />
          <Route path='/guest' element={<Guest />} />

          <Route path="/" element={
            <PrivateRoute roles={['HEADMAN', 'STUDENT']}>
              <Home />
            </PrivateRoute>
          }/>

          <Route path="/subject/:subjectName" element={
<PrivateRoute roles={['HEADMAN', 'STUDENT']}>
            <TaskPage />
          </PrivateRoute>
          }/>

          <Route path="/successfulStudent" element={
            <PrivateRoute roles={['HEADMAN', 'STUDENT']}>
              <SuccessfulStudent />
            </PrivateRoute>
          }/>

          <Route path="/successfulGroup" element={
            <PrivateRoute roles={['HEADMAN']}>
              <SuccessfulGroup />
            </PrivateRoute>
          }/>
        </Routes>
      </StudentProvider>
    </AuthProvider>
=======
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Header from './components/header/Header';
import { createRoot } from 'react-dom/client';
import TaskPage from './pages/tasksPage/TaskPage';
import SuccessfulStunent from './pages/successfulStudent/SuccessfulStudent';
import SuccessfulGroup from './pages/successfulGroup/SuccessfulGroup';

const rootElement = document.getElementById('root');

createRoot(rootElement).render(
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/subject/:id" element={<TaskPage />}/>
      <Route path="/successfulStudent" element={<SuccessfulStunent />}/>
      <Route path="/successfulGroup" element={<SuccessfulGroup />}/>
    </Routes>
>>>>>>> 9c66d1cf54a1d5acc5699260c428742d2f684960
  </BrowserRouter>
);

reportWebVitals();



<<<<<<< HEAD
// import React from 'react';
// import ReactDOM from 'react-dom';
// import reportWebVitals from './reportWebVitals';
// import './main.css';

// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Auth from './pages/auth/Auth';
// import Guest from './pages/guest/Guest';
// import Home from './pages/home/Home';

// import { AuthProvider } from './pages/auth/AuthContext'; // Припустимий шлях до вашого файлу AuthContext
// import Header from './components/header/Header';
// import { createRoot } from 'react-dom/client';
// import TaskPage from './pages/tasksPage/TaskPage';
// import SuccessfulStudent from './pages/successfulStudent/SuccessfulStudent';
// import SuccessfulGroup from './pages/successfulGroup/SuccessfulGroup';

// import { StudentProvider } from '../src/helpers/StudentContext';

// const rootElement = document.getElementById('root');

// createRoot(rootElement).render(
//   <BrowserRouter>
//     <Header />
//     <StudentProvider>
//       <AuthProvider> {/*ми додали AuthProvider */}
//         <Routes>
//           <Route path='/auth' element={<Auth />} />
//           <Route path='/guest' element={<Guest />} />
//           <Route path="/" element={<Home />} />
//           <Route path="/subject/:id" element={<TaskPage />} />
//           <Route path="/successfulStudent" element={<SuccessfulStudent />} />
//           <Route path="/successfulGroup" element={<SuccessfulGroup />} />
//         </Routes>
//       </AuthProvider>
//     </StudentProvider>
//   </BrowserRouter>,
// );


// reportWebVitals();



// import React from 'react';
// import ReactDOM from 'react-dom';
// import reportWebVitals from './reportWebVitals';
// import './main.css'

// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Auth from './pages/auth/Auth';
// import Quest from './pages/guest/Quest';
// import Home from './pages/home/Home';

// import Header from './components/header/Header';
// import { createRoot } from 'react-dom/client';
// import TaskPage from './pages/tasksPage/TaskPage';
// import SuccessfulStunent from './pages/successfulStudent/SuccessfulStudent';
// import SuccessfulGroup from './pages/successfulGroup/SuccessfulGroup';

// const rootElement = document.getElementById('root');

// createRoot(rootElement).render(
//   <BrowserRouter>
//     <Header />
//     <Routes>
//       <Route path='/auth' element={<Auth />}/>
//       <Route path='/quest' element={<Quest/>}/>
//       <Route path="/" element={<Home />}/>
//       <Route path="/subject/:id" element={<TaskPage />}/>
//       <Route path="/successfulStudent" element={<SuccessfulStunent />}/>
//       <Route path="/successfulGroup" element={<SuccessfulGroup />}/>
//     </Routes>
//   </BrowserRouter>
// );

// reportWebVitals();



=======
>>>>>>> 9c66d1cf54a1d5acc5699260c428742d2f684960
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <Header />
//     <Home />
//   </React.StrictMode>
// );


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
