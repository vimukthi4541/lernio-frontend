import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios"; 
import { LayoutDashboard, BookOpen, Video, ClipboardList, LogOut, Bell, User } from "lucide-react";

const StudentDashboard = () => {
  const [studentData, setStudentData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await api.get("/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` }
        });

        const userRole = response.data.data.role || "student";
        
        if (userRole !== "student") {
          navigate("/login");
          return;
        }

        setStudentData(response.data.data);
      } catch (error) {
        console.error("Profile fetch error:", error);
        localStorage.removeItem("token");
        navigate("/login");
      }
    };
    fetchProfile();
  }, [navigate]);

  if (!studentData) {
    return <div className="h-screen flex items-center justify-center bg-white dark:bg-slate-900 dark:text-white">Loading Portal...</div>;
  }

  const initials = `${studentData.firstName[0]}${studentData.lastName[0]}`;

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-slate-900 overflow-hidden">
      <aside className="w-64 bg-blue-950 dark:bg-slate-950 flex flex-col border-r border-blue-900 dark:border-slate-800">
        <div className="p-6">
          <h2 className="text-white text-2xl font-bold tracking-tight">Lernio.lk</h2>
          <p className="text-blue-400 text-xs">Student Dashboard</p>
        </div>

        <div className="px-4 py-4 border-y border-blue-900 dark:border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
            {initials}
          </div>
          <div>
            <p className="text-white text-sm font-medium">{studentData.firstName} {studentData.lastName}</p>
            <p className="text-blue-400 text-xs">{studentData.district}</p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-blue-600 text-white rounded-xl text-sm font-medium">
            <LayoutDashboard size={18} /> Dashboard
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-blue-200 hover:bg-white/10 rounded-xl text-sm transition-all">
            <BookOpen size={18} /> My Courses
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-blue-200 hover:bg-white/10 rounded-xl text-sm transition-all">
            <Video size={18} /> Live Classes
          </button>
        </nav>

        <div className="p-4 border-t border-blue-900 dark:border-slate-800">
          <button 
            onClick={() => { localStorage.removeItem("token"); navigate("/login"); }}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl text-sm transition-all"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 flex items-center justify-between px-8">
          <h1 className="text-lg font-semibold text-gray-800 dark:text-white">Welcome, {studentData.firstName}!</h1>
          <div className="flex items-center gap-4">
             <Bell size={20} className="text-gray-500" />
             <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">{initials}</div>
          </div>
        </header>

        <div className="p-8 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">Enrolled Courses</p>
              <p className="text-3xl font-bold text-blue-600 mt-1">04</p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">Attendance</p>
              <p className="text-3xl font-bold text-green-600 mt-1">92%</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;