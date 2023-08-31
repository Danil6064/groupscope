import React, { useEffect, useState } from 'react';
import { useStudentContext } from '../../helpers/StudentContext';

function Quest() {
  const { studentData, setStudentData } = useStudentContext();
  const [jwtToken, setJwtToken] = useState('');

  // Define the fetchStudentDataFromServer function
  const fetchStudentDataFromServer = () => {
    // Replace this with your actual API call to fetch the student's data
    return fetch('http://localhost:8080/student', {
      headers: {
        Authorization: `Bearer ${jwtToken}` // Attach JWT token to the request
      }
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error fetching student data:', error);
        throw error;
      });
  };

  useEffect(() => {
    // Load the JWT token from localStorage
    const token = localStorage.getItem('jwtToken');
    if (token) {
      setJwtToken(token);
    }
  }, []); // This effect runs only once to initialize the jwtToken

  useEffect(() => {
    // Fetch student's data from the server and set it in the context
    fetchStudentDataFromServer()
      .then((data) => setStudentData(data))
      .catch((error) => console.error('Error fetching student data:', error));
  }, [jwtToken]); // Include jwtToken as a dependency of the effect

  return (
    <div className="main">
      <h2>Кімната очікування</h2>
      {studentData && (
        <div>
          <p>Welcome, {studentData.login}!</p>
          <p>А ось тут ми вставляємо токен: {jwtToken}</p>
        </div>
      )}
    </div>
  );
}

export default Quest;
