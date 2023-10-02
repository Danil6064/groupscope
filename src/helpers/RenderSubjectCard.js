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
      key={id}
      to={`/subject/${encodeURIComponent(name)}`}
      className="subject-card"
      onClick={() => onClick(id)}
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
        // <div key={subject.id}>
        <SubjectCard
          name={subject.name}
          id={subject.id}
          onClick={() => handleSubjectClick(subject.id)}
        />
        /* {selectedSubjectId === subject.id && (     // eto tochno rabotaet????????
            <>
              <RenderTaskCard subjectId={subject.id} />
              <AddTaskPopup subjectId={subject.id} />
            </>
          )}
          </div> */
      ))}

      {userRole === "HEADMAN" && (
        <>
          <select multiple={true} onChange={handleSubjectChange}>
            <option value="Програмування">Програмування</option>
            <option value="Іноземна мова">Іноземна мова</option>
            <option value="Філософія">Філософія</option>
            <option value="Плак плак плак">Плак плак плак</option>
            <option value="Как так как ?">Как так как ?</option>
          </select>

          <button onClick={handleAddSubjects}>Додати</button>
        </>
      )}
    </>
  );
}

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import SubjectCard from '../components/subjectCard/SubjectCard';
// import RenderTaskCard from './RenderTaskCard';
// import AddTaskPopup from '../components/addTask/AddTaskPopup';

// function RenderSubjectCards() {
//   const [subjectList, setSubjectList] = useState([]);
//   const [selectedSubjectId, setSelectedSubjectId] = useState(null);
//   const [selectedSubjects, setSelectedSubjects] = useState([]);

//   useEffect(() => {
//     const fetchSubjectList = 'http://localhost:8080/api/subject/all';
//     const jwtToken = localStorage.getItem('jwtToken');

//     axios.get(fetchSubjectList, {
//       headers: {
//         'Content-Type': 'application/json',
//         'Cache-Control': 'no-cache',
//         'Authorization': 'Bearer ' + jwtToken,
//       }
//     })
//     .then((res) => {
//       setSubjectList(res.data);
//       // Save subject names to cookies
//       const subjectNames = res.data.map(subject => subject.name);
//       Cookies.set('subjectNames', JSON.stringify(subjectNames));
//       console.log("Subjects updated and cookies set!");
//     })
//     .catch((error) => {
//       console.log(error);
//     });
//   }, []);

//   const handleSubjectClick = (id) => {
//     setSelectedSubjectId(id);
//   };

//   const handleSubjectChange = (event) => {
//     setSelectedSubjects([...event.target.selectedOptions].map(option => option.value));
//   }

//   const handleAddSubjects = async () => {
//     try {
//       const jwtToken = localStorage.getItem('jwtToken');
//       for (const subject of selectedSubjects) {
//         const response = await fetch('http://localhost:8080/api/subject/add', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': 'Bearer ' + jwtToken
//           },
//           body: JSON.stringify({ name: subject })
//         });

//         if (!response.ok) {
//           throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
//         }
//       }

//       alert('Предмети додано');
//       window.location.reload();
//     } catch (error) {
//       console.error('Помилка при додаванні предметів:', error);
//       alert('Сталася помилка при додаванні предметів.');
//     }
//   }

//   const userRole = localStorage.getItem('userRole');

//     </>
//   );
// }

// export default RenderSubjectCards;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import SubjectCard from '../components/subjectCard/SubjectCard';
// import RenderTaskCard from './RenderTaskCard';
// import AddTaskPopup from '../components/addTask/AddTaskPopup';

// function RenderSubjectCards() {
//   const [subjectList, setSubjectList] = useState([]);
//   const [selectedSubjectId, setSelectedSubjectId] = useState(null);

//   useEffect(() => {
//     const fetchSubjectList = 'http://localhost:8080/api/subject/all';
//     const jwtToken = localStorage.getItem('jwtToken');

//     axios.get(fetchSubjectList, {
//       headers: {
//         'Content-Type': 'application/json',
//         'Cache-Control': 'no-cache',
//         'Authorization': 'Bearer ' + jwtToken,
//       }
//     })
//       .then((res) => {
//         setSubjectList(res.data);
//         // Save subject names to cookies
//         const subjectNames = res.data.map(subject => subject.name);
//         Cookies.set('subjectNames', JSON.stringify(subjectNames));
//         console.log("Subjects updated and cookies set!");
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);

//   const handleSubjectClick = (id) => {
//     setSelectedSubjectId(id);
//   };

//   return (
//     <>
//       {subjectList.map((subject) => (
//         <div key={subject.id}>
//           <SubjectCard
//             name={subject.name}
//             id={subject.id}
//             onClick={handleSubjectClick}
//           />
//           {selectedSubjectId === subject.id && (
//             <>
//               <RenderTaskCard subjectId={subject.id} />
//               <AddTaskPopup subjectId={subject.id} />
//             </>
//           )}
//         </div>
//       ))}
//     </>
//   );
// }

// export default RenderSubjectCards;
