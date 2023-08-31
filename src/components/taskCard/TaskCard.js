<<<<<<< HEAD
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
=======
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
>>>>>>> 9c66d1cf54a1d5acc5699260c428742d2f684960
