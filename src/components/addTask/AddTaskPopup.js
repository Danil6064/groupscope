import { useState } from "react";
import { ReactComponent as CloseIcon } from "../icons/close.svg";
import { ReactComponent as LinkIcon } from "../icons/link.svg";
import { ReactComponent as SaveIcon } from "../icons/save.svg";
import { ReactComponent as DeleteIcon } from "../icons/delete.svg";
import "./addTaskPopup.css";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

export default function TaskPopup({ handleOpenState, taskInfo, isNewTask }) {
  const [taskType, setTaskType] = useState(taskInfo?.type);
  const [taskNumber, setTaskNumber] = useState(taskInfo?.number);
  const [taskDeadline, setTaskDeadline] = useState(taskInfo?.deadline);
  const [taskDescription, setTaskDescription] = useState(taskInfo?.description);
  const axiosPrivate = useAxiosPrivate();

  const [task, setTask] = useState({
    type: taskInfo?.type,
    number: taskInfo?.number,
    deadline: taskInfo?.deadline,
    description: taskInfo?.description,
  });

  console.log("taskType", taskType);

  const handleSaveButton = () => {
    const taskTypeMap = {
      PRACTICAL: "Практичне завдання",
      LABORATORY: "Лабораторна робота",
      TEST: "Тест",
    };
    const taskName = `${taskTypeMap[taskType]} №${taskNumber}`;

    console.log("taskName:", taskName);

    const requestBody = {};

    isNewTask
      ? axiosPrivate
          .post(`/api/subject/${taskInfo.subjectName}/task/add`, {
            name: taskName,
            type: taskType,
            info: taskDescription,
            deadline: taskDeadline.split("-").reverse().join("."),
          })
          .then(() => {
            alert("Task added");
            handleOpenState();
          })
          .catch((error) => {
            console.error(error);
          })
      : axiosPrivate
          .patch(`/api/subject/${taskInfo.subjectName}/task/patch`, {
            name: taskInfo.name,
            newName: taskName,
            type: taskType,
            info: taskDescription,
            deadline: taskDeadline.split("-").reverse().join("."),
          })
          .then(() => {
            alert("Task changed");
            handleOpenState();
          })
          .catch((error) => {
            console.error(error);
          });
  };

  const handleDeleteButton = () => {
    console.log("subjectName", taskInfo.subjectName);
    console.log("name", taskInfo.name);
    axiosPrivate
      .delete(`/api/subject/${taskInfo.subjectName}/task/delete`, {
        data: { name: taskInfo.name },
      })
      .then(() => {
        alert("Task deleted");
        handleOpenState();
      })
      .catch((error) => console.error(error));
  };

  const SaveButton = () => (
    <button
      className="popup__btn"
      onClick={handleSaveButton}
      // disabled={!taskType || !taskNumber || !taskDeadline || !taskDescription}
    >
      <SaveIcon style={{ marginRight: 10 }} />
      Зберегти
    </button>
  );
  const DeleteButton = () => (
    <button className="popup__btn" onClick={handleDeleteButton}>
      <DeleteIcon style={{ marginRight: 10 }} />
      Видалити
    </button>
  );

  // console.log(taskDeadline);
  return (
    <div className="popup-overlay">
      <section className="popup">
        <header className="popup__header">
          <div />
          <h2>{isNewTask ? "Додаємо нове " : "Редагуємо "}завдання</h2>
          <CloseIcon className="popup__close-btn" onClick={handleOpenState} />
        </header>

        <div>
          <div className="popup__form-item">
            <label>Оберіть тип завдання:</label>
            <select
              // required={isNewTask}
              defaultValue={taskType}
              onChange={(event) => setTaskType(event.target.value)}
            >
              <option value="PRACTICAL">ПЗ</option>
              <option value="LABORATORY">ЛБ</option>
              <option value="TEST">ТЕСТ</option>
            </select>
          </div>

          <div className="popup__form-item">
            <label>Оберіть номер завдання:</label>
            <select
              // required={isNewTask}
              defaultValue={taskNumber}
              onChange={(event) => setTaskNumber(event.target.value)}
            >
              {Array.from({ length: 10 }, (_, index) => index + 1).map(
                (number, index) => (
                  <option key={index} value={number}>
                    {number}
                  </option>
                )
              )}
            </select>
          </div>
          <div className="popup__form-item">
            <label>Дата останьої здачи:</label>
            <input
              type="date"
              required={isNewTask}
              defaultValue={taskDeadline}
              onChange={(event) => setTaskDeadline(event.target.value)}
            />
          </div>
          <div className="popup__form-item">
            <label>Напишіть завдання:</label>
            <LinkIcon className="popup__link-btn" />
          </div>
          <textarea
            className="popup__task-input"
            required={isNewTask}
            defaultValue={taskDescription}
            onChange={(event) => setTaskDescription(event.target.value)}
          ></textarea>

          <div
            className={`popup__btns ${isNewTask ? "center" : "space-between"}`}
          >
            {!isNewTask && <DeleteButton />}
            <SaveButton />
          </div>
        </div>
      </section>
    </div>
  );
}

function AddTaskPopup0({ setOpenState, subjectName }) {
  const [taskType, setTaskType] = useState("ПЗ");
  const [taskNumber, setTaskNumber] = useState(1);
  const [dueDate, setDueDate] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const axiosPrivate = useAxiosPrivate();

  const handleSave = () => {
    const taskTypeMap = {
      ПЗ: { name: "Практичне Завдання", type: "PRACTICAL" },
      ЛБ: { name: "Лабораторна робота", type: "LABORATORY" },
      ТЕСТ: { name: "Тест", type: "TEST" },
    };

    const taskName = `${taskTypeMap[taskType].name} №${taskNumber}`;

    const requestBody = {
      name: taskName,
      type: taskTypeMap[taskType].type,
      info: taskDescription,
      deadline: dueDate.split("-").reverse().join("."),
    };

    axiosPrivate
      .post(`/api/subject/${subjectName}/task/add`, requestBody)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    setOpenState(false);
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <div className="popup__content">
          <div className="popup__header">
            <h2>Додаємо нове завдання</h2>
          </div>
          <div className="popup__body">
            <ul className="popup__list">
              <li className="popup__list-item">
                <h3>Оберіть тип завдання:</h3>
                <select onChange={(event) => setTaskType(event.target.value)}>
                  <option value="ПЗ">ПЗ</option>
                  <option value="ЛБ">ЛБ</option>
                  <option value="ТЕСТ">ТЕСТ</option>
                </select>
              </li>
              <li className="popup__list-item">
                <h3>Оберіть номер завдання:</h3>
                <select onChange={(e) => setTaskNumber(e.target.value)}>
                  {Array.from({ length: 10 }, (_, i) => i + 1).map(
                    (number, index) => (
                      <option key={index} value={number}>
                        {number}
                      </option>
                    )
                  )}
                </select>
              </li>
              <li className="popup__list-item">
                <h3>ДАТА ОСТАННЬОЇ ЗДАЧІ:</h3>
                <input
                  type="date"
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </li>
              <li className="popup__list-item">
                <h3>Напишіть завдання:</h3>
              </li>
            </ul>
            <textarea
              className="popup__task-input"
              onChange={(e) => setTaskDescription(e.target.value)}
            ></textarea>
            <div className="popup__btns">
              <div
                className="popup__close-btn"
                onClick={() => setOpenState(false)}
              >
                Скасувати
              </div>
              <div className="popup__save-btn" onClick={handleSave}>
                Зберегти
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
