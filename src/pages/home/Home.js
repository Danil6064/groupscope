import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as TasksDoneIcon } from "../../components/icons/tasksDone.svg";
import { ReactComponent as TasksUndoneIcon } from "../../components/icons/tasksUndone.svg";
import { ReactComponent as TasksDeadlineSoonIcon } from "../../components/icons/tasksDeadlineSoon.svg";
import { ReactComponent as TasksDeadlineExpiredIcon } from "../../components/icons/tasksDeadlineExpired.svg";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import "./home.css";

export default function Home() {
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
    <div className="main">
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
  const [selectedSubject, setSelectedSubject] = useState();
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
  }, []);

  const handleAddSubjects = () => {
    axiosPrivate
      .post("/api/subject/add", { name: selectedSubject })
      .then(() => {
        alert("Додано новий предмет (Треба обновити сторінку)");
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const subjectCardList = subjectList.map((subject, index) => {

    return (
      <NavLink
        key={index}
        to={`/subject/${subject.name}`}
        className="subject-card"
      >
        <h2>{subject.name}</h2>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: "10px" }}>
            <div className="task-information-icon">
              <TasksDeadlineExpiredIcon />
              <span>1</span>
            </div>

            <div className="task-information-icon">
              <TasksDeadlineSoonIcon /> <span>2</span>
            </div>

            <div
              className="task-information-icon"
              title="Кількість завдань, які потрібно здати"
            >
              <TasksUndoneIcon /> <span>7</span>
            </div>
          </div>

          <div
            className="task-information-icon"
            title="Кількість зроблених завдань, які були оцінені/Загальна кількість завдань за цей предмет"
          >
            <TasksDoneIcon />{" "}
            <span>
              {subject.tasks.length}/{subject.tasks.length}
            </span>
          </div>
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
            onChange={(e) => setSelectedSubject(e.target.value)}
          />

          <button onClick={handleAddSubjects}>Додати</button>
        </>
      )}
    </>
  );
}
