import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="h-screen w-64 fixed left-0 top-0 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 p-5">

      <h1 className="text-2xl font-bold mb-8">
        CRM Panel
      </h1>

      <nav className="flex flex-col gap-4">

        <Link
          to="/dashboard"
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          Dashboard
        </Link>

        <Link
          to="/leads"
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          Leads
        </Link>

        <Link
          to="/analytics"
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          Analytics
        </Link>

        <Link
          to="/settings"
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          Settings
        </Link>

      </nav>

    </div>
  );
};

export default Sidebar;