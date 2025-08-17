import axios from "axios";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

const AUTH_KEY = "travel-app-auth";

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(() => {
    const stored = localStorage.getItem(AUTH_KEY);
    return stored ? JSON.parse(stored) : { user: null, token: null };
  });

  useEffect(() => {
    localStorage.setItem(AUTH_KEY, JSON.stringify(auth));
  }, [auth]);

  const login = useCallback(async (email, password) => {
    try {
      const res = await axios.post(
        "https://reqres.in/api/login",
        { email, password },
        { headers: { "x-api-key": "reqres-free-v1" } }
      );
      setAuth({ user: { email }, token: res.data.token });
      return { email, token: res.data.token };
    } catch (err) {
      const msg = err.response?.data?.error || "Login failed";
      throw new Error(msg);
    }
  }, []);

  const register = useCallback(async (email, password, username) => {
    try {
      const res = await axios.post(
        "https://reqres.in/api/register",
        { email, password },
        { headers: { "x-api-key": "reqres-free-v1" } }
      );
      setAuth({ user: { email, username }, token: res.data.token });
      return { email, username, token: res.data.token };
    } catch (err) {
      const msg = err.response?.data?.error || "Registration failed";
      throw new Error(msg);
    }
  }, []);

  const logout = useCallback(() => {
    setAuth({ user: null, token: null });
    localStorage.removeItem(AUTH_KEY);
    navigate("/", { replace: true });
  }, [navigate]);

  const value = {
    user: auth.user,
    token: auth.token,
    login,
    register,
    logout,
    isAuthenticated: !!auth.token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
