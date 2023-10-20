import { useState, useEffect } from "react";
import "./home.css";
import { NavLink } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";

export default function Home() {
  const [inviteCode, setInviteCode] = useState("");
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  
  sessionStorage.setItem("currentHeaderTitle", sessionStorage.getItem("learningGroup"));

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

  useEffect(() => {
    // axios
    //   .get(`${apiUrl}/subject/all`, {
    //     headers: {
    //       "Content-Type": "application/json",
    //       "Cache-Control": "no-cache",
    //       Authorization: "Bearer " + jwtToken,
    //     },
    //   })
    //   .then((res) => {
    //     setSubjectList(res.data);
    //     // Save subject names to cookies
    //     const subjectNames = res.data.map((subject) => subject.name);
    //     Cookies.set("subjectNames", JSON.stringify(subjectNames));
    //     console.log("Subjects updated and cookies set!");
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

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

  // const handleSubjectClick = (id) => {
  //   setSelectedSubjectId(id);
  // };

  // const handleSubjectChange = (event) => {
  //   setSelectedSubjects(
  //     [...event.target.selectedOptions].map((option) => option.value)
  //   );
  // };

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
          <select onChange={(e) => setSelectedSubject(e.target.value)}>
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
