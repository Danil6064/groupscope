import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { ReactComponent as EditIcon } from "../../components/icons/edit.svg";
import "./taskPage.css";
import useAuth from "../../hooks/useAuth";
import DropDownMenu from "../../components/dropDownMenu/DropDownMenu";
import AddTaskPopup from "../../components/addTask/AddTaskPopup";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function headerTitleShortcut(subjectName) {
  const maxSubjectLength = 25;
  return subjectName.length <= maxSubjectLength
    ? subjectName
    : subjectName
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase())
        .join("");
}

export default function TaskPage() {
  const { subjectName } = useParams();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentTaskType, setCurrentTaskType] = useState("ALL");
  const { auth } = useAuth();
 

  sessionStorage.setItem(
    "currentHeaderTitle",
    headerTitleShortcut(subjectName)
  );

  // console.log("rerender");

  return (
    <main className="main_taskPage">
      <div className="container_taskPage">
        {auth.role === "HEADMAN" && (
          <>
            <div
              className="add-study-assignment"
              onClick={() => setIsPopupOpen(true)}
            >
              <h2>Додати завдання</h2>
            </div>{" "}
            {auth.role === "HEADMAN" && isPopupOpen && (
              <AddTaskPopup
                handleOpenState={() => setIsPopupOpen(!isPopupOpen)}
                taskInfo={{ subjectName: subjectName }}
                isNewTask={true}
              />
            )}
          </>
        )}

        <ChoseTypeTask onTypeChange={(type) => setCurrentTaskType(type)} />

        <TaskCardList
          subjectName={subjectName}
          currentTaskType={currentTaskType}
        />
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

  const menuElements = availableTaskTypes.map((taskType, index) => {
    return (
      <li
        key={index}
        className="dropdown-menu-item"
        onClick={() => handleClick(taskType)}
      >
        {taskTypeMap[taskType]}
      </li>
    );
  });

  return <DropDownMenu menuTitle={selectedTaskType} menuItems={menuElements} />;
}

function TaskCardList({ subjectName, currentTaskType }) {
  const [taskList, setTaskList] = useState([
    {
      id: Number(),
      name: "",
      type: "",
      maxMark: Number(),
      info: "",
      deadline: "",
    },
  ]);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    axiosPrivate
      .get(`/api/subject/${subjectName}/task/all`)
      .then((responce) => {
        setTaskList(responce.data);
        // console.log(responce.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [subjectName]);

  const filteredTaskList = taskList.filter((task) =>
    currentTaskType === "ALL" ? true : task.type === currentTaskType
  );

  return (
    <ul className="homework-list">
      {filteredTaskList.map((task, index) => {
        return <TaskCard key={index} task={task} />;
      })}
    </ul>
  );
}

function TaskCard({ task }) {
  const [showMore, setShowMore] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { subjectName } = useParams();
  const isMobile = useMediaQuery({ query: "(max-width: 480px)" });

  const TaskInfoButton = () => {
    return (
      <div className="task-info">
        <button
          className="task-info-btn"
          onClick={() => setShowMore(!showMore)}
        >
          <svg width="10" height="10" viewBox="0 0 19 19">
            <polygon points="0,0 19,0 9.5,19" />
          </svg>
          <span>{showMore ? "згорнути" : "розгорнути"} опис завдання</span>
          <svg width="10" height="10" viewBox="0 0 19 19">
            <polygon points="0,0 19,0 9.5,19" />
          </svg>
        </button>
      </div>
    );
  };

  return (
    <li className="homework-card">
      <h3>{task.name}</h3>

      {isMobile ? (
        <>
          <TaskInfoButton />
          {showMore && (
            <div className="homework-text">
              <span>{task.info}</span>
            </div>
          )}
        </>
      ) : (
        <div className="homework-text">
          <span>{task.info}</span>
        </div>
      )}

      <div className="homework-card-footer">
        <Link className={"task-navigate-link"} to={"#"}>
          До успішності
        </Link>
        <div className="homework-deadline">Дата здачи: {task.deadline}</div>
        <div className="edit-icon">
          <EditIcon className="edit-btn" onClick={() => setIsPopupOpen(true)} />
        </div>
      </div>

      {isPopupOpen && (
        <AddTaskPopup
          handleOpenState={() => setIsPopupOpen(!isPopupOpen)}
          taskInfo={{
            type: task.type,
            deadline: task.deadline.split(".").reverse().join("-"),
            description: task.info,
            maxMark: task.maxMark,
            subjectName: subjectName,
            name: task.name,
          }}
          isNewTask={false}
        />
      )}
    </li>
  );
}
