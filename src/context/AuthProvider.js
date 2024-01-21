import { createContext, useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  return (
    <GoogleOAuthProvider clientId="170308750708-atmmob9kjjesg9s4286k76at7ha8mgpt.apps.googleusercontent.com">
      <AuthContext.Provider value={{ auth, setAuth }}>
        {children}
      </AuthContext.Provider>
    </GoogleOAuthProvider>
  );
};

export default AuthContext;
