import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import "./successfulGroup.css";
import ChoseSubjectMenu from "../../components/choseSubject/ChoseSubjectMenu";
import { apiUrl } from "../../helpers/MainConstants";

export default function SuccessfulGroup() {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(
    localStorage.getItem("selectedSubject") || ""
  );
  const [studentsData, setStudentsData] = useState([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      const subjectsFromCookies = JSON.parse(
        Cookies.get("subjectNames") || "[]"
      );
      setSubjects(subjectsFromCookies);
      if (!selectedSubject && subjectsFromCookies.length > 0) {
        setSelectedSubject(subjectsFromCookies[0]);
        localStorage.setItem("selectedSubject", subjectsFromCookies[0]);
      }
    };

    fetchSubjects();
  }, [selectedSubject]);

  useEffect(() => {
    const fetchStudentsData = async () => {
      const jwtToken = localStorage.getItem("jwtToken");
      const response = await fetch(
        `${apiUrl}/group/${selectedSubject}/grade/all`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
            Authorization: "Bearer " + jwtToken,
          },
        }
      );
      const data = await response.json();
      setStudentsData(data);
    };

    if (selectedSubject) {
      fetchStudentsData();
    }
  }, [selectedSubject]);

  const abbreviateTaskName = (name) => {
    if (name.includes("Практичне Завдання")) return "ПЗ";
    if (name.includes("Лабораторна робота")) return "ЛБ";
    return name;
  };

  const taskNames = [
    ...new Set(
      studentsData.flatMap((student) =>
        student.grades.map((grade) => grade.taskName)
      )
    ),
  ];
  const conclusionClass =
    taskNames.length % 2 === 0 ? "table__odd-column" : "table__even-column";

  const studentRows = studentsData.map((student) => (
    <div className="table__row" key={student.id}>
      <div className="table-row__student-name">
        {student.name + " " + student.lastname}
      </div>
      <ul className="table-row__marks">
        {taskNames.map((task, taskIndex) => {
          const grade = student.grades.find((g) => g.taskName === task);
          const columnClass =
            taskIndex % 2 === 0 ? "table__odd-column" : "table__even-column";
          return (
            <li
              className={`table-row__mark ${columnClass}`}
              key={task + student.id}
            >
              {grade ? (
                grade.completion ? (
                  grade.mark ? (
                    grade.mark
                  ) : (
                    <div className="table__yellow-circle"></div>
                  )
                ) : (
                  <div className="table__red-circle"></div>
                )
              ) : null}
            </li>
          );
        })}
        <li className={`table-row__conclusion ${conclusionClass}`}>
          <div className="table__gradient-conclusion"></div>
        </li>
      </ul>
    </div>
  ));

  const headerRow = taskNames.map((taskName, index) => {
    let isOdd = index % 2 === 0;
    return (
      <li
        key={taskName}
        className={`table-header-row__task-type ${
          isOdd ? "table__odd-column" : "table__even-column"
        }`}
      >
        <span>{abbreviateTaskName(taskName.split(" №")[0])}</span>
        <span>№{taskName.split(" №")[1]}</span>
      </li>
    );
  });

  return (
    <main className="main_successfulGroup">
      <div className="container_successfulGroup">
        <ChoseSubjectMenu
          subjects={subjects}
          setSelectedSubject={setSelectedSubject}
          currentSubject={selectedSubject}
          redirectTo="/successfulGroup"
        />
        <div className="table">
          <div className="table__header-row">
            <div className="table-header-row__designation">
              <div className="table__center-container">
                <div className="table__red-circle"></div>
                <span>Не зроблено</span>
              </div>
              <div className="table__center-container">
                <div className="table__yellow-circle"></div>
                <span>Зроблено</span>
              </div>
            </div>
            <ul className="table-header-row__headings">
              {headerRow}
              <li className={`table-header-row__conclusion ${conclusionClass}`}>
                <span>Висновок</span>
              </li>
            </ul>
          </div>
          {/* {studentRows} */}
        </div>
      </div>
    </main>
  );
}
