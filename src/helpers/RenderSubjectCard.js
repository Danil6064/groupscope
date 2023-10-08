import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie"; // Додайте цей рядок
import RenderTaskCard from "./RenderTaskCard";
import AddTaskPopup from "../components/addTask/AddTaskPopup";
import { apiUrl } from "../helpers/MainConstants";

function SubjectCard({ name, id, onClick }) {
  return (
    <NavLink
      to={`/subject/${encodeURIComponent(name)}`}
      className="subject-card"
      onClick={onClick(id)}
    >
      <h2>{name}</h2>
    </NavLink>
  );
}

export default function RenderSubjectCards() {
  const [subjectList, setSubjectList] = useState([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  useEffect(() => {
    const fetchSubjectList = `${apiUrl}/subject/all`;
    const jwtToken = localStorage.getItem("jwtToken");

    axios
      .get(fetchSubjectList, {
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

  const handleSubjectClick = (id) => {
    setSelectedSubjectId(id);
  };

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

  return (
    <>
      {subjectList.map((subject) => (
        <SubjectCard
          key={subject.id}
          name={subject.name}
          id={subject.id}
          onClick={() => handleSubjectClick(subject.id)}
        />
        /*
          {selectedSubjectId === subject.id && (  
            <>
              <RenderTaskCard subjectId={subject.id} />
              <AddTaskPopup subjectId={subject.id} />
            </>
          )}
          */
      ))}

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
          </select>
          <button onClick={handleAddSubjects}>Додати</button>
        </>
      )}
    </>
  );
}
