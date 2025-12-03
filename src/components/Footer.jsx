import { FaFacebook, FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="mt-20 bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-6 py-14">
                
                {/* TOP GRID */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                    
                    {/* BRAND */}
                    <div>
                        <h2 className="text-3xl font-extrabold text-purple-600">MAPA</h2>
                        <p className="mt-3 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                            Your gateway to discovering the world of anime. 
                            Search, explore, track — all in one place.
                        </p>
                    </div>

                    {/* QUICK LINKS */}
                    <div className="">
                        <h3 className="font-semibold text-black dark:text-white mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                            <li><Link to="/" className="hover:text-purple-600">Home</Link></li>
                            <li><Link to="/genres" className="hover:text-purple-600">Genres</Link></li>
                            <li><Link to="/top-anime" className="hover:text-purple-600">Top Anime</Link></li>
                            <li><Link to="/contact" className="hover:text-purple-600">Contact</Link></li>
                        </ul>
                    </div>

                    {/* SOCIAL LINKS */}
                    <div>
                        <h3 className="font-semibold text-black dark:text-white mb-4">Follow Us</h3>
                        <div className="flex gap-4 text-2xl text-black dark:text-white">
                            <FaFacebook className="hover:text-purple-600 cursor-pointer transition" />
                            <FaInstagram className="hover:text-purple-600 cursor-pointer transition" />
                            <FaTwitter className="hover:text-purple-600 cursor-pointer transition" />
                            <FaGithub className="hover:text-purple-600 cursor-pointer transition" />
                        </div>
                    </div>

                    {/* NEWSLETTER */}
                    <div>
                        <h3 className="font-semibold text-black dark:text-white mb-4">Newsletter</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                            Subscribe for updates, new releases & announcements.
                        </p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full p-3 rounded-lg bg-white dark:bg-gray-800 
                                           border border-gray-300 dark:border-gray-700 
                                           text-sm text-black dark:text-white"
                            />
                            <button
                                className="px-4 py-3 rounded-lg bg-purple-600 text-white text-sm 
                                           hover:bg-purple-700 transition"
                            >
                                Join
                            </button>
                        </div>
                    </div>
                </div>

                {/* BOTTOM COPYRIGHT */}
                <div className="text-center mt-12 border-t border-gray-300 dark:border-gray-700 pt-6">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        © {new Date().getFullYear()} MAPA — All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
