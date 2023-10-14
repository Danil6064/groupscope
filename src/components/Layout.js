import Header from "./header/Header";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <header className="header">
        <Header />
      </header>

      <main>
        <Outlet />
      </main>
      
      <footer></footer>
    </>
  );
}
