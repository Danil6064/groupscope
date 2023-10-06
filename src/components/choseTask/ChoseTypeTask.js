import React, { useState, useEffect } from "react";
import DropDownMenu from "../dropDownMenu/DropDownMenu";

export default function ChoseTypeTask({ onTypeChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTaskType, setSelectedTaskType] = useState("Всі роботи");

  const taskTypeMap = {
    PRACTICAL: "Практичні роботи",
    LABORATORY: "Лабораторні роботи",
    TEST: "Тести",
    ALL: "Всі роботи",
  };

  const handleClick = (type) => {
    setIsOpen(!isOpen);
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
