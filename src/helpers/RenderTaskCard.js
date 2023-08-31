<<<<<<< HEAD
// RenderTaskCard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskCard from '../components/taskCard/TaskCard';

function RenderTaskCard({ subjectName, currentTaskType }) {
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    const jwtToken = localStorage.getItem('jwtToken');
    axios.get(`http://localhost:8080/api/subject/${encodeURIComponent(subjectName)}/task/all`, {
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





// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import TaskCard from '../components/taskCard/TaskCard'

// function RenderTaskCard({ subjectId }) {
//   const [taskList, setTaskList] = useState([]);

//   useEffect(() => {
//     const fetchTaskList = `http://localhost:8080/getTasksOfSubject/${subjectId}`;

//     axios.get(fetchTaskList)
//       .then((res) => {
//         setTaskList(res.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);

//   return (
//     <>
//       {taskList.map((task) => {
//         return (
//           <TaskCard
//             key={task.id}
//             name={task.name}
//             info={task.info}
//           />
//         );
//       })}
//     </>
//   );
// }

=======
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskCard from '../components/taskCard/TaskCard';

function RenderTaskCard({ subjectId, currentTaskType }) {
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    const fetchTaskList = `http://localhost:8080/getTasksOfSubject/${subjectId}`;

    axios.get(fetchTaskList)
      .then((res) => {
        setTaskList(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [subjectId]);

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
          />
        );
      })}
    </>
  );
}

export default RenderTaskCard;





// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import TaskCard from '../components/taskCard/TaskCard'

// function RenderTaskCard({ subjectId }) {
//   const [taskList, setTaskList] = useState([]);

//   useEffect(() => {
//     const fetchTaskList = `http://localhost:8080/getTasksOfSubject/${subjectId}`;

//     axios.get(fetchTaskList)
//       .then((res) => {
//         setTaskList(res.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);

//   return (
//     <>
//       {taskList.map((task) => {
//         return (
//           <TaskCard
//             key={task.id}
//             name={task.name}
//             info={task.info}
//           />
//         );
//       })}
//     </>
//   );
// }

>>>>>>> 9c66d1cf54a1d5acc5699260c428742d2f684960
// export default RenderTaskCard;