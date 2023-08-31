import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskCardSuccessful from '../taskCard/taskCardSuccessful/TaskCardSuccessful';

function ChoseSubjectMenu() {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // Add isOpen state variable

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get('http://localhost:8080/getSubjects');
        setSubjects(response.data);
        if (response.data.length > 0) {
          setSelectedSubject(response.data[0]); // Select first subject by default
        }
      } catch (error) {
        console.error("Error fetching data from server", error);
      }
    };
    fetchSubjects();
  }, []);

  const handleClick = (subject) => {
    setSelectedSubject(subject);
  };

  const availableSubjects = subjects.filter(
    (s) => s.id !== (selectedSubject && selectedSubject.id)
  );

  return (
    <div className="dropdown-menu">
      <div
        className="dropdown-menu-btn"
        onClick={() => setIsOpen(!isOpen)} // Toggle isOpen state on click
      >
        <svg width="15" height="15" viewBox="0 0 19 19">
          <polygon points="0,0 19,0 9.5,19" />
        </svg>
        <h2>{selectedSubject && selectedSubject.name}</h2> {/* Access name from object */}
        <svg width="15" height="15" viewBox="0 0 19 19">
          <polygon points="0,0 19,0 9.5,19" />
        </svg>
      </div>
      <div
        className="dropdown-menu-elements"
        style={{ display: isOpen ? 'block' : 'none' }}
      >
        <ul>
          {availableSubjects.map((subject) => (
            <li key={subject.id} onClick={() => handleClick(subject)}>
              {subject.name}
            </li>
          ))}
        </ul>
      </div>
      {selectedSubject && (
        <TaskCardSuccessful selectedSubject={selectedSubject} /> // Передайте selectedSubject
      )}
    </div>
  );
}

export default ChoseSubjectMenu;





// import React, { useState } from 'react';

// function ChoseSubjectMenu() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedSubject, setSelectedSubject] = useState('Іноземна мова');

//   const subjectList = ['Іноземна мова', 'Інформаційні Технології', "Архітектура Комп'ютерних систем", 'Програмування ч.3', 'Прикладна Криптологія', 'Комплекси ТЗІ', 'Інформаційно-Комунікаційні Системи', "Об'єктно-оріентоване програмування"];

//   const handleClick = (subject) => {
//     setIsOpen(!isOpen);
//     setSelectedSubject(subject); // Оновлюємо вибраний предмет
//   };

//   const availableSubjects = subjectList.filter(subject => subject !== selectedSubject);

//   return (
//     <div className="dropdown-menu">
//       <div className="dropdown-menu-btn" onClick={() => setIsOpen(!isOpen)}>
//         <svg width="15" height="15" viewBox="0 0 19 19">
//           <polygon points="0,0 19,0 9.5,19" />
//         </svg>
//         <h2>{selectedSubject}</h2>
//         <svg width="15" height="15" viewBox="0 0 19 19">
//           <polygon points="0,0 19,0 9.5,19" />
//         </svg>
//       </div>
//       <div className="dropdown-menu-elements" style={{ display: isOpen ? 'block' : 'none' }}>
//         <ul>
//           {availableSubjects.map(subject => (
//             <li key={subject} onClick={() => handleClick(subject)}>{subject}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default ChoseSubjectMenu;



















// import React from "react"


// function ChoseSubjectMenu () {
//     return (
// <div className="dropdown-menu">
//           <div className="dropdown-menu-btn">
//             <svg width="15" height="15" viewBox="0 0 19 19">
//               <polygon points="0,0 19,0 9.5,19" />
//             </svg>
//             <h2>ПКр</h2>
//             <svg width="15" height="15" viewBox="0 0 19 19">
//               <polygon points="0,0 19,0 9.5,19" />
//             </svg>
//           </div>
//           <div className="dropdown-menu-elements">
//             <ul>
//               <li>акс</li>
//               <li>електрорадіовимірювання</li>
//               <li>ООП</li>
//               <li>комплекси ТЗІ</li>
//               <li>інформаційні технології</li>
//               <li>ікс</li>
//             </ul>
//           </div>
//         </div>
//     )
// }

// export default ChoseSubjectMenu