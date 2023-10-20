import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import "./successfulGroup.css";
import SubjectSelectionMenu from "../../components/dropDownMenu/SubjectSelectionMenu";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

export default function SuccessfulGroup() {
  const [selectedSubject, setSelectedSubject] = useState();
  const [studentsData, setStudentsData] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const isAdaptive = useMediaQuery({ query: "max-width: 1220px" });

  sessionStorage.setItem("currentHeaderTitle", "Успішність групи");

  useEffect(() => {
    axiosPrivate
      .get(`/api/group/${selectedSubject}/grade/all`)
      .then((response) => {
        // console.log(response.data);
        setStudentsData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

  }, [selectedSubject]);

  // console.log(selectedSubject)

  return (
    <main className="main_successfulGroup">
      <div className="container_successfulGroup">
        <SubjectSelectionMenu setSubject={setSelectedSubject} />
        {selectedSubject && <DesktopTable studentsData={studentsData} />}
      </div>
    </main>
  );
}

function DesktopTable({ studentsData }) {
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

  const headerRow = taskNames.map((taskName, index) => {
    let isOdd = index % 2 === 0;
    return (
      <li
        key={index}
        className={`table-header-row__task-type ${
          isOdd ? "table__odd-column" : "table__even-column"
        }`}
      >
        <span>{abbreviateTaskName(taskName.split(" №")[0])}</span>
        <span>№{taskName.split(" №")[1]}</span>
      </li>
    );
  });

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
        <li
          className={`table-row__conclusion ${
            taskNames.length % 2 === 0
              ? "table__odd-column"
              : "table__even-column"
          }`}
        >
          <div className="table__gradient-conclusion"></div>
        </li>
      </ul>
    </div>
  ));

  return (
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
          <li
            className={`table-header-row__conclusion ${
              taskNames.length % 2 === 0
                ? "table__odd-column"
                : "table__even-column"
            }`}
          >
            <span>Висновок</span>
          </li>
        </ul>
      </div>
      {studentRows}
    </div>
  );
}
