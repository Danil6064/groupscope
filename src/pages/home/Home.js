import React, { useState, useEffect } from 'react';
import RenderSubjectCards from '../../helpers/RenderSubjectCard';
import './home.css'

function Home() {
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [inviteCode, setInviteCode] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGroupInfo = async () => {
      try {
        const jwtToken = localStorage.getItem('jwtToken');
        const response = await fetch('http://localhost:8080/api/group', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + jwtToken
          }
        });

        if (!response.ok) {
          throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        setInviteCode(data.inviteCode);
        setLoading(false);
      } catch (error) {
        console.error('Помилка при отриманні інформації про групу:', error);
        setLoading(false);
      }
    };

    fetchGroupInfo();
  }, []);

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

  if (loading) {
    return <div>Завантаження...</div>;
  }

  return (
    <>
      <div className="main">
        <div className="subjects container">
          <RenderSubjectCards />
        </div>
      </div>
      {inviteCode && <p>Invite Code: {inviteCode}</p>}
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
