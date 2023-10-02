import React, { useState } from "react";
import RenderTaskCard from "../../helpers/RenderTaskCard";
import { useParams } from "react-router-dom";
import "./taskPage.css";

import ChoseTypeTask from "../../components/choseTask/ChoseTypeTask";
import AddTaskPopup from "../../components/addTask/AddTaskPopup";

const TaskPage = () => {
  const { subjectName } = useParams();
  const [currentTaskType, setCurrentTaskType] = useState("ALL");
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

  const userRole = localStorage.getItem("userRole");

  return (
    <main className="main_taskPage">
      <div className="container_taskPage">
        {userRole === "HEADMAN" && (
          <div className="add-study-assignment" onClick={handleAddTaskClick}>
            <h2>Додати завдання</h2>
          </div>
        )}

        {showPopup && (
          <AddTaskPopup onClose={handleClosePopup} subjectName={subjectName} />
        )}

        <ChoseTypeTask onTypeChange={handleTaskTypeChange} />

        <ul className="homework-list">
          <RenderTaskCard
            subjectName={subjectName}
            currentTaskType={currentTaskType}
          />
        </ul>
      </div>
    </main>
  );
};

export default TaskPage;
