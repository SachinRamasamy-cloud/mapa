import React from "react";
import { useNavigate } from "react-router-dom";

export default function Pnf() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4 text-center">
            
            {/* Animated Image */}
            <img
                src="https://cdn.dribbble.com/userupload/21619919/file/original-e0c715c2ebdea828daed8c8cc53330e2.gif"
                alt="Page Not Found"
                className="w-80 md:w-[500px] mb-8"
            />

            {/* Go Home Button */}
            <button
                onClick={() => navigate("/")}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg shadow-lg hover:bg-purple-700 transition-all"
            >
                Go Back Home
            </button>
        </div>
    );
}
