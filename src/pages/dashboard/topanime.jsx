import React, { useEffect, useRef, useState } from 'react';
import { topAnime } from '../../service/server';
import AnimeCard from './AnimeCard';

export default function Topanime() {
    const [topAnimeData, setTopAnimeData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const scrollRef = useRef(null);

    const loadData = async (retryCount = 0) => {
        try {
            const res = await topAnime();
            setTopAnimeData(res?.data || []);
        } catch (err) {
            if (err.response?.status === 429) {
                if (retryCount < 5) { // max 5 retries
                    console.warn("Too many requests, retrying in 1 sec...");
                    setTimeout(() => loadData(retryCount + 1), 1000);
                } else {
                    console.error("Max retries reached for topAnime.");
                    setError("Failed to load top anime data due to rate limit.");
                }
            } else {
                console.error(err);
                setError("Failed to load top anime data.");
            }
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        loadData();
    }, []);

    const scrollLeft = () => scrollRef.current?.scrollBy({ left: -400, behavior: "smooth" });
    const scrollRight = () => scrollRef.current?.scrollBy({ left: 400, behavior: "smooth" });

    if (loading) return <p className="text-center mt-8 text-black dark:text-white"></p>;
    if (error) return <p className="text-center text-red-500 mt-8">{error}</p>;

    return (
        <div className="mt-4 relative">
            <div className="flex justify-between items-center px-6 py-3">
                <h1 className="text-3xl font-bold text-black dark:text-white">Top Rated Anime</h1>

                <div className="flex gap-2">
                    <button className="border border-purple-800 text-purple-400 hover:bg-purple-600 hover:text-white font-semibold rounded-lg text-sm px-4 py-2">
                        View All
                    </button>

                    <button
                        onClick={scrollLeft}
                        className="hidden lg:block text-black dark:text-white bg-white/50 hover:bg-white/80 p-2 rounded-full shadow-lg"
                    >
                        &#10094;
                    </button>

                    <button
                        onClick={scrollRight}
                        className="hidden lg:block text-black dark:text-white bg-white/50 hover:bg-white/80 p-2 rounded-full shadow-lg"
                    >
                        &#10095;
                    </button>
                </div>
            </div>

            <div className="px-6 pb-4">
                <div
                    ref={scrollRef}
                    className="flex gap-4 overflow-x-auto scrollbar-hide py-2"
                >
                    {topAnimeData.map((anime) => (
                        <AnimeCard key={anime.mal_id} anime={anime} />
                    ))}
                </div>
            </div>
        </div>
    );
}
