import React, { useState, useEffect } from 'react';
import { Mail, Lock, LogIn, UserPlus, Sun, Moon, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const InputWrapper = ({ icon: Icon, ...props }) => (
    <div className="relative group">
        <Icon className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={24} />
        <input 
            {...props} 
            className="w-full pl-14 pr-14 py-4 border border-gray-100 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition bg-gray-50 dark:bg-slate-700 dark:text-white text-lg shadow-inner"
        />
    </div>
);

const Login = () => {
    const navigate = useNavigate();
    
    // --- 1. States for Input Fields ---
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
    });
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(prev => !prev);
    };

    // --- 2. Handle Login Function ---
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { 
                email, 
                password 
            });
            
            alert(response.data.message);
            console.log("Logged In:", response.data.user);
            
            
        } catch (err) {
            alert(err.response?.data?.message || "Login Failed!");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex items-center justify-center p-6 transition-colors duration-300">
            <div className="absolute top-10 right-10">
                <button onClick={toggleDarkMode} className="p-3 rounded-full bg-white dark:bg-slate-800 shadow-lg text-blue-600 dark:text-yellow-400 transition-all hover:scale-110">
                    {darkMode ? <Sun size={24} /> : <Moon size={24} />}
                </button>
            </div>

            <div className="bg-white dark:bg-slate-800 p-12 rounded-3xl shadow-2xl w-full max-w-lg transition-colors duration-300">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-extrabold text-blue-950 dark:text-white">Lernio.lk</h1>
                    <p className="text-xl text-gray-500 dark:text-slate-400 mt-3 font-medium">Welcome back!</p>
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-slate-200 mt-6">Login to Your Account</h2>
                </div>

                {/* --- 3. Wrap inputs in a Form --- */}
                <form onSubmit={handleLogin} className="space-y-6">
                    <InputWrapper 
                        icon={Mail} 
                        placeholder="Email Address" 
                        type="email" 
                        required 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    
                    <div className="relative">
                        <InputWrapper 
                            icon={Lock} 
                            placeholder="Password" 
                            type={showPassword ? "text" : "password"} 
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors">
                            {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                        </button>
                    </div>

                    <button type="submit" className="w-full flex items-center justify-center gap-3 bg-blue-600 text-white p-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition shadow-lg active:scale-95">
                        <LogIn size={22} /> Login
                    </button>
                </form>

                <div className="mt-10 pt-6 border-t border-gray-100 dark:border-slate-700 text-center">
                    <p className="text-gray-600 dark:text-slate-400 font-medium">
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

export default Login;