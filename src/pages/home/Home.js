import React, { useState } from 'react';
import RenderSubjectCards from '../../helpers/RenderSubjectCard';
import './home.css'


function Home() {
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  const handleSubjectChange = (event) => {
    setSelectedSubjects([...event.target.selectedOptions].map(option => option.value));
  }

  const handleAddSubjects = async () => {
    try {
      const jwtToken = localStorage.getItem('jwtToken');
      for (const subject of selectedSubjects) {
        const response = await fetch('http://localhost:8080/api/subject/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + jwtToken
          },
          body: JSON.stringify({ name: subject })
        });

        if (!response.ok) {
          throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
        }
      }

      alert('Предмети додано');
    } catch (error) {
      console.error('Помилка при додаванні предметів:', error);
      alert('Сталася помилка при додаванні предметів.');
    }
  }

  return (
   <> 
   <div className="main">
      <div className="subjects container">

      <RenderSubjectCards />


      </div>
    </div>
      <select multiple={true} onChange={handleSubjectChange}>
        <option value="Програмування">Програмування</option>
        <option value="Іноземна мова">Іноземна мова</option>
        <option value="Філософія">Філософія</option>
        <option value="Плак плак плак">Плак плак плак</option>
        <option value="Как так как ?">Как так как ?</option>
      </select>

      <button onClick={handleAddSubjects}>Додати</button>
  </>
      );
}

export default Home;
