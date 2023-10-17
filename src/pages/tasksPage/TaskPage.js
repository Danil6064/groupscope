import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./taskPage.css";
import useAuth from "../../hooks/useAuth";
import DropDownMenu from "../../components/dropDownMenu/DropDownMenu";
import AddTaskPopup from "../../components/addTask/AddTaskPopup";
import TaskCard from "../../components/taskCard/TaskCard";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

export default function TaskPage() {
  const { subjectName } = useParams();
  const [currentTaskType, setCurrentTaskType] = useState("ALL");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { auth } = useAuth();

  const maxSubjectLength = 25;
  subjectName.length < maxSubjectLength
    ? sessionStorage.setItem("currentHeaderTitle", subjectName)
    : sessionStorage.setItem(
        "currentHeaderTitle",
        subjectName
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase())
          .join("")
      );

  const handleTaskTypeChange = (type) => {
    setCurrentTaskType(type);
  };

  return (
    <main className="main_taskPage">
      <div className="container_taskPage">
        {auth.role === "HEADMAN" && (
          <>
            <div
              className="add-study-assignment"
              onClick={() => setIsPopupOpen(!isPopupOpen)}
            >
              <h2>Додати завдання</h2>
            </div>{" "}
            {isPopupOpen && (
              <AddTaskPopup
                setOpenState={setIsPopupOpen}
                subjectName={subjectName}
              />
            )}
          </>
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
}

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

function RenderTaskCard({ subjectName, currentTaskType }) {
  const [taskList, setTaskList] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    axiosPrivate
      .get(`/api/subject/${encodeURIComponent(subjectName)}/task/all`)
      .then((responce) => {
        setTaskList(responce.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [subjectName]);

  const filteredTaskList = taskList.filter((task) =>
    currentTaskType === "ALL" ? true : task.type === currentTaskType
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
