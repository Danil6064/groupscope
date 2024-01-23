import { BrowserRouter, Routes, Route } from "react-router-dom";

import Auth from "./pages/auth/Auth";
import Guest from "./pages/guest/Guest";
import Subjects from "./pages/subjects/Subjects";
import SelectedSubject from "./pages/selectedSubject/SelectedSubject";
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
              <Route path="subjects" element={<Subjects />} />
              <Route
                path="subjects/:subjectName"
                element={<SelectedSubject />}
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

        <Route path="*" element={<>PageNotFound</>} />
      </Routes>
    </BrowserRouter>
  );
}
