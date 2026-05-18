import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import MainLayout from "./layouts/MainLayout";

import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>

      <Routes>

        {/* ================= AUTH ROUTES ================= */}
        <Route
          path="/"
          element={!token ? <Login /> : <Navigate to="/dashboard" />}
        />

        <Route
          path="/register"
          element={!token ? <Register /> : <Navigate to="/dashboard" />}
        />

        {/* ================= PROTECTED APP ================= */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >

          {/* DEFAULT LANDING AFTER LOGIN */}
          <Route
            path="dashboard"
            element={<Dashboard />}
          />

          <Route
            path="leads"
            element={<Leads />}
          />

          <Route
            path="analytics"
            element={<Analytics />}
          />

          <Route
            path="settings"
            element={<Settings />}
          />

        </Route>

        {/* ================= FALLBACK ================= */}
        <Route
          path="*"
          element={<Navigate to="/" />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;