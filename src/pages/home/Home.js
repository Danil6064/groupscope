import React from 'react';
import RenderSubjectCards from '../../helpers/RenderSubjectCard';
import './home.css'


function Home() {
  return (
    <div className="main">
      <div className="subjects container">

      <RenderSubjectCards />

      </div>
    </div>
  );
}

export default Home;