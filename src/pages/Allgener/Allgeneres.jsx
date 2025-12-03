import React, { useEffect, useState } from "react";
import { getGenres } from "../../service/server";
import { FiTag } from "react-icons/fi"; // icon
import { useNavigate } from "react-router-dom";

export default function Allgeneres() {
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()

    const loadGenres = async (retryCount = 0) => {
        try {
            const data = await getGenres();
            const cleanData = data.data || [];
            setGenres(cleanData);
        } catch (err) {
            if (err.response?.status === 429) {
                if (retryCount < 5) { // max 5 retries
                    console.warn("Too many requests, retrying in 1 sec...");
                    setTimeout(() => loadGenres(retryCount + 1), 1000);
                } else {
                    console.error("Max retries reached for newAnime.");
                }
            } else {
                console.error(err);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadGenres();
    }, []);

    if (loading) {
        return (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
                {[...Array(8)].map((_, i) => (
                    <div
                        key={i}
                        className="h-20 bg-gray-300 dark:bg-gray-700 rounded-xl animate-pulse"
                    ></div>
                ))}
            </div>
        );
    }

    return (
        <div className="p-4 mt-20">
            <h2 className="text-2xl text-black dark:text-white font-bold mb-4">
                Genres <span className="text-blue-500">({genres.length})</span>
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {genres.map((g) => (
                    <div
                        key={g.mal_id}
                        onClick={() => navigate(`/genres/${g.mal_id}/${g.name}`)}
                        className="flex items-center gap-3 bg-white dark:bg-gray-800 
                                   p-4 rounded-xl shadow-sm hover:shadow-md 
                                   transition-all duration-200 cursor-pointer 
                                   hover:-translate-y-1"
                    >
                        <FiTag className="text-blue-500 text-xl" />
                        <div>
                            <p className="font-semibold text-black dark:text-white">{g.name}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {g.count} anime
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
