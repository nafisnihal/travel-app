import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { motion as m } from "motion/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, Navigate, useNavigate } from "react-router";
import { z } from "zod";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password must be less than 100 characters"),
});

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const watchedEmail = watch("email");

  if (isAuthenticated) return <Navigate to="/" replace />;

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      toast.success(`Welcome back! 👋`);
      navigate("/", { replace: true });
    } catch (err) {
      toast.error(err.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center py-12 px-4">
      <m.div
        className="max-w-md w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="rounded-2xl shadow-xl border p-8">
          {/* Header */}
          <m.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
              Welcome Back
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400">
              Sign in to continue your journey with Travello
            </p>
          </m.div>

          {/* Form */}
          <m.form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Email Field */}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-zinc-700 dark:text-zinc-300"
              >
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-zinc-400" />
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="Enter your email"
                  className={`pl-10 h-12 transition-colors ${
                    errors.email ? "border-red-500 focus:border-red-500" : ""
                  }`}
                  autoComplete="email"
                  autoFocus
                />
              </div>
              {errors.email && (
                <m.p
                  className="text-red-500 text-sm"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {errors.email.message}
                </m.p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-zinc-700 dark:text-zinc-300"
              >
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-zinc-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  placeholder="Enter your password"
                  className={`pl-10 pr-10 h-12 transition-colors ${
                    errors.password ? "border-red-500 focus:border-red-500" : ""
                  }`}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <m.p
                  className="text-red-500 text-sm"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {errors.password.message}
                </m.p>
              )}
            </div>

            {/* Submit Button */}
            <m.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="submit"
                className="w-full h-12 font-semibold rounded-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Signing in...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    Sign In
                    <ArrowRight className="h-4 w-4" />
                  </div>
                )}
              </Button>
            </m.div>
          </m.form>

          {/* Footer */}
          <m.div
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="text-zinc-600 dark:text-zinc-400">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-zinc-900 dark:text-white hover:underline transition-all duration-200"
              >
                Create one
              </Link>
            </p>
          </m.div>
        </div>
      </m.div>
    </div>
  );
}
