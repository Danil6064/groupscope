import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';

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
  </BrowserRouter>
);

reportWebVitals();



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
