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
