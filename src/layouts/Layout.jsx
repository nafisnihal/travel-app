import { Outlet } from "react-router";
import Footer from "./Footer";
import Header from "./Header";

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main
        className="flex-grow max-w-7xl mx-auto
        w-full p-4"
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
