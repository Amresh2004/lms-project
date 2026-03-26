import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {
  const user = JSON.parse(localStorage.getItem("user"));

  // ❌ Not logged in
  if (!user) {
    return <Navigate to="/login" />;
  }

  // ❌ Wrong role trying to access
  if (role && user.role !== role) {
    return <Navigate to="/login" />;
  }

  // ✅ Allowed
  return children;
}

export default ProtectedRoute;