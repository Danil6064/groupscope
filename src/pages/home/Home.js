import React, { useState, useEffect } from "react";
// import RenderSubjectCards from "../../helpers/RenderSubjectCard";
import "./home.css";
import { apiUrl } from "../../helpers/MainConstants";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie"; // Додайте цей рядок

export default function Home() {
  const [inviteCode, setInviteCode] = useState("");
  const jwtToken = localStorage.getItem("jwtToken");

  useEffect(() => {
    const fetchInviteCode = async () => {
      const requestHeaders = new Headers();
      requestHeaders.append("Authorization", "Bearer " + jwtToken);

      const response = await fetch(`${apiUrl}/group`, {
        method: "GET",
        headers: requestHeaders,
      });

      if (response.ok) {
        const data = await response.json();
        setInviteCode(data.inviteCode);
      }
    };

    fetchInviteCode();
  }, []);

  const userRole = localStorage.getItem("userRole");

  return (
    <div className="main">
      <div className="subjects container">
        <SubjectCards />

        {userRole === "HEADMAN" && (
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
  // const [selectedSubjectId, setSelectedSubjectId] = useState(null);
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");

    axios
      .get(`${apiUrl}/subject/all`, {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
          Authorization: "Bearer " + jwtToken,
        },
      })
      .then((res) => {
        setSubjectList(res.data);
        // Save subject names to cookies
        const subjectNames = res.data.map((subject) => subject.name);
        Cookies.set("subjectNames", JSON.stringify(subjectNames));
        console.log("Subjects updated and cookies set!");
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // const handleSubjectClick = (id) => {
  //   setSelectedSubjectId(id);
  // };

  const handleSubjectChange = (event) => {
    setSelectedSubjects(
      [...event.target.selectedOptions].map((option) => option.value)
    );
  };

  const handleAddSubjects = async () => {
    try {
      const jwtToken = localStorage.getItem("jwtToken");
      for (const subject of selectedSubjects) {
        const response = await fetch(`${apiUrl}/subject/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + jwtToken,
          },
          body: JSON.stringify({ name: subject }),
        });

        if (!response.ok) {
          throw new Error(
            `Server responded with ${response.status}: ${response.statusText}`
          );
        }
      }

      alert("Предмети додано");
      window.location.reload();
    } catch (error) {
      console.error("Помилка при додаванні предметів:", error);
      alert("Сталася помилка при додаванні предметів.");
    }
  };

  const userRole = localStorage.getItem("userRole");

  const subjectCardList = subjectList.map((subject) => {
    return (
      <NavLink
        key={subject.id}
        to={`/subject/${encodeURIComponent(subject.name)}`}
        className="subject-card"
        // onClick={() => handleSubjectClick(subject.id)}
      >
        <h2>{subject.name}</h2>
      </NavLink>
    );
  });

  return (
    <>
      {subjectCardList}

      {/* Временный функционал добавление предмета */}
      {userRole === "HEADMAN" && (
        <>
          <select multiple={true} onChange={handleSubjectChange}>
            <option value="Бази даних">Бази даних</option>
            <option value="Soft skills">Soft skills</option>
            <option value="WEB-програмування">WEB-програмування</option>
            <option value="Захист від технічних розвідок">
              Захист від технічних розвідок
            </option>
            <option value="Інформаційно-комунікаційні системи">
              Інформаційно-комунікаційні системи
            </option>
            <option value="Комплексні системи захисту інформації">
              Комплексні системи захисту інформації
            </option>
            <option value="Нормативно-правове забезпечення інформаційної безпеки">
              Інформаційно-комунікаційні системи
            </option>
            <option value="Психологія управління">Психологія управління</option>
            <option value="Соціальна психологія та конфліктологія">
              Соціальна психологія та конфліктологія
            </option>
            <option value="Фізичне виховання">Фізичне виховання</option>
            <option value="Нормативно-правове забезпечення ІБ">
              Нормативно-правове забезпечення ІБ
            </option>
          </select>
          <button onClick={handleAddSubjects}>Додати</button>
        </>
      )}
    </>
  );
}
