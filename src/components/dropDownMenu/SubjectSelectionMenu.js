import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import DropDownMenu from "./DropDownMenu";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

export default function SubjectSelectionMenu({ subject, setSubject }) {
  const [subjectList, setSubjectList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const axiosPrivate = useAxiosPrivate();
  const selectedSubject = searchParams.get("subject") || subjectList[0];

  useEffect(() => {
    axiosPrivate
      .get("/api/subject/all")
      .then((response) => {
        // console.log(response.data);
        setSubjectList(response.data.map((subject) => subject.name));
        
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    setSubject(selectedSubject);
  }, [selectedSubject])

  function handleClick(subject) {
    setSearchParams({ subject: subject });
  }

  const menuItems = subjectList.map((subject, index) => {
    return (
      <li
        key={index}
        className="dropdown-menu-item"
        onClick={() => handleClick(subject)}
      >
        {subject}
      </li>
    );
  });

  return <DropDownMenu menuTitle={selectedSubject} menuItems={menuItems} />;
}
