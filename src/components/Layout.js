import Header from "./header/Header";
import { Outlet } from "react-router-dom";

export default function Layout() {
  let headerTitle = sessionStorage.getItem("currentHeaderTitle")
  console.log("Header (in Layout):", headerTitle);

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
