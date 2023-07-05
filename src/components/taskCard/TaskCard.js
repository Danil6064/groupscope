import React from 'react';
import './taskCard.css'


const TaskCard = ({ name, info }) => {
  return (
    <li className="homework-card">
      <h3>{name}</h3>
      <div className="homework-text">
        <span>{info}</span>
      </div>
    </li>
  );
};

export default TaskCard;
