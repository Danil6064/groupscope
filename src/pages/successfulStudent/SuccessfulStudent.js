import { useState, useEffect } from "react";
import "./successStudent.css";
import ChoseSubjectMenu from "../../components/choseSubject/ChoseSubjectMenu";
import TaskCardSuccessful from "../../components/taskCard/taskCardSuccessful/TaskCardSuccessful";
import { useParams } from "react-router-dom";

export default function SuccessfulStudent() {
  const { subjectName } = useParams();
  const [selectedSubject, setSelectedSubject] = useState(
    localStorage.getItem("selectedSubject") || ""
  );
  sessionStorage.setItem("currentHeaderTitle", "Успішність");
  useEffect(() => {
    if (subjectName) {
      const decodedSubjectName = decodeURIComponent(subjectName);
      setSelectedSubject(decodedSubjectName);
    }
  }, [subjectName]);

  return (
    <main className="main_successfulStudent">
      <div className="container_successfulStudent">
        <ChoseSubjectMenu
          setSelectedSubject={setSelectedSubject}
          currentSubject={selectedSubject}
          redirectTo="/successfulStudent"
        />
        {selectedSubject && (
          <TaskCardSuccessful selectedSubject={selectedSubject} />
        )}
      </div>
    </main>
  );
}
