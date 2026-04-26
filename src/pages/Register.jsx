import React, { useState, useEffect } from 'react';
import { Mail, Lock, LogIn, UserPlus, Sun, Moon, Eye, EyeOff, ArrowRight, User, Phone, MapPin, School, ArrowLeft, ShieldCheck, Calendar, Upload, MessageCircle, ChevronDown } from 'lucide-react';
// 1. React Router ලින්ක් එක මෙතනට එකතු කළා
import { Link } from 'react-router-dom';

const Register = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [step, setStep] = useState(1); 

    const provinces = ["Central", "Eastern", "North Central", "Northern", "North Western", "Sabaragamuwa", "Southern", "Uva", "Western"];
    const districtsByProvince = {
        "Western": ["Colombo", "Gampaha", "Kalutara"],
        "Central": ["Kandy", "Matale", "Nuwara Eliya"],
        "Southern": ["Galle", "Matara", "Hambantota"],
        "Northern": ["Jaffna", "Kilinochchi", "Mannar", "Vavuniya", "Mullaaitivu"],
        "Eastern": ["Trincomalee", "Batticaloa", "Ampara"],
        "North Western": ["Kurunegala", "Puttalam"],
        "North Central": ["Anuradhapura", "Polonnaruwa"],
        "Uva": ["Badulla", "Moneragala"],
        "Sabaragamuwa": ["Ratnapura", "Kegalle"]
    };

    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            setDarkMode(true);
            document.documentElement.classList.add('dark');
        }
    }, []);

    const toggleDarkMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        if (newDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    const RegisterPart1 = () => (
        <div className="animate-in fade-in duration-500">
            <div className="text-center mb-8">
                <h1 className="text-5xl font-black text-slate-900 dark:text-white tracking-tight">Lernio.lk</h1>
                <p className="text-xl text-gray-500 dark:text-slate-400 mt-2 font-medium">Create Your Account</p>
            </div>

            <div className="space-y-6">
                <button className="w-full flex items-center justify-center gap-4 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 text-slate-700 dark:text-white p-4 rounded-xl font-bold text-lg hover:bg-gray-50 dark:hover:bg-slate-600 transition shadow-sm active:scale-95">
                    <img src="https://authjs.dev/img/providers/google.svg" alt="Google" className="h-6 w-6" />
                    Sign up with Google
                </button>

                <div className="relative flex items-center justify-center">
                    <div className="flex-grow border-t border-gray-200 dark:border-slate-700"></div>
                    <span className="flex-shrink mx-4 text-gray-400 font-bold text-sm uppercase tracking-wider">OR</span>
                    <div className="flex-grow border-t border-gray-200 dark:border-slate-700"></div>
                </div>

                <div className="space-y-6">
                    <InputWrapper icon={Mail} placeholder="Email Address" type="email" />
                    
                    <div className="relative">
                        <InputWrapper icon={Lock} placeholder="Create Password" type={showPassword ? "text" : "password"} />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors">
                            {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                        </button>
                    </div>

                    <div className="relative">
                        <InputWrapper icon={ShieldCheck} placeholder="Confirm Password" type={showConfirmPassword ? "text" : "password"} />
                        <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors">
                            {showConfirmPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                        </button>
                    </div>
                </div>

                <div className="flex justify-end pt-2">
                    <button 
                        onClick={() => setStep(2)} 
                        className="w-2/4 flex items-center justify-center gap-2 bg-blue-600 text-white p-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition shadow-xl active:scale-95"
                    >
                        Next Step <ArrowRight size={22} />
                    </button>
                </div>
            </div>
        </div>
    );

    const RegisterPart2 = () => (
        <div className="animate-in slide-in-from-right duration-500">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Personal Info</h1>
            </div>
            <div className="space-y-6">
                <div className="flex gap-4">
                    <InputWrapper icon={User} placeholder="First Name" type="text" />
                    <InputWrapper icon={User} placeholder="Last Name" type="text" />
                </div>

                <div className="relative group">
                    <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                    <input 
                        type="text"
                        onFocus={(e) => (e.target.type = "date")}
                        onBlur={(e) => (e.target.type = "text")}
                        placeholder="Date of Birth" 
                        className="w-full pl-14 pr-14 py-4 bg-gray-50 dark:bg-slate-700 border border-gray-100 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition dark:text-white placeholder:text-gray-400 dark:placeholder:text-slate-500 text-base" 
                    />
                    <Calendar className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                </div>

                <InputWrapper icon={Phone} placeholder="Phone Number" type="tel" />
                <InputWrapper icon={MessageCircle} placeholder="WhatsApp Number" type="tel" />

                <div className="relative group">
                    <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                    <select 
                        onChange={(e) => { setSelectedProvince(e.target.value); setSelectedDistrict(""); }}
                        className="w-full pl-14 pr-12 py-4 bg-gray-50 dark:bg-slate-700 border border-gray-100 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-gray-400 dark:text-slate-500 text-base appearance-none transition-colors"
                    >
                        <option value="">Select Province</option>
                        {provinces.map(p => <option key={p} value={p} className="text-slate-900 dark:text-white">{p}</option>)}
                    </select>
                    <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                </div>

                <div className="relative group">
                    <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                    <select 
                        value={selectedDistrict}
                        onChange={(e) => setSelectedDistrict(e.target.value)}
                        className="w-full pl-14 pr-12 py-4 bg-gray-50 dark:bg-slate-700 border border-gray-100 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-gray-400 dark:text-slate-500 text-base appearance-none transition-colors"
                    >
                        <option value="">Select District</option>
                        {selectedProvince && districtsByProvince[selectedProvince].map(d => (
                            <option key={d} value={d} className="text-slate-900 dark:text-white">{d}</option>
                        ))}
                    </select>
                    <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                </div>

                <InputWrapper icon={MapPin} placeholder="Home Address" type="text" />

                <div className="relative group">
                    <School className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                    <select className="w-full pl-14 pr-12 py-4 bg-gray-50 dark:bg-slate-700 border border-gray-100 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-gray-400 dark:text-slate-500 text-base appearance-none transition-colors">
                        <option value="">Select Your School</option>
                        <option className="text-slate-900 dark:text-white">Royal College, Colombo</option>
                        <option className="text-slate-900 dark:text-white">Ananda College, Colombo</option>
                    </select>
                    <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                </div>

                <div className="border-2 border-dashed border-gray-100 dark:border-slate-700 rounded-3xl p-8 flex flex-col items-center justify-center bg-gray-50/30 dark:bg-slate-800/50">
                    <div className="w-20 h-20 bg-gray-100 dark:bg-slate-700 rounded-full flex items-center justify-center border-4 border-white dark:border-slate-600 shadow-sm mb-6">
                        <User className="text-gray-400" size={32} />
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 text-center mb-6 leading-relaxed px-4">
                        Upload a professional profile photo. JPG, PNG or WebP allowed.
                    </p>
                    <button className="flex items-center gap-2 bg-[#D1E9F6] text-[#051630] px-6 py-3 rounded-xl font-bold hover:bg-blue-200 transition active:scale-95">
                        <Upload size={18} /> Upload Photo
                    </button>
                </div>

                <div className="flex gap-4 pt-4">
                    <button onClick={() => setStep(1)} className="w-1/3 flex items-center justify-center gap-2 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-200 p-4 rounded-xl font-bold hover:bg-gray-500 transition active:scale-95">
                        <ArrowLeft size={22} /> Back
                    </button>
                    <button className="w-2/3 flex items-center justify-center gap-3 bg-blue-600 text-white p-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition shadow-xl active:scale-95">
                        Register Now
                    </button>
                </div>
            </div>
        </div>
    );

    return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex items-center justify-center p-6 transition-colors duration-300">
        
        <div className="absolute top-10 right-10">
            <button 
                onClick={toggleDarkMode}
                className="p-3 rounded-full bg-white dark:bg-slate-800 shadow-lg text-blue-600 dark:text-yellow-400 transition-all hover:scale-110"
            >
                {darkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
        </div>

        <div className="bg-white dark:bg-slate-800 p-12 rounded-3xl shadow-2xl w-full max-w-lg transition-colors duration-300 border border-gray-100 dark:border-slate-700 my-10">
            
            {step === 1 ? <RegisterPart1 /> : <RegisterPart2 />}

            <div className="mt-10 pt-6 border-t border-gray-100 dark:border-slate-700 text-center">
                <p className="text-gray-500 dark:text-slate-400 font-medium">
                    Already have an account? 
                    <Link to="/login" className="ml-2 text-blue-600 dark:text-blue-400 font-bold hover:underline">
                        Log in
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
        <input {...props} className="w-full pl-14 pr-14 py-4 bg-gray-50 dark:bg-slate-700 border border-gray-100 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition dark:text-white placeholder:text-gray-400 dark:placeholder:text-slate-500" />
    </div>
);

export default Register;