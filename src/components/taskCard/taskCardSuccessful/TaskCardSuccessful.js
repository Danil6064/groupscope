import React, { useState, useEffect } from "react";
import axios from "axios";

export default function TaskCardSuccessful({ selectedSubject }) {
  const [grades, setGrades] = useState([]);
  const jwtToken = localStorage.getItem("jwtToken");

  const fetchGrades = async () => {
    console.log("Fetching grades for subject:", selectedSubject);
    if (selectedSubject && jwtToken) {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/subject/${selectedSubject}/grade/all`,
          {
            headers: {
              Authorization: "Bearer " + jwtToken,
            },
          }
        );
        console.log("Received data from server:", response.data); // Додано цей рядок
        setGrades(response.data);
      } catch (error) {
        console.error("Error fetching student grades", error);
      }
    }
  };

  const handleInputMarkChange = (event, taskName) => {
    console.log("Handling input change for task:", taskName);
    const url = "http://localhost:8080/api/grade";
    const mark = parseInt(event.target.value, 10);
    const completion = mark > 0;
    const data = {
      subjectName: selectedSubject,
      taskName: taskName,
      completion: completion,
      mark: mark,
    };
    axios
      .post(url, data, {
        headers: {
          Authorization: "Bearer " + jwtToken,
        },
      })
      .then((res) => {
        console.log(res);
        fetchGrades();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    console.log(
      "Selected subject changed, triggering fetch grades:",
      selectedSubject
    );
    fetchGrades();
  }, [selectedSubject]);

  return (
    <ul className="successfulness-list">
      {grades.map((grade, index) => (
        <li
          key={`${grade.subjectName}-${grade.taskName}`}
          className="successfulness-card"
        >
          {/* <li key={index} className="successfulness-card"> */}
          <h3>{grade.taskName}</h3>
          <div
            className={`successfulness-card-task-done ${
              grade.completion ? "active" : ""
            }`}
          >
            {grade.completion ? "зроблено" : "не зроблено"}
          </div>
          <input
            placeholder="Введіть оцінку"
            defaultValue={grade.mark}
            onBlur={(e) => handleInputMarkChange(e, grade.taskName)}
          />
          <span
            className={`successfulness-card-assess ${
              grade.mark > 0 ? "active" : ""
            }`}
          >
            Оцінено
          </span>
        </li>
      ))}
    </ul>
  );
}