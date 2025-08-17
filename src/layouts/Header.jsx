import { ThemeToggle } from "@/components/theme-toggle";
import { Link } from "react-router";

const Header = () => {
  return (
    <header className="p-4 border-b flex justify-between items-center">
      <nav className="flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <ThemeToggle />
    </header>
  );
};

export default Header;
