import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import SubjectCard from '../components/subjectCard/SubjectCard';
import RenderTaskCard from './RenderTaskCard';
import AddTaskPopup from '../components/addTask/AddTaskPopup';

function RenderSubjectCards() {
  const [subjectList, setSubjectList] = useState([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);

  useEffect(() => {
    const fetchSubjectList = 'http://localhost:8080/api/subject/all';
    const jwtToken = localStorage.getItem('jwtToken');
    
    axios.get(fetchSubjectList, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Authorization': 'Bearer ' + jwtToken,
      }
    })
      .then((res) => {
        setSubjectList(res.data);
        // Save subject names to cookies
        const subjectNames = res.data.map(subject => subject.name);
        Cookies.set('subjectNames', JSON.stringify(subjectNames));
        console.log("Subjects updated and cookies set!");
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
        <div key={subject.id}>
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
