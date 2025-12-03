import React, { useEffect, useState } from "react";
import {
    FaSearch,
    FaBookmark,
    FaSun,
    FaMoon,
    FaBars,
    FaTimes
} from "react-icons/fa"; // <- HashRouter friendly
import { Link } from "react-router-dom";

export default function Header() {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
        document.documentElement.classList.toggle("light", theme === "light");
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

    const navItems = [
        { name: "Home", path: "/" },
        { name: "New", path: "/new" },
        { name: "Popular", path: "/popular" },
        { name: "Manga", path: "/manga" },
        { name: "Category", path: "/genres" },
    ];

    return (
        <header className="
            fixed top-0 left-0 right-0 z-50
            bg-white/10 dark:bg-black/20 
            backdrop-blur-xl shadow-lg 
            border-b border-white/10
            flex justify-between items-center 
            px-6 py-3
        ">
            {/* LEFT: Logo + Nav */}
            <div className="flex items-center gap-6">
                <h1 className="text-3xl font-extrabold text-purple-500 drop-shadow">
                    Mapa
                </h1>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-6">
                    {navItems.map(item => (
                        <Link
                            key={item.name}
                            to={item.path}
                            className="text-black dark:text-white/80 hover:text-purple-400 transition font-medium relative group"
                            onClick={() => setMenuOpen(false)}
                        >
                            {item.name}
                            <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-purple-400 transition-all group-hover:w-full"></span>
                        </Link>
                    ))}
                </nav>
            </div>

            {/* RIGHT: Icons */}
            <div className="flex items-center gap-5 text-black dark:text-white">
                {/* Theme Toggle */}
                <button onClick={toggleTheme} className="text-xl hover:scale-110 transition">
                    {theme === "light" ? <FaMoon className="text-purple-300" /> : <FaSun className="text-yellow-300" />}
                </button>

                <Link to={"/search"} >  <FaSearch className="cursor-pointer hover:text-purple-400 hover:scale-110 transition"/ > </Link>
            <FaBookmark className="cursor-pointer hover:text-purple-400 hover:scale-110 transition" />

            <img
                className="w-10 h-10 rounded-full object-cover border border-white/20 shadow-md hover:scale-105 transition"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4vaNdU9jTY0qKydautK7JQE9iHLxdbzDYAg&s"
                alt="profile"
            />

            {/* Mobile Menu Toggle */}
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-2xl">
                {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
        </div>

            {/* Mobile Dropdown */ }
    {
        menuOpen && (
            <div className="absolute top-full left-0 w-full bg-white/10 dark:bg-black/40 backdrop-blur-xl border-b border-white/10 flex flex-col py-4 md:hidden">
                {navItems.map(item => (
                    <Link
                        key={item.name}
                        to={item.path}
                        className="py-3 px-6 text-left text-black dark:text-white/90 hover:text-purple-400 hover:bg-white/5 transition"
                        onClick={() => setMenuOpen(false)}
                    >
                        {item.name}
                    </Link>
                ))}
            </div>
        )
    }
        </header >
    );
}
