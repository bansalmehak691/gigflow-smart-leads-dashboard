import { useEffect, useState } from "react";
import API from "../services/api";

interface Notification {
  _id: string;
  message: string;
  type: string;
}

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [open, setOpen] = useState(false);

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/notifications", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setNotifications(res.data.notifications);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="relative">

      {/* BELL BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="relative px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded"
      >
        🔔

        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
            {notifications.length}
          </span>
        )}
      </button>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 shadow-lg rounded p-3 z-50">

          <h2 className="font-bold mb-2">Notifications</h2>

          {notifications.length === 0 ? (
            <p className="text-sm text-gray-500">No notifications</p>
          ) : (
            notifications.map((n) => (
              <div
                key={n._id}
                className="p-2 border-b dark:border-gray-700 text-sm"
              >
                {n.message}
              </div>
            ))
          )}

        </div>
      )}

    </div>
  );
};

export default Notifications;