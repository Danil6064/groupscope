import React, { useState } from "react";
import RenderTaskCard from "../../helpers/RenderTaskCard";
import { useParams } from "react-router-dom";
import "./taskPage.css";

import DropDownMenu from "../../components/dropDownMenu/DropDownMenu";
import AddTaskPopup from "../../components/addTask/AddTaskPopup";

export default function TaskPage () {
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

function ChoseTypeTask({ onTypeChange }) {
  const [selectedTaskType, setSelectedTaskType] = useState("Всі роботи");

  const taskTypeMap = {
    PRACTICAL: "Практичні роботи",
    LABORATORY: "Лабораторні роботи",
    TEST: "Тести",
    ALL: "Всі роботи",
  };

  const handleClick = (type) => {
    setSelectedTaskType(taskTypeMap[type]);
    if (onTypeChange) {
      onTypeChange(type);
    }
  };

  const availableTaskTypes = Object.keys(taskTypeMap).filter(
    (taskType) => taskTypeMap[taskType] !== selectedTaskType
  );

  const menuElements = availableTaskTypes.map((taskType) => {
    return (
      <li
        key={taskType}
        className="dropdown-menu-item"
        onClick={() => handleClick(taskType)}
      >
        {taskTypeMap[taskType]}
      </li>
    );
  });

  return <DropDownMenu menuTitle={selectedTaskType} menuItems={menuElements} />;
}