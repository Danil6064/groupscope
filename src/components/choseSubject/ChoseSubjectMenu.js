import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function ChoseSubjectMenu({ setSelectedSubject }) {
  const [subjects, setSubjects] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const subjectsFromCookies = JSON.parse(Cookies.get('subjectNames'));
    setSubjects(subjectsFromCookies);
    if (subjectsFromCookies.length > 0) {
      const firstSubject = subjectsFromCookies[0];
      setSelected(firstSubject);
      setSelectedSubject(firstSubject);
    }
  }, [setSelectedSubject]);
  
  useEffect(() => {
    if (selected) {
      navigate(`/successfulStudent/${selected}`);
    }
  }, [selected, navigate]);
  
  const handleClick = (subject) => {
    setSelected(subject);
    setSelectedSubject(subject);
    navigate(`/successfulStudent/${subject}`);
    setIsOpen(false);
  };

  return (
    <div className="dropdown-menu">
      <div
        className="dropdown-menu-btn"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg width="15" height="15" viewBox="0 0 19 19">
          <polygon points="0,0 19,0 9.5,19" />
        </svg>
        <h2>{selected}</h2>
        <svg width="15" height="15" viewBox="0 0 19 19">
          <polygon points="0,0 19,0 9.5,19" />
        </svg>
      </div>
      <div
        className="dropdown-menu-elements"
        style={{ display: isOpen ? 'block' : 'none' }}
      >
        <ul>
          {subjects.map((subject, index) => (
            <li key={index} onClick={() => handleClick(subject)}>
              {subject}
            </li>
          ))}
        </ul>
      </div>
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