import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    setRole(localStorage.getItem("role"));
  }, []);

  const logout = () => {
    localStorage.clear(); // clears token + role + name
    navigate("/");
  };

  const isActive = (path: string) =>
    location.pathname === path
      ? "bg-gray-700 text-white"
      : "text-gray-300 hover:bg-gray-800";

  return (
    <div className="flex min-h-screen">

      {/* ================= SIDEBAR ================= */}
      <div className="w-64 bg-gray-900 text-white p-5 flex flex-col">

        <h2 className="text-xl font-bold mb-8">
          CRM Dashboard
        </h2>

        <button
          onClick={() => navigate("/dashboard")}
          className={`block mb-3 px-3 py-2 rounded ${isActive("/dashboard")}`}
        >
          Dashboard
        </button>

        <button
          onClick={() => navigate("/leads")}
          className={`block mb-3 px-3 py-2 rounded ${isActive("/leads")}`}
        >
          Leads
        </button>

        <button
          onClick={() => navigate("/analytics")}
          className={`block mb-3 px-3 py-2 rounded ${isActive("/analytics")}`}
        >
          Analytics
        </button>

        <button
          onClick={() => navigate("/settings")}
          className={`block mb-3 px-3 py-2 rounded ${isActive("/settings")}`}
        >
          Settings
        </button>

        {/* ================= ADMIN ONLY SECTION ================= */}
        {role === "admin" && (
          <div className="mt-6 border-t border-gray-700 pt-4">

            <p className="text-xs text-gray-400 mb-2">
              ADMIN PANEL
            </p>

            <button
              className="block mb-3 px-3 py-2 rounded text-yellow-400 hover:bg-gray-800"
            >
              Users (Coming Soon)
            </button>

          </div>
        )}

        {/* ================= LOGOUT ================= */}
        <button
          onClick={logout}
          className="mt-auto text-red-400 hover:text-red-300"
        >
          Logout
        </button>

      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex-1 bg-gray-100 dark:bg-gray-950 p-6">

        <Outlet />

      </div>

    </div>
  );
};

export default MainLayout;