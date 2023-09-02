import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TaskCardSuccessful({ selectedSubject }) {
  const [grades, setGrades] = useState([]);
  const jwtToken = localStorage.getItem('jwtToken');

  const fetchGrades = async () => {
    if (selectedSubject && jwtToken) {
      try {
        const response = await axios.get(`http://localhost:8080/api/subject/${selectedSubject}/grade/all`, {
          headers: {
            'Authorization': 'Bearer ' + jwtToken,
          },
        });
        setGrades(response.data);
      } catch (error) {
        console.error('Error fetching student grades', error);
      }
    }
  };

  const handleInputMarkChange = (event, taskName) => {
    const url = 'http://localhost:8080/api/grade';
    const mark = parseInt(event.target.value, 10);
    const completion = mark > 0;
    const data = {
      subjectName: selectedSubject,
      taskName: taskName,
      completion: completion,
      mark: mark,
    };
    axios
      .post(url, data, {
        headers: {
          'Authorization': 'Bearer ' + jwtToken,
        },
      })
      .then((res) => {
        console.log(res);
        fetchGrades();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchGrades();
  }, [selectedSubject]);

  return (
    <ul className="successfulness-list">
      {grades.map((grade, index) => (
        <li key={index} className="successfulness-card">
          <h3>{grade.taskName}</h3>
          <div className={`successfulness-card-task-done ${grade.completion ? 'active' : ''}`}>
            {grade.completion ? 'зроблено' : 'не зроблено'}
          </div>
          <input placeholder="Введіть оцінку" defaultValue={grade.mark} onBlur={(e) => handleInputMarkChange(e, grade.taskName)} />
          <span className={`successfulness-card-assess ${grade.mark > 0 ? 'active' : ''}`}>Оцінено</span>
        </li>
      ))}
    </ul>
  );
}
export default TaskCardSuccessful;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function TaskCardSuccessful({ selectedSubject }) {
//   const [tasks, setTasks] = useState([]);
//   const [inputMarks, setInputMarks] = useState({}); // Додано декларацію змінних

//   useEffect(() => {
//     const fetchTasks = async () => {
//       if (selectedSubject) {
//         try {
//           const response = await axios.get(`http://localhost:8080/getTasksOfSubject/${selectedSubject.id}`);
//           setTasks(response.data);
//         } catch (error) {
//           console.error("Error fetching data from server", error);
//         }
//       }
//     };
//     fetchTasks();
//   }, [selectedSubject]);

//   const handleKeyPress = (event, task) => {
//     if (event.key === 'Enter') {
//       const url = 'http://localhost:8080/updateGrade/2';
//       const data = {
//         subjectName: task.subjectName,
//         taskName: task.taskName,
//         completion: inputMarks[task.id] > 0,
//         mark: parseInt(inputMarks[task.id])
//       };
//       axios.post(url, data)
//         .then(res => console.log(res))
//         .catch(err => console.log(err));
//     }
//   };

//   const handleInputMarkChange = (event, task) => {
//     setInputMarks(prevInputMarks => ({
//       ...prevInputMarks,
//       [task.id]: event.target.value
//     }));
//   };

//   return (
//     <ul>
//       {tasks.map(task => (
//         <li key={task.id} className="successfulness-card">
//           <h3>{task.name}</h3>
//           <div className={`successfulness-card-task-done ${task.completion ? 'active' : ''}`}>
//             {task.completion ? 'зроблено' : 'не зроблено'}
//           </div>
//           <input
//             placeholder="Введіть оцінку"
//             value={inputMarks[task.id] || ''}
//             onChange={(e) => handleInputMarkChange(e, task)}
//             onKeyPress={(e) => handleKeyPress(e, task)}
//           />
//           <span className={`successfulness-card-assess ${inputMarks[task.id] > 0 ? 'active' : ''}`}>
//             Оцінено
//           </span>
//         </li>
//       ))}
//     </ul>
//   );
// }

// export default TaskCardSuccessful;





// import React from "react";

// function TaskCardSuccessful() {
//     return (
//         <>
//         <li className="successfulness-card">
//             <h3>Практичне заняття №1</h3>
//             <div className="successfulness-card-task-done">зроблено</div>
//             <input placeholder="Введіть оцінку" />
//             <span className="successfulness-card-assess">Оцінено</span>
//           </li>
//           <li className="successfulness-card">
//             <h3>Практичне заняття №2</h3>
//             <div className="successfulness-card-task-done active">зроблено</div>
//             <input placeholder="Введіть оцінку" />
//             <span className="successfulness-card-assess active">Оцінено</span>
//           </li>
//           </>
//     )
// }

