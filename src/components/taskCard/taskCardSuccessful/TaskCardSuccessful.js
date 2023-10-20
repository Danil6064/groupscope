import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

export default function TaskCardSuccessful({ selectedSubject }) {
  const [grades, setGrades] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  const assessClassName = (mark) => {
    return `successfulness-card-assess ${mark > 0 ? "active" : ""}`;
  };

  useEffect(() => {
    axiosPrivate
      .get(`/api/subject/${selectedSubject}/grade/all`)
      .then((response) => {
        setGrades(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [selectedSubject]);

  const handleDataChange = ({ taskName, completion, mark }) => {
    if (!mark) mark = 0;
    if (mark > 0) completion = true;
    const data = {
      subjectName: selectedSubject,
      taskName: taskName,
      completion: completion,
      mark: mark,
    };

    axiosPrivate
      .post("/api/grade", data)
      .then(/*(response) => {console.log(response.data)}*/)
      .catch((error) => {
        console.error(error);
      });
  };

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
