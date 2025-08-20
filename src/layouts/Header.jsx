import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Heart, UserRound } from "lucide-react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully 👋");
    navigate("/", { replace: true });
  };

  return (
    <header className="pt-3 pb-1 px-4 flex justify-between items-center max-w-7xl mx-auto w-full">
      <Link to="/" className="text-2xl font-bold -mt-2">
        <h1>Travello</h1>
      </Link>
      <nav className="flex gap-4 items-center text-xs font-semibold">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <div className="flex items-center gap-3">
        <Link
          to="/favorites"
          className="flex items-center gap-1 hover:text-red-500 transition-colors"
        >
          <Heart className="h-4 w-4" />
        </Link>
        <ThemeToggle />
        {isAuthenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer select-none">
                <AvatarFallback>
                  {user?.email?.[0]?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer text-red-600"
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex">
            <Button
              variant="outline"
              className="pl-2 pr-3 rounded-3xl hidden sm:flex"
            >
              <Link
                to="/login"
                className="flex items-center justify-center gap-2 text-xs"
              >
                <Avatar className="flex items-center justify-center border rounded-full w-6 h-6">
                  <UserRound className="w-2 h-2" />
                </Avatar>
                Sign In
              </Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
