import { useState, useEffect } from "react";
import "./successStudent.css";
import SubjectSelectionMenu from "../../components/dropDownMenu/SubjectSelectionMenu";
import TaskCardSuccessful from "../../components/taskCard/taskCardSuccessful/TaskCardSuccessful";
import { useParams } from "react-router-dom";

export default function SuccessfulStudent() {
  // const { subjectName } = useParams();
  const [selectedSubject, setSelectedSubject] = useState();

  sessionStorage.setItem("currentHeaderTitle", "Успішність");

  // useEffect(() => {
  //   if (subjectName) {
  //     const decodedSubjectName = decodeURIComponent(subjectName);
  //     setSelectedSubject(decodedSubjectName);
  //   }
  // }, [subjectName]);

  return (
    <main className="main_successfulStudent">
      <div className="container_successfulStudent">
        {/* <ChoseSubjectMenu
          setSelectedSubject={setSelectedSubject}
          currentSubject={selectedSubject}
          redirectTo="/successfulStudent"
        /> */}
        <SubjectSelectionMenu setSubject={setSelectedSubject} />

        {selectedSubject && (
          <TaskCardSuccessful selectedSubject={selectedSubject} />
        )}
      </div>
    </main>
  );
}
