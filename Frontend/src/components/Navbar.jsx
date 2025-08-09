// src/components/Navbar.jsx
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  return (
    <nav className="bg-green-100 text-green-900 shadow-md px-6 py-4 flex justify-between items-center">
      <Link to="/dashboard" className="text-2xl font-bold text-green-700 hover:text-green-900">
        GreenMantra
      </Link>
      <div className="space-x-6 text-lg">
        <Link to="/dashboard" className={location.pathname === "/dashboard" ? "text-green-700 font-semibold" : "hover:text-green-600"}>Dashboard</Link>
        <Link to="/" className={location.pathname === "/" ? "text-green-700 font-semibold" : "hover:text-green-600"}>Survey</Link>
        <Link to="/results" className={location.pathname === "/results" ? "text-green-700 font-semibold" : "hover:text-green-600"}>Results</Link>
        <Link to="/challenges" className={location.pathname === "/challenges" ? "text-green-700 font-semibold" : "hover:text-green-600"}>Challenges</Link>
        <Link to="/quizzes" className={location.pathname === "/quizzes" ? "text-green-700 font-semibold" : "hover:text-green-600"}>Quizzes</Link>
      </div>
    </nav>
  );
}

export default Navbar;
