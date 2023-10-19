import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import DropDownMenu from "../dropDownMenu/DropDownMenu";

export default function ChoseSubjectMenu({
  setSelectedSubject,
  currentSubject,
  redirectTo,
}) {
  const [subjects, setSubjects] = useState([]);
  const [selected, setSelected] = useState(
    localStorage.getItem("selectedSubject") || currentSubject || ""
  );
  const navigate = useNavigate();

  useEffect(() => {
    const subjectsFromCookies = JSON.parse(Cookies.get("subjectNames") || "[]");
    setSubjects(subjectsFromCookies);

    if (!selected && subjectsFromCookies.length > 0) {
      const firstSubject = subjectsFromCookies[0];
      setSelected(firstSubject);
      setSelectedSubject(firstSubject);
      localStorage.setItem("selectedSubject", firstSubject);
    }
  }, []);

  useEffect(() => {
    if (selected) {
      localStorage.setItem("selectedSubject", selected);
      navigate(`${redirectTo}/${selected}`);
    }
  }, [selected, navigate, redirectTo]);

  const handleClick = (subject) => {
    setSelected(subject);
    setSelectedSubject(subject);
  };

  const menuItems = subjects.map((subject, index) => {
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

  return <DropDownMenu menuTitle={selected} menuItems={menuItems} />;
}
