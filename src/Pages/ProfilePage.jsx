import { useAuth } from "../Context/AuthContext";
import { Link } from "react-router-dom";

export default function ProfilePage() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 flex items-center justify-center px-4 py-12">
      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 w-full max-w-md animate-fade-in transition-all duration-500 ease-in-out">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Welcome, {user.firstName}!
        </h1>
        <p className="text-center text-gray-700 mb-6">📧 {user.email}</p>

        <div className="flex flex-col gap-4">
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg shadow-md transition-all duration-300"
          >
            Logout
          </button>

          <Link
            to="/products"
            className="text-center bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg shadow-md transition-all duration-300"
          >
            View Products
          </Link>
        </div>
      </div>
    </div>
  );
}
