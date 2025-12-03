import { useEffect, useRef, useState } from "react";
import { topManga } from "../../service/server";
import { useNavigate } from "react-router-dom";

export default function Topmanga() {
    const [manga, setManga] = useState([]);
    const [loading, setLoading] = useState(true);
    const scrollRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchManga();
    }, []);

    const fetchManga = async (retryCount = 0) => {
        try {
            const data = await topManga(); // returns { data: [manga objects] }
            const cleanData = data.data || [];
            setManga(cleanData);
            setLoading(false);
        } catch (err) {
            if (err.response?.status === 429 && retryCount < 5) {
                console.warn("Too many requests, retrying in 1 sec...");
                setTimeout(() => fetchManga(retryCount + 1), 1000);
            } else {
                console.error(err);
                setLoading(false);
            }
        }
    };

    const scrollLeft = () =>
        scrollRef.current?.scrollBy({ left: -400, behavior: "smooth" });

    const scrollRight = () =>
        scrollRef.current?.scrollBy({ left: 400, behavior: "smooth" });

    if (loading)
        return (
            <p className="text-xl text-black dark:text-white px-6">
                Loading Top Manga...
            </p>
        );

    if (!manga.length)
        return (
            <p className="text-center text-gray-500 dark:text-gray-400 mt-10">
                No top manga found.
            </p>
        );

    return (
        <div className="mt-4 relative">

            {/* HEADER */}
            <div className="flex justify-between items-center px-6 py-3">
                <h1 className="text-3xl font-bold text-black dark:text-white">
                    Top Manga
                </h1>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate("/manga")}
                        className="border border-purple-700 dark:border-purple-500 text-purple-600 dark:text-purple-300 hover:bg-purple-600 hover:text-white font-semibold rounded-lg text-sm px-4 py-2"
                    >
                        View All
                    </button>

                    <button onClick={scrollLeft} className="hidden lg:block text-black dark:text-white bg-white/50 dark:bg-gray-700 hover:bg-white/80 dark:hover:bg-gray-600 p-2 rounded-full shadow-lg">
                        &#10094;
                    </button>

                    <button onClick={scrollRight} className="hidden lg:block text-black dark:text-white bg-white/50 dark:bg-gray-700 hover:bg-white/80 dark:hover:bg-gray-600 p-2 rounded-full shadow-lg">
                        &#10095;
                    </button>
                </div>
            </div>

            {/* MANGA LIST */}
            <div className="px-6 pb-4">
                <div ref={scrollRef} className="flex gap-4 overflow-x-auto scrollbar-hide py-2">
                    {manga.slice(0, 10).map(m => (
                        <div
                            key={m.mal_id}
                            onClick={() => navigate(`/manga/${m.mal_id}`)}
                            className="flex-shrink-0 w-36 md:w-48 cursor-pointer group"
                        >
                            <div className="relative overflow-hidden rounded-lg shadow-lg">
                                <img
                                    src={m.images?.jpg?.image_url || "https://i.imgur.com/q7o5S4F.png"}
                                    alt={m.title}
                                    className="w-full h-48 md:h-60 object-cover rounded-lg transition duration-300 group-hover:scale-105"
                                />
                            </div>

                            <h2 className="text-sm md:text-base font-semibold mt-2 truncate text-black dark:text-white group-hover:text-purple-700 dark:group-hover:text-purple-300 transition duration-300">
                                {m.title}
                            </h2>

                            <p className="text-xs text-gray-600 dark:text-gray-300 truncate">
                                Chapters: {m.chapters ?? "TBA"}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
