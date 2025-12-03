import { useEffect, useRef, useState } from "react";
import { newAnime } from "../../service/server";
import { useNavigate } from "react-router-dom";

export default function Newanime() {
    const [anime, setAnime] = useState([]);
    const [loading, setLoading] = useState(true);
    const scrollRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAnime();
    }, []);

    const fetchAnime = async (retryCount = 0) => {
        try {
            const data = await newAnime();
            const cleanData = data.data || [];
            setAnime(cleanData);
        } catch (err) {
            if (err.response?.status === 429) {
                if (retryCount < 5) { // max 5 retries
                    console.warn("Too many requests, retrying in 1 sec...");
                    setTimeout(() => fetchAnime(retryCount + 1), 1000);
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


    const scrollLeft = () =>
        scrollRef.current?.scrollBy({ left: -400, behavior: "smooth" });

    const scrollRight = () =>
        scrollRef.current?.scrollBy({ left: 400, behavior: "smooth" });

    if (loading)
        return (
            <p className="text-xl text-black dark:text-white px-6">
                Loading...
            </p>
        );

    return (
        <div className="mt-4 relative">

            {/* HEADER */}
            <div className="flex justify-between items-center px-6 py-3">
                <h1 className="text-3xl font-bold text-black dark:text-white">
                    New Anime
                </h1>

                <div className="flex items-center gap-3">

                    <button
                        onClick={() => navigate("/anime")}
                        className="
                            border border-purple-700 dark:border-purple-500 
                            text-purple-600 dark:text-purple-300
                            hover:bg-purple-600 hover:text-white
                            font-semibold rounded-lg text-sm px-4 py-2
                        "
                    >
                        View All
                    </button>

                    <button
                        onClick={scrollLeft}
                        className="hidden lg:block 
                            text-black dark:text-white 
                            bg-white/50 dark:bg-gray-700 
                            hover:bg-white/80 dark:hover:bg-gray-600 
                            p-2 rounded-full shadow-lg"
                    >
                        &#10094;
                    </button>

                    <button
                        onClick={scrollRight}
                        className="hidden lg:block 
                            text-black dark:text-white 
                            bg-white/50 dark:bg-gray-700 
                            hover:bg-white/80 dark:hover:bg-gray-600 
                            p-2 rounded-full shadow-lg"
                    >
                        &#10095;
                    </button>

                </div>
            </div>

            {/* ANIME LIST */}
            <div className="px-6 pb-4">
                <div
                    ref={scrollRef}
                    className="flex gap-4 overflow-x-auto scrollbar-hide py-2"
                >
                    {anime.slice(0, 10).map(a => (
                        <div
                            key={a.mal_id}
                            onClick={() => navigate(`/anime/${a.mal_id}`)}
                            className="flex-shrink-0 w-36 md:w-48 cursor-pointer group"
                        >
                            <div className="relative overflow-hidden rounded-lg shadow-lg">
                                <img
                                    src={
                                        a.images?.jpg?.large_image_url ||
                                        a.images?.jpg?.image_url ||
                                        "https://i.imgur.com/q7o5S4F.png"
                                    }
                                    alt={a.title}
                                    className="w-full h-48 md:h-60 object-cover rounded-lg 
                                    transition duration-300 group-hover:scale-105"
                                />
                            </div>

                            <h2 className="text-sm md:text-base font-semibold mt-2 truncate 
                                text-black dark:text-white 
                                group-hover:text-purple-700 dark:group-hover:text-purple-300 
                                transition duration-300">
                                {a.title}
                            </h2>

                            <p className="text-xs text-gray-600 dark:text-gray-300 truncate">
                                Anime | {a.episodes ?? "?"} eps
                            </p>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}
