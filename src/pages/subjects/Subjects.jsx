import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as TasksDoneIcon } from "../../components/icons/tasksDone.svg";
import { ReactComponent as TasksUndoneIcon } from "../../components/icons/tasksUndone.svg";
import { ReactComponent as TasksDeadlineSoonIcon } from "../../components/icons/tasksDeadlineSoon.svg";
import { ReactComponent as TasksDeadlineExpiredIcon } from "../../components/icons/tasksDeadlineExpired.svg";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import "./subjects.css";

export default function Subjects() {
  const [inviteCode, setInviteCode] = useState("");
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  sessionStorage.setItem(
    "currentHeaderTitle",
    sessionStorage.getItem("learningGroup")
  );

  useEffect(() => {
    axiosPrivate
      .get("/api/group")
      .then(function (responce) {
        const { inviteCode } = responce.data;
        setInviteCode(inviteCode);

        // console.log("SET HEADER IN HOME")
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  return (
    <div className="main" style={{ alignItems: "center" }}>
      <div className="subjects container">
        <SubjectCards />

        {auth.role === "HEADMAN" && (
          <div>
            <h3>Інвайт-код:</h3>
            <p>{inviteCode}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function SubjectCards() {
  const [subjectList, setSubjectList] = useState([]);
  const [tasks, setTasks] = useState([{ total: 0, completed: 0 }]);
  const [grades, setGrades] = useState([]);
  const [newSubject, setNewSubject] = useState();
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();

  useEffect(() => {
    axiosPrivate
      .get("api/subject/all")
      .then(function (responce) {
        // console.log("api/subject/all", responce);
        setSubjectList(responce.data);
      })
      .catch(function (error) {
        console.error(error);
      });

    axiosPrivate
      .get("/api/student")
      .then(function (responce) {
        // console.log("/api/student", responce.data);
        setGrades(responce.data.grades);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  const handleAddSubjects = () => {
    axiosPrivate
      .post("/api/subject/add", { name: newSubject })
      .then(() => {
        alert("Додано новий предмет (Треба обновити сторінку)");
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const currentDate = new Date();
  const subjectCardList = subjectList.map((subject, index) => {
    let total = subject.tasks.length,
      doneCount = 0,
      undoneCount = 0,
      deadlineSoonCount = 0,
      deadlineExpiredCount = 0;

    grades
      .filter((grade) => grade.subjectName === subject.name)
      .map((grade) => {
        grade.completion ? doneCount++ : undoneCount++;
      });

    subject.tasks.map((task) => {
      const [day, month, year] = task.deadline.split(".");
      // console.log(day, month, year)
      const targetDate = new Date(year, month - 1, day);
      const differenceInDays = Math.floor(
        (targetDate - currentDate) / (1000 * 60 * 60 * 24) + 1
      );
      if (differenceInDays < 0) {
        deadlineExpiredCount++;
      } else if (0 <= differenceInDays && differenceInDays < 3) {
        deadlineSoonCount++;
      }
      // console.log(subject.name, task.name, differenceInDays);
    });

    return (
      <NavLink
        key={index}
        to={`/subjects/${subject.name}`}
        className="subject-card"
      >
        <h2>{subject.name}</h2>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: "15px" }}>
            {deadlineExpiredCount !== 0 && (
              <div
                className="task-information-icon"
                title="Кількість завдань, термін здачі яких минув"
              >
                <TasksDeadlineExpiredIcon />
                <span>{deadlineExpiredCount}</span>
              </div>
            )}

            {deadlineSoonCount !== 0 && (
              <div
                className="task-information-icon"
                title="Кількість завдань, термін здачі яких закінчиться найближчим часом (менше 3 днів)"
              >
                <TasksDeadlineSoonIcon /> <span>{deadlineSoonCount}</span>
              </div>
            )}

            {undoneCount !== 0 && (
              <div
                className="task-information-icon"
                title="Кількість завдань, які потрібно здати"
              >
                <TasksUndoneIcon /> <span>{undoneCount}</span>
              </div>
            )}
          </div>

          {total !== 0 && (
            <div
              className="task-information-icon"
              title="Кількість зроблених завдань, які були оцінені/Загальна кількість завдань за цей предмет"
            >
              <TasksDoneIcon />
              <span>
                {doneCount}/{total}
              </span>
            </div>
          )}
        </div>
      </NavLink>
    );
  });

  return (
    <>
      {subjectCardList}

      {/* Временный функционал добавление предмета */}
      {auth.role === "HEADMAN" && (
        <>
          <input
            type="text"
            placeholder="Назва предмета"
            onChange={(e) => setNewSubject(e.target.value)}
          />

          <button onClick={handleAddSubjects}>Додати</button>
        </>
      )}
    </>
  );
}
