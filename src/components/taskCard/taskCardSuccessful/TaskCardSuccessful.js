import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TaskCardSuccessful({ selectedSubject }) {
  const [tasks, setTasks] = useState([]);
  const [inputMarks, setInputMarks] = useState({});

  const fetchTasks = async () => {
    if (selectedSubject) {
      try {
        const response = await axios.get(`http://localhost:8080/getTasksOfSubject/${selectedSubject.id}`);
        await new Promise(resolve => {
          setTasks(response.data);
          resolve();
        });
      } catch (error) {
        console.error("Error fetching data from server", error);
      }
    }
  };

  const fetchStudentGrades = async () => {
    if(tasks.length){
      try {
        const response = await axios.get('http://localhost:8080/getStudent/2');
        const studentGrades = response.data.grades;
        const updatedInputMarks = {};
        const updatedTasks = [...tasks];
        studentGrades.forEach(grade => {
          const taskName = grade.taskName;
          const subjectName = grade.subjectName;
          const mark = grade.mark;
          const completion = grade.completion;
          if (subjectName === selectedSubject.name) {
            const task = updatedTasks.find(task => task.name === taskName);
            if (task) {
                updatedInputMarks[task.id] = mark ? mark.toString() : '';

              task.completion = completion;
            }
          }
        });
        setInputMarks(updatedInputMarks);
        setTasks(updatedTasks);
      } catch (error) {
        console.error("Error fetching student grades", error);
      }
    }
  };

useEffect(() => {
  fetchTasks();
}, [selectedSubject]);

useEffect(() => {
  fetchStudentGrades();
}, [tasks, selectedSubject]);

  const handleKeyPress = (event, task) => {
    if (event.key === 'Enter') {
      const url = 'http://localhost:8080/updateGrade/2';
      const data = {
        subjectName: selectedSubject.name,
        taskName: task.name,
        completion: inputMarks[task.id] > 0 ? 'true' : 'false',
        mark: event.target.value.toString()
      };
      axios.post(url, data)
        .then(res => {
          console.log(res);
          fetchStudentGrades();
        })
        .catch(err => console.log(err));
    }
  };

  const handleInputMarkChange = (event, task) => {
    setInputMarks(prevInputMarks => ({
      ...prevInputMarks,
      [task.id]: event.target.value
    }));
  
    const url = 'http://localhost:8080/updateGrade/2';
    const data = {
      subjectName: selectedSubject.name,
      taskName: task.name,
      completion: event.target.value > 0 ? 'true' : 'false',
      mark: event.target.value.toString()
    };
    axios.post(url, data)
      .then(res => {
        console.log(res);
        fetchStudentGrades();
      })
      .catch(err => console.log(err));
  };
  




  const toggleTaskCompletion = (task) => {
    const url = 'http://localhost:8080/updateGrade/2';
    const data = {
      subjectName: selectedSubject.name,
      taskName: task.name,
      completion: task.completion ? 'false' : 'true',
      mark: inputMarks[task.id]
    };
    axios.post(url, data)
      .then(res => {
        console.log(res);
        fetchStudentGrades();
      })
      .catch(err => console.log(err));
  }
  
  return (
    <ul className='successfulness-list'>
      {tasks.map(task => (
        <li key={task.id} className="successfulness-card">
          <h3>{task.name}</h3>
          <div 
            className={`successfulness-card-task-done ${task.completion ? 'active' : ''}`} 
            onClick={() => toggleTaskCompletion(task)}
          >
            {task.completion ? 'зроблено' : 'не зроблено'}
          </div>
          <input
            placeholder="Введіть оцінку"
            value={inputMarks[task.id] || ''}
            onChange={(e) => handleInputMarkChange(e, task)}
            onKeyPress={(e) => handleKeyPress(e, task)}
          />
          <span className={`successfulness-card-assess ${inputMarks[task.id] > 0 ? 'active' : ''}`}>
            Оцінено
          </span>
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

