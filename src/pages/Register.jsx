import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { motion as m } from "motion/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, Navigate, useNavigate } from "react-router";
import { z } from "zod";

const registerSchema = z.object({
  username: z
    .string()
    .min(2, "Username must be at least 2 characters")
    .max(30, "Username must be less than 30 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    ),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password must be less than 100 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
});

export default function Register() {
  const { register: registerUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const watchedPassword = watch("password");

  if (isAuthenticated) return <Navigate to="/" replace />;

  const onSubmit = async (data) => {
    try {
      await registerUser(data.email, data.password, data.username);
      toast.success("Account created successfully! Welcome to Travello 🎉");
      navigate("/", { replace: true });
    } catch (err) {
      toast.error(err.message || "Registration failed. Please try again.");
    }
  };

  // Password strength indicator
  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: "" };

    let strength = 0;
    if (password.length >= 6) strength += 1;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/\d/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    const labels = [
      "",
      "Very Weak",
      "Weak",
      "Fair",
      "Good",
      "Strong",
      "Very Strong",
    ];
    const colors = [
      "",
      "bg-red-500",
      "bg-red-400",
      "bg-yellow-500",
      "bg-yellow-400",
      "bg-green-400",
      "bg-green-500",
    ];

    return {
      strength: Math.min(strength, 6),
      label: labels[Math.min(strength, 6)],
      color: colors[Math.min(strength, 6)],
    };
  };

  const passwordStrength = getPasswordStrength(watchedPassword);

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
              Create Account
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400">
              Join Travello and start your adventure
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
            {/* Username Field */}
            <div className="space-y-2">
              <Label
                htmlFor="username"
                className="text-zinc-700 dark:text-zinc-300"
              >
                Username
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-zinc-400" />
                <Input
                  id="username"
                  type="text"
                  {...register("username")}
                  placeholder="Choose a username"
                  className={`pl-10 h-12 transition-colors ${
                    errors.username ? "border-red-500 focus:border-red-500" : ""
                  }`}
                  autoComplete="username"
                  autoFocus
                />
              </div>
              {errors.username && (
                <m.p
                  className="text-red-500 text-sm"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {errors.username.message}
                </m.p>
              )}
            </div>

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
                  placeholder="Create a strong password"
                  className={`pl-10 pr-10 h-12 transition-colors ${
                    errors.password ? "border-red-500 focus:border-red-500" : ""
                  }`}
                  autoComplete="new-password"
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

              {/* Password Strength Indicator */}
              {watchedPassword && (
                <m.div
                  className="space-y-2"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex gap-1">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                          i < passwordStrength.strength
                            ? passwordStrength.color
                            : "bg-zinc-200 dark:bg-zinc-600"
                        }`}
                      />
                    ))}
                  </div>
                  {passwordStrength.label && (
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Password strength: {passwordStrength.label}
                    </p>
                  )}
                </m.div>
              )}

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
                className="w-full h-12 font-semibold rounded-xl transition-all duration-200"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Creating account...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    Create Account
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
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-zinc-900 dark:text-white hover:underline transition-all duration-200"
              >
                Sign in
              </Link>
            </p>
          </m.div>
        </div>
      </m.div>
    </div>
  );
}
