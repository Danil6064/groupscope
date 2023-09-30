import React, { useState, useEffect } from "react";
import axios from "axios";

export default function TaskCardSuccessful({ selectedSubject }) {
  const [grades, setGrades] = useState(Array());
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

  const handleDataChange = ({ taskName, completion, mark }) => {
    const url = "http://localhost:8080/api/grade";
    if (!mark) mark = 0;
    if (mark > 0) completion = true;
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

  const taskCards = grades.map((grade) => {
    return (
      <li
        className="successfulness-card"
        key={`${grade.subjectName}-${grade.taskName}`}
      >
        <h3>{grade.taskName}</h3>

        <button
          className={`successfulness-card-task-done ${
            grade.completion ? "active" : ""
          }`}
          onClick={() =>
            handleDataChange({
              taskName: grade.taskName,
              completion: !grade.completion,
              mark: 0,
            })
          }
        >
          {grade.completion ? "зроблено" : "не зроблено"}
        </button>

        <input
          type="number"
          placeholder="Введіть оцінку"
          defaultValue={grade.mark || ""}
          onBlur={(e) =>
            handleDataChange({
              taskName: grade.taskName,
              completion: grade.completion,
              mark: e.target.value,
            })
          }
        />

        <span
          className={`successfulness-card-assess ${
            grade.mark > 0 ? "active" : ""
          }`}
        >
          Оцінено
        </span>
      </li>
    );
  });

  return <ul className="successfulness-list">{taskCards}</ul>;

  // return (
  //   <ul className="successfulness-list">
  //     {grades.map((grade) => (
  //       <li
  //         key={`${grade.subjectName}-${grade.taskName}`}
  //         className="successfulness-card"
  //       >
  //         {/* <li key={index} className="successfulness-card"> */}
  //         <h3>{grade.taskName}</h3>

  //         <button
  //           className={`successfulness-card-task-done ${
  //             grade.completion ? "active" : ""
  //           }`}
  //           onClick={() =>
  //             handleDataChange({
  //               taskName: grade.taskName,
  //               completion: !grade.completion,
  //               mark: 0,
  //             })
  //           }
  //         >
  //           {grade.completion ? "зроблено" : "не зроблено"}
  //         </button>

  //         <input
  //           type="number"
  //           placeholder="Введіть оцінку"
  //           defaultValue={grade.mark || ""}
  //           onBlur={(e) =>
  //             handleDataChange({
  //               taskName: grade.taskName,
  //               completion: grade.completion,
  //               mark: e.target.value,
  //             })
  //           }
  //         />

  //         <span
  //           className={`successfulness-card-assess ${
  //             grade.mark > 0 ? "active" : ""
  //           }`}
  //         >
  //           Оцінено
  //         </span>
  //       </li>
  //     ))}
  //   </ul>
  // );
}
