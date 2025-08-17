import { Button } from "@/components/ui/button";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, Navigate, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) return <Navigate to="/" replace />;

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    if (!form.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/))
      return "Invalid email.";
    if (form.password.length < 6)
      return "Password must be at least 6 characters.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validate();
    if (error) return toast.error(error);
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success(`Welcome back, ${form.email}`);
      navigate("/", { replace: true });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-8 border rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
            autoFocus
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
            minLength={6}
          />
        </div>
        <Button
          type="submit"
          className="w-full py-2 rounded font-semibold"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>
      <div className="mt-4 text-center">
        <Link to="/register" className="text-blue-600 hover:underline">
          Don't have an account? Register
        </Link>
      </div>
    </div>
  );
}
