import React, { useState } from 'react'; 
import './choseTypeTask.css';
import "./drop-down-menu.css";

function ChoseTypeTask({ onTypeChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTaskType, setSelectedTaskType] = useState('Всі роботи');

  const taskTypeMap = {
    'LABORATORY': 'Лабораторні роботи',
    'PRACTICAL': 'Практичні роботи',
    'TEST': 'Тести',
    'ALL': 'Всі роботи'
  };

  const handleClick = (type) => {
    setIsOpen(!isOpen);
    setSelectedTaskType(taskTypeMap[type]);
    if(onTypeChange) {
      onTypeChange(type);
    }
  };

  const availableTaskTypes = Object.keys(taskTypeMap).filter(taskType => taskTypeMap[taskType] !== selectedTaskType);

  return (
    <div className="dropdown-menu">
      <div className="dropdown-menu-btn" onClick={() => setIsOpen(!isOpen)}>
        <svg width="15" height="15" viewBox="0 0 19 19">
          <polygon points="0,0 19,0 9.5,19" />
        </svg>
        <h2>{selectedTaskType}</h2>
        <svg width="15" height="15" viewBox="0 0 19 19">
          <polygon points="0,0 19,0 9.5,19" />
        </svg>
      </div>
      <div className="dropdown-menu-elements" style={{ display: isOpen ? 'flex' : 'none' }}>
        <ul>
          {availableTaskTypes.map(taskType => (
            <li key={taskType} onClick={() => handleClick(taskType)}>{taskTypeMap[taskType]}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ChoseTypeTask;







// import React, { useState } from 'react'; 
// import './choseTypeTask.css';
// import "./drop-down-menu.css";

// function ChoseTypeTask({ onTypeChange }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedTaskType, setSelectedTaskType] = useState('Всі роботи');

//   const taskTypeMap = {
//     'LABORATORY': 'Лабораторні роботи',
//     'PRACTICAL': 'Практичні роботи',
//     'TEST': 'Тести',
//     'ALL': 'Всі роботи'
//   };

//   const handleClick = (type) => {
//     setIsOpen(!isOpen);
//     setSelectedTaskType(taskTypeMap[type]);
//     if(onTypeChange) {
//       onTypeChange(type);
//     }
//   };

//   return (
//     <div className="dropdown-menu">
//       <div className="dropdown-menu-btn" onClick={() => setIsOpen(!isOpen)}>
//         <svg width="15" height="15" viewBox="0 0 19 19">
//           <polygon points="0,0 19,0 9.5,19" />
//         </svg>
//         <h2>{selectedTaskType}</h2>
//         <svg width="15" height="15" viewBox="0 0 19 19">
//           <polygon points="0,0 19,0 9.5,19" />
//         </svg>
//       </div>
//       <div className="dropdown-menu-elements" style={{ display: isOpen ? 'flex' : 'none' }}>
//         <ul>
//           <li onClick={() => handleClick('LABORATORY')}>Лабораторні роботи</li>
//           <li onClick={() => handleClick('PRACTICAL')}>Практичні роботи</li>
//           <li onClick={() => handleClick('TEST')}>Тести</li>
//           <li onClick={() => handleClick('ALL')}>Всі роботи</li>
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default ChoseTypeTask;






// import React, { useState } from 'react'; 
// import './choseTypeTask.css'
// import "./drop-down-menu.css";

// function ChoseTypeTask() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className="dropdown-menu">
//       <div className="dropdown-menu-btn" onClick={() => setIsOpen(!isOpen)}>
//         <svg width="15" height="15" viewBox="0 0 19 19">
//           <polygon points="0,0 19,0 9.5,19" />
//         </svg>
//         <h2>Всі роботи</h2>
//         <svg width="15" height="15" viewBox="0 0 19 19">
//           <polygon points="0,0 19,0 9.5,19" />
//         </svg>
//       </div>
//         <div className="dropdown-menu-elements" style={{ display: isOpen ? 'flex' : 'none' }}>
//           <ul>
//             <li>Лабораторні роботи</li>
//             <li>Практичні роботи</li>
//             <li>Тести</li>
//           </ul>
//         </div>
//       </div>
//   )
// }

// export default ChoseTypeTask;
