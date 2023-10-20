import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import DropDownMenu from "./DropDownMenu";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

export default function SubjectSelectionMenu({ setSubject }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [subjectList, setSubjectList] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const selectedSubject = searchParams.get("subject") || "оберіть предмет";

  //   console.log("SubjectList:", subjectList);
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

    setSubject(selectedSubject);
  }, []);

  function handleClick(subject) {
    setSearchParams({ subject: subject });
    setSubject(subject);
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
