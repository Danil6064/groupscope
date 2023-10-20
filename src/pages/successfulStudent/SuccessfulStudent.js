import { useState, useEffect } from "react";
import "./successStudent.css";
import SubjectSelectionMenu from "../../components/dropDownMenu/SubjectSelectionMenu";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

export default function SuccessfulStudent() {
  const [selectedSubject, setSelectedSubject] = useState();

  sessionStorage.setItem("currentHeaderTitle", "Успішність");

  return (
    <main className="main_successfulStudent">
      <div className="container_successfulStudent">
        <SubjectSelectionMenu setSubject={setSelectedSubject} />
        {selectedSubject && (
          <TaskCardSuccessful selectedSubject={selectedSubject} />
        )}
      </div>
    </main>
  );
}

function TaskCardSuccessful({ selectedSubject }) {
  const [grades, setGrades] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  const assessClassName = (mark) => {
    return `successfulness-card-assess ${mark > 0 ? "active" : ""}`;
  };

  // console.log("Rerender", grades);

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
      .post("/api/grade", data) // TODO
      .then(() => {
        axiosPrivate
          .get(`/api/subject/${selectedSubject}/grade/all`)
          .then((response) => {
            setGrades(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const taskCards = grades.map((grade, index) => {
    return (
      <li className="successfulness-card" key={index}>
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
