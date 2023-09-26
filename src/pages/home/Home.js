import React, { useState, useEffect } from 'react';
import RenderSubjectCards from '../../helpers/RenderSubjectCard';
import './home.css';

function Home() {
  const [inviteCode, setInviteCode] = useState('');
  const jwtToken = localStorage.getItem('jwtToken');

  useEffect(() => {
    const fetchInviteCode = async () => {
      const requestHeaders = new Headers();
      requestHeaders.append('Authorization', 'Bearer ' + jwtToken);

      const response = await fetch('http://localhost:8080/api/group', {
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
        <div className="invite-code">
          <h3>Інвайт-код:</h3>
          <p>{inviteCode}</p>
        </div>
      </div>
    </div>
  );
}

export default Home;




// import React from 'react';
// import RenderSubjectCards from '../../helpers/RenderSubjectCard';
// import './home.css';

// function Home() {
//   return (
//     <div className="main">
//       <div className="subjects container">
//         <RenderSubjectCards />
//       </div>
//     </div>
//   );
// }

// export default Home;
