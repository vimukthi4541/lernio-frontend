import React, { useState, useEffect } from 'react';
import { Mail, Lock, LogIn, Sun, Moon, Eye, EyeOff, UserPlus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../api/axios';

const Login = () => {
    const navigate = useNavigate();
    const [darkMode, setDarkMode] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/dashboard/student');
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await api.post('/api/auth/login', formData);
            
            if (response.data.success) {
                // Backend එකෙන් එන Token එක සහ Role එක localStorage වල Save කිරීම
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('role', response.data.data.role);

                toast.success("Login successful!");

                // Role එක fetch කරගෙන simple letters වලට හරවා Redirect පරීක්ෂා කිරීම
                const userRole = response.data.data.role ? response.data.data.role.toLowerCase() : 'student';
                
                setTimeout(() => {
                    if (userRole === 'student') {
                        navigate('/dashboard/student');
                    } else if (userRole === 'teacher') {
                        navigate('/dashboard/teacher');
                    } else {
                        navigate('/'); 
                    }
                }, 1500);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        if (!darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex items-center justify-center p-6 transition-colors duration-300">
            {/* Dark Mode Toggle Button */}
            <div className="absolute top-10 right-10">
                <button 
                    onClick={toggleDarkMode}
                    className="p-3 rounded-full bg-white dark:bg-slate-800 shadow-lg text-blue-600 dark:text-yellow-400 transition-all hover:scale-110"
                >
                    {darkMode ? <Sun size={24} /> : <Moon size={24} />}
                </button>
            </div>

            <div className="bg-white dark:bg-slate-800 p-12 rounded-3xl shadow-2xl w-full max-w-lg border border-gray-100 dark:border-slate-700 my-10">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-extrabold text-blue-950 dark:text-white">Lernio.lk</h1>
                    <p className="text-xl text-gray-500 dark:text-slate-400 mt-3 font-medium">Welcome back!</p>
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-6">Login to Your Account</h2>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <InputWrapper 
                        icon={Mail} 
                        placeholder="Email Address" 
                        type="email" 
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                    />
                    
                    <div className="relative">
                        <InputWrapper 
                            icon={Lock} 
                            placeholder="Password" 
                            type={showPassword ? "text" : "password"} 
                            name="password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <button 
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors"
                        >
                            {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                        </button>
                    </div>

                    <button 
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-3 bg-blue-600 text-white p-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition shadow-lg shadow-blue-200 dark:shadow-none disabled:opacity-50"
                    >
                        <LogIn size={22} /> {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <div className="mt-10 pt-6 border-t border-gray-100 dark:border-slate-700 text-center">
                    <p className="text-gray-500 dark:text-slate-400 font-medium">
                        Don't have an account yet?
                        <Link to="/register" className="ml-2 text-blue-600 dark:text-blue-400 font-bold hover:underline inline-flex items-center gap-1.5">
                            <UserPlus size={18} /> Register Now
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

const InputWrapper = ({ icon: Icon, ...props }) => (
    <div className="relative group">
        <Icon className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
        <input 
            {...props} 
            className="w-full pl-14 pr-14 py-4 bg-gray-50 dark:bg-slate-700 border border-gray-100 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition text-slate-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-slate-500" 
        />
    </div>
);

export default Login;