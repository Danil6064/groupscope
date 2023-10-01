// RenderTaskCard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskCard from '../components/taskCard/TaskCard';
import {apiUrl} from '../helpers/MainConstants'
function RenderTaskCard({ subjectName, currentTaskType }) {
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    const jwtToken = localStorage.getItem('jwtToken');
    axios.get(`${apiUrl}/subject/${encodeURIComponent(subjectName)}/task/all`, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Authorization': 'Bearer ' + jwtToken,
      },
    })
      .then((res) => {
        setTaskList(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [subjectName]);
  

  const filteredTaskList = taskList.filter(task =>
    currentTaskType === 'ALL' ? true : task.type === currentTaskType
  );

  return (
    <>
      {filteredTaskList.map((task) => {
        return (
          <TaskCard
            key={task.id}
            name={task.name}
            info={task.info}
            deadline={task.deadline}
          />
        );
      })}
    </>
  );
}

export default RenderTaskCard;