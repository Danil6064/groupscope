import { createContext, useContext, useState } from 'react';

const StudentContext = createContext();

export function useStudentContext() {
  return useContext(StudentContext);
}

export function StudentProvider({ children }) {
  const [studentData, setStudentData] = useState(null);

  return (
    <StudentContext.Provider value={{ studentData, setStudentData }}>
      {children}
    </StudentContext.Provider>
  );
}
