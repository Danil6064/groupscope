import React, { useState } from 'react';
import './guest.css';
import { useNavigate } from 'react-router-dom';
import {apiUrl} from '../../helpers/MainConstants'

function Guest() {
  const [action, setAction] = useState(null);
  const [groupName, setGroupName] = useState('');
  const [inviteCode, setInviteCode] = useState('');

  const jwtToken = localStorage.getItem('jwtToken');

  const navigate = useNavigate();

  const handleCreateGroup = async () => {
    const requestBody = {
      name: groupName
    };

    const response = await fetch(`${apiUrl}/group/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + jwtToken
      },
      body: JSON.stringify(requestBody)
    });

    if (response.ok) {
      navigate('/auth');
    } else {
      // Handle the error
    }
  };

  const handleJoinGroup = async () => {
    const requestBody = {
      inviteCode: inviteCode
    };

    const response = await fetch(`${apiUrl}/group/join`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + jwtToken
      },
      body: JSON.stringify(requestBody)
    });

    if (response.ok) {
      navigate('/auth');
    } else {
      // Handle the error
    }
  };

  return (
    <div className="main">
      <div className="create-group-form">
        <label>Виберіть групу:</label>
        <select onChange={e => setGroupName(e.target.value)}>
          <option value="КБІКС-21-1">КБІКС-21-1</option>
          <option value="КБІКС-21-2">КБІКС-21-2</option>
          <option value="КБІКС-21-3">КБІКС-21-3</option>
          <option value="КБІКС-21-4">КБІКС-21-4</option>
          <option value="КБІКС-21-5">КБІКС-21-5</option>
          <option value="КБІКС-21-6">КБІКС-21-6</option>
          {/* You can add other group options here */}
        </select>
        <button onClick={handleCreateGroup}>Створити</button>
      </div>
      <div className="join-group-form">
        <label>Введіть код групи:</label>
        <input 
          type="text"
          value={inviteCode}
          onChange={e => setInviteCode(e.target.value)}
        />
        <button onClick={handleJoinGroup}>Приєднатись</button>
      </div>
    </div>
  );
}

export default Guest;







// import React, { useState } from 'react';
// import './guest.css'

// function Guest() {
//   const [action, setAction] = useState(null);
//   const [groupName, setGroupName] = useState('');
//   const [inviteCode, setInviteCode] = useState('');

//   const jwtToken = localStorage.getItem('jwtToken');

//   const handleCreateGroup = () => {
//     const requestBody = {
//       name: groupName
//     };

//     fetch('http://localhost:8080/api/group/create', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': 'Bearer ' + jwtToken
//       },
//       body: JSON.stringify(requestBody)
//     })
//       .then(response => {
//         if (response.headers.get('content-length') === '0' || !response.ok) {
//           throw new Error('Empty response or response not OK');
//         }
//         return response.json();
//       })
//       .then(data => {
//         console.log('Group created:', data);
//         // Handle the response or show a success message
//       })
//       .catch(error => {
//         console.error('Error:', error);
//         // Handle the error or show a message to the user
//       });
//   };

//   const handleJoinGroup = () => {
//     const requestBody = {
//       inviteCode: inviteCode
//     };

//     fetch('http://localhost:8080/api/group/join', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': 'Bearer ' + jwtToken
//       },
//       body: JSON.stringify(requestBody)
//     })
//       .then(response => {
//         if (response.headers.get('content-length') === '0' || !response.ok) {
//           throw new Error('Empty response or response not OK');
//         }
//         return response.json();
//       })
//       .then(data => {
//         console.log('Joined group:', data);
//         // Handle the response or show a success message
//       })
//       .catch(error => {
//         console.error('Error:', error);
//         // Handle the error or show a message to the user
//       });
//   };

//   return (
//     <div classNameName="main">
//       <h2>Кімната очікування</h2>
//       <button onClick={() => setAction('create')}>Створити групу</button>
//       <button onClick={() => setAction('join')}>Приєднатись до групи</button>

//       {action === 'create' && (
//         <div>
//           <label>Виберіть групу:</label>
//           <select onChange={e => setGroupName(e.target.value)}>
//             <option value="КБІКС-21-1">КБІКС-21-1</option>
//             <option value="КБІКС-21-2">КБІКС-21-2</option>
//             {/* You can add other group options here */}
//           </select>
//           <button onClick={handleCreateGroup}>Створити</button>
//         </div>
//       )}

//       {action === 'join' && (
//         <div>
//           <label>Введіть код групи:</label>
//           <input 
//             type="text"
//             value={inviteCode}
//             onChange={e => setInviteCode(e.target.value)}
//           />
//           <button onClick={handleJoinGroup}>Приєднатись</button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Guest;
