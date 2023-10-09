import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./pages/auth/AuthContext";
import { StudentProvider } from "../src/helpers/StudentContext";
import PrivateRoute from "./pages/auth/PrivateRoute";
import { GoogleOAuthProvider } from "@react-oauth/google";

import Auth from "./pages/auth/Auth";
import Guest from "./pages/guest/Guest";
import Home from "./pages/home/Home";
import TaskPage from "./pages/tasksPage/TaskPage";
import SuccessfulStudent from "./pages/successfulStudent/SuccessfulStudent";
import SuccessfulGroup from "./pages/successfulGroup/SuccessfulGroup";

import Layout from "./components/Layout";

export default function App() {
  return (
    <BrowserRouter>
      <GoogleOAuthProvider clientId="170308750708-atmmob9kjjesg9s4286k76at7ha8mgpt.apps.googleusercontent.com">
        <AuthProvider>
          {/* <StudentProvider> */}
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Auth />} />
                <Route path="guest" element={<Guest />} />
                <Route
                  path="home"
                  element={
                    <PrivateRoute roles={["HEADMAN", "STUDENT"]}>
                      <Home />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="subject/:subjectName"
                  element={
                    <PrivateRoute roles={["HEADMAN", "STUDENT"]}>
                      <TaskPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="successfulStudent/:subjectName?"
                  element={
                    <PrivateRoute roles={["HEADMAN", "STUDENT"]}>
                      <SuccessfulStudent />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="successfulGroup/:subjectName?"
                  element={
                    <PrivateRoute roles={["HEADMAN"]}>
                      <SuccessfulGroup />
                    </PrivateRoute>
                  }
                />
              </Route>
            </Routes>
          {/* </StudentProvider> */}
        </AuthProvider>
      </GoogleOAuthProvider>
    </BrowserRouter>
  );
}
