import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../api";

export default function DashboardPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await apiRequest("/me");
        setUser(data.user);
      } catch (fetchError) {
        setError(fetchError.message);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  const onLogout = async () => {
    try {
      await apiRequest("/logout", { method: "POST" });
      navigate("/login");
    } catch (logoutError) {
      setError(logoutError.message);
    }
  };

  if (loading) {
    return <div className="center-card">Loading dashboard...</div>;
  }

  if (error) {
    return (
      <div className="center-card">
        <p className="error">{error}</p>
        <button onClick={() => navigate("/login")}>Back to Login</button>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="card">
        <h1>Dashboard</h1>
        <p>Welcome, {user?.username}</p>
        <p className="badge">Role: {user?.role}</p>
        <button onClick={onLogout}>Logout</button>
      </div>
    </div>
  );
}
