import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const AuthComponent = ({ onLogin, onSignup }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const togglePassword = () => setShowPassword((prev) => !prev);
  const toggleConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      onLogin?.(formData.email, formData.password);
    } else {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match");
        return;
      }
      onSignup?.(formData.username, formData.email, formData.password);
    }
  };

  const handleFormSwitch = () => {
    setIsLogin(!isLogin);
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md p-8 rounded-2xl border border-gray-200 space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-[#4CAF50]">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        {!isLogin && (
          <div>
            <label className="block text-sm font-medium text-[#424242] mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4CAF50] outline-none transition"
              required
              autoComplete="username"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-[#424242] mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4CAF50] outline-none transition"
            required
            autoComplete="email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#424242] mb-1">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="••••••••"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4CAF50] outline-none pr-10"
              required
              autoComplete={isLogin ? "current-password" : "new-password"}
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#424242] hover:text-[#F44336]"
              aria-label="Toggle password visibility"
              tabIndex={-1}
            >
              {showPassword ? <Eye size={20}/> : <EyeOff size={20} />}
            </button>
          </div>
        </div>

        {!isLogin && (
          <div>
            <label className="block text-sm font-medium text-[#424242] mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="••••••••"
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4CAF50] outline-none pr-10"
                required
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={toggleConfirmPassword}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#424242] hover:text-[#F44336]"
                aria-label="Toggle confirm password visibility"
                tabIndex={-1}
              >
                {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-[#4CAF50] hover:bg-[#388E3C] text-white font-medium py-2.5 rounded-lg transition"
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>

        <p className="text-center text-sm text-[#424242]">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={handleFormSwitch}
            className="text-[#F44336] hover:underline font-semibold"
          >
            {isLogin ? "Sign up" : "Login"}
          </button>
        </p>
      </form>
    </div>
  );
};

export default AuthComponent;
