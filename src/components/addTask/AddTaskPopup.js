import { useState } from "react";
import "./addTask.css";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

export default function AddTaskPopup({ setOpenState, subjectName }) {
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
                <select onChange={(e) => setTaskType(e.target.value)}>
                  <option value="ПЗ">ПЗ</option>
                  <option value="ЛБ">ЛБ</option>
                  <option value="ТЕСТ">ТЕСТ</option>
                </select>
              </li>
              <li className="popup__list-item">
                <h3>Оберіть номер завдання:</h3>
                <select onChange={(e) => setTaskNumber(e.target.value)}>
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((number) => (
                    <option key={number} value={number}>
                      {number}
                    </option>
                  ))}
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
              <div className="popup__close-btn" onClick={() => setOpenState(false)}>
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
