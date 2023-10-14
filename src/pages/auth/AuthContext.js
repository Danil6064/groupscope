import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

// export const useAuth = () => {
//   return useContext(AuthContext);
// };

export const AuthProvider = ({ children }) => {
  const initialToken = localStorage.getItem('jwtToken');
  const initialUserRole = localStorage.getItem('userRole');
  const [jwtToken, setJwtToken] = useState(initialToken);
  const [userRole, setUserRole] = useState(initialUserRole);

  const login = (token, role = null) => {
    localStorage.setItem('jwtToken', token);
    setJwtToken(token);
  
    if (role) {
      localStorage.setItem('userRole', role);
      setUserRole(role);
    }
  };
  

const logout = () => {
  // Видалення токенів та ролей користувача
  localStorage.removeItem('jwtToken');
  localStorage.removeItem('userRole');
  
  // Видалення додаткових даних
  localStorage.removeItem('userPicture');
  localStorage.removeItem('selectedSubject');
  localStorage.removeItem('learningGroup');
  localStorage.removeItem('inviteCode');
  localStorage.removeItem('reloadCalled');
  
  // Оновлення стану
  setJwtToken(null);
  setUserRole(null);
};


  const updateUserRole = (newRole) => {
    localStorage.setItem('userRole', newRole);
    setUserRole(newRole);
  };

  const contextValue = React.useMemo(() => ({
    isAuthenticated: Boolean(jwtToken),
    userRole: userRole,
    login: login,
    logout: logout,
    updateUserRole: updateUserRole
  }), [jwtToken, userRole]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
