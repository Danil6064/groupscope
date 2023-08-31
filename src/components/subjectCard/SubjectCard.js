<<<<<<< HEAD
import React from 'react';
import { NavLink } from 'react-router-dom';
import './subjectsCard.css';


function SubjectCard({ name, id, onClick }) {
  return (
    <NavLink to={`/subject/${encodeURIComponent(name)}`} className="subject-card" onClick={() => onClick(id)}>
      <h2>{name}</h2>
    </NavLink>
  );
}

export default SubjectCard;
=======
import React from 'react';
import { NavLink } from 'react-router-dom';
import './subjectsCard.css';


function SubjectCard({ name, id, onClick }) {
  return (
    <NavLink to={`/subject/${id}`} className="subject-card" onClick={() => onClick(id)}>
      <h2>{name}</h2>
    </NavLink>
  );
}

export default SubjectCard;
>>>>>>> 9c66d1cf54a1d5acc5699260c428742d2f684960
