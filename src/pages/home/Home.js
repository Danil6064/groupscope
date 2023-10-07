import React, { useState, useEffect } from 'react';
import RenderSubjectCards from '../../helpers/RenderSubjectCard';
import './home.css';
import {apiUrl} from '../../helpers/MainConstants'

function Home() {
  const [inviteCode, setInviteCode] = useState('');
  const jwtToken = localStorage.getItem('jwtToken');

  useEffect(() => {
    const fetchInviteCode = async () => {
      const requestHeaders = new Headers();
      requestHeaders.append('Authorization', 'Bearer ' + jwtToken);

      const response = await fetch(`${apiUrl}/group`, {
        method: 'GET',
        headers: requestHeaders
      });

      if (response.ok) {
        const data = await response.json();
        setInviteCode(data.inviteCode);
      }
    };

    fetchInviteCode();
  }, []);

  return (
    <div className="main">
      <div className="subjects container">
        <RenderSubjectCards />
        <div>
          <h3>Інвайт-код:</h3>
          <p>{inviteCode}</p>
        </div>
      </div>
    </div>
  );
}

export default Home;