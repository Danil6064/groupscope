import React from 'react';
import './taskCard.css'

const TaskCard = ({ name, info, deadline }) => {
  return (
    <li className="homework-card">
      <h3>{name}</h3>
      <div className="homework-text">
        <span>{info}</span>
      </div>
      <div className="homework-deadline">
        <span>Deadline: {deadline}</span>
      </div>
    </li>
  );
};

export default TaskCard;
