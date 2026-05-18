import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";

const Register = () => {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerHandler = async () => {

    try {

      await API.post(
        "/auth/register",
        {
          name,
          email,
          password,
        }
      );

      toast.success("Registration Successful");

      navigate("/");

    } catch (error) {

      console.log(error);

      toast.error("Registration Failed");

    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-6">
          GigFlow Register
        </h1>

        <div className="grid gap-4">

          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-3 rounded-lg"
          />

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
            onClick={registerHandler}
            className="bg-black text-white p-3 rounded-lg"
          >
            Register
          </button>

          <p className="text-center">

            Already have an account?

            <Link
              to="/"
              className="text-blue-600 ml-2"
            >
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
};

export default Register;