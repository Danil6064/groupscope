import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiUrl } from "../../../helpers/MainConstants";

export default function TaskCardSuccessful({ selectedSubject }) {
  const [grades, setGrades] = useState(Array());
  const jwtToken = localStorage.getItem("jwtToken");

  const assessClassName = (mark) => {
    return `successfulness-card-assess ${mark > 0 ? "active" : null}`;
  };

  const fetchGrades = async () => {
    console.log("Fetching grades for subject:", selectedSubject);
    if (selectedSubject && jwtToken) {
      try {
        const response = await axios.get(
          `${apiUrl}/subject/${selectedSubject}/grade/all`,
          {
            headers: {
              Authorization: "Bearer " + jwtToken,
            },
          }
        );
        console.log("Received data from server:", response.data); // Додано цей рядок
        // setGrades(response.data.map(data => { // TODO for rerendering

        // }));
        setGrades(response.data);
      } catch (error) {
        console.error("Error fetching student grades", error);
      }
    }
  };

  const handleDataChange = ({ taskName, completion, mark }) => {
    const url = `${apiUrl}/grade`;
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
        <TaskCompletionButton
          completion={grade.completion}
          onTaskCompletionButtonClick={() =>
            handleDataChange({
              taskName: grade.taskName,
              completion: !grade.completion,
              mark: 0,
            })
          }
        />
        <MarkInputField
          mark={grade.mark}
          onChangeMarkInputField={(e) =>
            handleDataChange({
              taskName: grade.taskName,
              completion: grade.completion,
              mark: e.target.value,
            })
          }
        />
        <span className={assessClassName(grade.mark)}>Оцінено</span>
      </li>
    );
  });

  return <ul className="successfulness-list">{taskCards}</ul>;
}

function TaskCompletionButton({ completion, onTaskCompletionButtonClick }) {
  const TaskCompletionButtonClassName = `successfulness-card-task-done ${
    completion ? "active" : null
  }`;

  return (
    <button
      className={TaskCompletionButtonClassName}
      onClick={onTaskCompletionButtonClick}
    >
      {completion ? "зроблено" : "не зроблено"}
    </button>
  );
}

function MarkInputField({ mark, onChangeMarkInputField }) {
  return (
    <input
      type="number"
      placeholder="Введіть оцінку"
      defaultValue={mark || null}
      onBlur={onChangeMarkInputField}
    />
  );
}
