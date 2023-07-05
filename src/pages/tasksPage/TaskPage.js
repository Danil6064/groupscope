import React, { useState } from 'react';
import RenderTaskCard from '../../helpers/RenderTaskCard';
import { useParams } from 'react-router-dom';
import "./taskPage.css";

import ChoseTypeTask from '../../components/choseTask/ChoseTypeTask';
import AddTaskPopup from '../../components/addTask/AddTaskPopup';

const TaskPage = () => {
  const { id } = useParams(); 
  const [currentTaskType, setCurrentTaskType] = useState('ALL');
  const [showPopup, setShowPopup] = useState(false);

  const handleTaskTypeChange = (type) => {
    setCurrentTaskType(type);
  };

  const handleAddTaskClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <main className="main_taskPage">
      <div className="container_taskPage">

        <div className="add-study-assignment" onClick={handleAddTaskClick}>
          <h2>Додати завдання</h2>
        </div>

        {showPopup && <AddTaskPopup onClose={handleClosePopup} subjectId={id} />}

        <ChoseTypeTask onTypeChange={handleTaskTypeChange} />

        <ul className="homework-list">
            <RenderTaskCard subjectId={id} currentTaskType={currentTaskType} />
        </ul>
      </div>
    </main>
  );
};

export default TaskPage;






// import React, { useState } from 'react';
// import RenderTaskCard from '../../helpers/RenderTaskCard';
// import { useParams } from 'react-router-dom';
// import "./taskPage.css";

// import ChoseTypeTask from '../../components/choseTask/ChoseTypeTask';
// // import AddTask from '../../components/addTask/AddTaskPopup';

// const TaskPage = () => {
//   const { id } = useParams(); 
//   const [currentTaskType, setCurrentTaskType] = useState('ALL');

//   const handleTaskTypeChange = (type) => {
//     setCurrentTaskType(type);
//   };

//   return (
//     <main className="main_taskPage">
//       <div className="container_taskPage">

//       <div className="add-study-assignment">
//         <h2>Додати завдання</h2>
//       </div>

//         <ChoseTypeTask onTypeChange={handleTaskTypeChange} />

//         <ul className="homework-list">
//             <RenderTaskCard subjectId={id} currentTaskType={currentTaskType} />
//         </ul>
//       </div>
//     </main>
//   );
// };

// export default TaskPage;


