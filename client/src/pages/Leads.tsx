import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import API from "../services/api";

interface Lead {
  _id: string;
  name: string;
  email: string;
  company: string;
  status: string;
}

const Leads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");

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
  }, []);

  // ================= ADD LEAD =================
  const addLead = async () => {
    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/leads",
        { name, email, company },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Lead added");

      setName("");
      setEmail("");
      setCompany("");

      fetchLeads();
    } catch (err) {
      toast.error("Failed to add lead");
    }
  };

  // ================= UPDATE STATUS =================
  const updateStatus = async (id: string, status: string) => {
    try {
      const token = localStorage.getItem("token");

      await API.put(
        `/leads/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Status updated");
      fetchLeads();
    } catch (err) {
      toast.error("Failed to update");
    }
  };

  return (
    <div className="p-6">

      {/* ================= ADD LEAD FORM ================= */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow mb-6">

        <h2 className="text-xl font-bold mb-3">Add New Lead</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

          <input
            className="p-2 border rounded dark:bg-gray-700"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="p-2 border rounded dark:bg-gray-700"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="p-2 border rounded dark:bg-gray-700"
            placeholder="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />

        </div>

        <button
          onClick={addLead}
          className="mt-3 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Lead
        </button>

      </div>

      {/* ================= LEADS LIST ================= */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">

        <h2 className="text-xl font-bold mb-3">All Leads</h2>

        {leads.map((lead) => (
          <div
            key={lead._id}
            className="p-3 border-b dark:border-gray-700 flex justify-between"
          >

            <div>
              <p className="font-semibold">{lead.name}</p>
              <p className="text-sm text-gray-500">
                {lead.email} • {lead.company}
              </p>
            </div>

            <div className="flex gap-2 items-center">

              <select
                value={lead.status}
                onChange={(e) =>
                  updateStatus(lead._id, e.target.value)
                }
                className="p-1 border rounded dark:bg-gray-700"
              >
                <option value="new">New</option>
                <option value="qualified">Qualified</option>
                <option value="closed">Closed</option>
              </select>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default Leads;