import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const loginHandler = async () => {
    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await API.post("/auth/login", {
        email,
        password,
      });

      const { token, user } = response.data;

      // 🔐 SAFE STORAGE
      localStorage.setItem("token", token);
      localStorage.setItem("role", user?.role || "sales");
      localStorage.setItem("name", user?.name || "");

      toast.success("Login Successful");

      // 🚀 redirect
      navigate("/dashboard");

    } catch (error: any) {
      console.log(error);

      const message =
        error?.response?.data?.message || "Login failed";

      toast.error(message);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-6">
          GigFlow Login
        </h1>

        <div className="grid gap-4">

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-3 rounded-lg"
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-3 rounded-lg"
          />

          <button
            onClick={loginHandler}
            disabled={loading}
            className={`p-3 rounded-lg text-white ${
              loading
                ? "bg-gray-400"
                : "bg-black hover:bg-gray-800"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center">
            Don't have an account?
            <Link to="/register" className="text-blue-600 ml-2">
              Register
            </Link>
          </p>

        </div>

      </div>
    </div>
  );
};

export default Login;