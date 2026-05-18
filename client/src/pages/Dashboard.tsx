import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import API from "../services/api";
import Notifications from "../components/Notifications";

interface Lead {
  _id: string;
  name: string;
  email: string;
  company: string;
  status: string;
}

const Dashboard = () => {
  const navigate = useNavigate();

  const [leads, setLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // ================= FETCH LEADS =================
  const fetchLeads = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/leads", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setLeads(res.data.leads);
    } catch (err) {
      toast.error("Failed to fetch leads");
    }
  };

  useEffect(() => {
    fetchLeads();

    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme === "true") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // ================= DARK MODE =================
  const toggleDarkMode = () => {
    const newMode = !darkMode;

    setDarkMode(newMode);

    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  };

  // ================= LOGOUT =================
  const logoutHandler = () => {
    localStorage.removeItem("token");
    toast.success("Logged out");
    navigate("/");
  };

  // ================= STATS =================
  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => l.status === "new").length;
  const qualified = leads.filter((l) => l.status === "qualified").length;
  const closed = leads.filter((l) => l.status === "closed").length;

  // ================= FILTER =================
  const filteredLeads = leads.filter(
    (lead) =>
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-950 text-black dark:text-white">

      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">
          CRM Dashboard
        </h1>

        <div className="flex items-center gap-4">

          {/* 🔔 NOTIFICATIONS */}
          <Notifications />

          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search leads..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-2 rounded border dark:bg-gray-800"
          />

          {/* DARK MODE */}
          <button
            onClick={toggleDarkMode}
            className="bg-gray-700 text-white px-4 py-2 rounded"
          >
            {darkMode ? "Light" : "Dark"}
          </button>

          {/* LOGOUT */}
          <button
            onClick={logoutHandler}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>

        </div>
      </div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">

        <div className="p-5 bg-white dark:bg-gray-800 rounded-xl shadow">
          <h2>Total Leads</h2>
          <p className="text-2xl font-bold">{totalLeads}</p>
        </div>

        <div className="p-5 bg-white dark:bg-gray-800 rounded-xl shadow">
          <h2>New</h2>
          <p className="text-2xl font-bold">{newLeads}</p>
        </div>

        <div className="p-5 bg-white dark:bg-gray-800 rounded-xl shadow">
          <h2>Qualified</h2>
          <p className="text-2xl font-bold">{qualified}</p>
        </div>

        <div className="p-5 bg-white dark:bg-gray-800 rounded-xl shadow">
          <h2>Closed</h2>
          <p className="text-2xl font-bold">{closed}</p>
        </div>

      </div>

      {/* ================= LEADS LIST ================= */}
      <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow">

        <h2 className="text-xl font-bold mb-4">
          Recent Leads
        </h2>

        {filteredLeads.length === 0 ? (
          <p className="text-gray-500">No leads found</p>
        ) : (
          filteredLeads.map((lead) => (
            <div
              key={lead._id}
              className="p-3 border-b dark:border-gray-700"
            >
              <p className="font-semibold">{lead.name}</p>
              <p className="text-sm text-gray-500">
                {lead.company} • {lead.status}
              </p>
            </div>
          ))
        )}

      </div>

    </div>
  );
};

export default Dashboard;