
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SubjectCard from '../components/subjectCard/SubjectCard';
import RenderTaskCard from './RenderTaskCard';

import AddTaskPopup from '../components/addTask/AddTaskPopup';



function RenderSubjectCards() {
  const [subjectList, setSubjectList] = useState([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);

  useEffect(() => {
    const fetchSubjectList = 'http://localhost:8080/getSubjects';

    axios.get(fetchSubjectList)
      .then((res) => {
        setSubjectList(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubjectClick = (id) => {
    setSelectedSubjectId(id);
  };

  return (
    <>
      {subjectList.map((subject) => (
        <div  key={subject.id}>
          <SubjectCard
            name={subject.name}
            id={subject.id}
            onClick={handleSubjectClick}
          />
          {selectedSubjectId === subject.id && (
            <>
              <RenderTaskCard subjectId={subject.id} />
              <AddTaskPopup subjectId={subject.id} />
            </>
          )}
        </div>
      ))}
    </>
  );
}

export default RenderSubjectCards;
