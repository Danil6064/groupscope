import { BrowserRouter, Routes, Route } from "react-router-dom";

import Auth from "./pages/auth/Auth";
import Guest from "./pages/guest/Guest";
import Home from "./pages/home/Home";
import TaskPage from "./pages/tasksPage/TaskPage";
import SuccessfulStudent from "./pages/successfulStudent/SuccessfulStudent";
import SuccessfulGroup from "./pages/successfulGroup/SuccessfulGroup";

import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>

        <Route element={<PersistLogin />}>
          <Route index element={<Auth />} />
          <Route path="guest" element={<Guest />} />

          
            <Route
              element={<RequireAuth allowedRoles={["HEADMAN", "STUDENT"]} />}
            >
              <Route path="home" element={<Home />} />
              <Route path="subject/:subjectName" element={<TaskPage />} />
              <Route
                path="successfulStudent/:subjectName?"
                element={<SuccessfulStudent />}
              />
            </Route>

            <Route element={<RequireAuth allowedRoles={["HEADMAN"]} />}>
              <Route
                path="successfulGroup/:subjectName?"
                element={<SuccessfulGroup />}
              />
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<></>} />
      </Routes>
    </BrowserRouter>
  );
}
