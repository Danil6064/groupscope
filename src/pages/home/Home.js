import { useState, useEffect } from "react";
import "./home.css";
import { NavLink } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";

export default function Home() {
  const [inviteCode, setInviteCode] = useState("");
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  sessionStorage.setItem(
    "currentHeaderTitle",
    sessionStorage.getItem("learningGroup")
  );

  useEffect(() => {
    // console.log("HOME USEEFFECT");

    axiosPrivate
      .get("/api/group")
      .then(function (responce) {
        const { inviteCode, name } = responce.data;
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
  // const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState();
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  console.log(selectedSubject);

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
      .then((response) => console.log("/api/subject/add", response))
      .catch(function (error) {
        console.error(error);
      });
  };

  const subjectCardList = subjectList.map((subject, index) => {
    return (
      <NavLink
        key={index}
        // to={`/subject/${encodeURIComponent(subject.name)}`}
        to={`/subject/${subject.name}`}
        className="subject-card"
      >
        <h2>{subject.name}</h2>
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
