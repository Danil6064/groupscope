import Header from "./header/Header";
import { Outlet } from "react-router-dom";
import Footer from "./footer/Footer";

export default function Layout() {
  return (
    <>
      <header className="header">
        <Header />
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  );
}
