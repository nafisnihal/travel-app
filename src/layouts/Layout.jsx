import { ThemeToggle } from "@/components/theme-toggle";
import { Link, Outlet } from "react-router";

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="p-4 border-b flex justify-between items-center">
        <nav className="flex gap-4">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </nav>
        <ThemeToggle />
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="p-4 border-t text-center text-sm">© 2025</footer>
    </div>
  );
}

export default Layout;
