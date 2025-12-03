// import { useState } from "react";
// import { searchAnimes } from "../../service/server";
// import { useNavigate } from "react-router-dom";

// export default function AnimeSearch() {
//     const [query, setQuery] = useState("");
//     const [results, setResults] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();

//     const handleSearch = async () => {
//         if (!query.trim()) return;

//         setLoading(true);
//         try {
//             const res = await searchAnimes(query, 1, 20);
//             setResults(res.data || []);
//         } catch (err) {
//             console.error(err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="px-6 py-6 mt-20">
//             {/* SEARCH BAR */}
//             <div className="flex gap-3">
//                 <input
//                     type="text"
//                     placeholder="Search Anime..."
//                     value={query}
//                     onChange={(e) => setQuery(e.target.value)}
//                     className="w-full p-3 rounded-lg border border-gray-400 dark:border-gray-600 
//                                bg-white dark:bg-gray-800 text-black dark:text-white"
//                 />
//                 <button
//                     onClick={handleSearch}
//                     className="px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
//                 >
//                     Search
//                 </button>
//             </div>

//             {/* LOADING */}
//             {loading && (
//                 <p className="mt-4 text-lg text-black dark:text-white">Loading...</p>
//             )}

//             {/* NO RESULTS */}
//             {!loading && results.length === 0 && query.length > 0 && (
//                 <p className="mt-4 text-lg text-gray-500">No anime found.</p>
//             )}

//             {/* RESULTS */}
//             <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4 mt-6">
//                 {results.map(anime => (
//                     <div
//                         key={anime.mal_id}
//                         className="cursor-pointer group"
//                         onClick={() => navigate(`/anime/${anime.mal_id}`)}
//                     >
//                         <div className="overflow-hidden rounded-lg shadow-md">
//                             <img
//                                 src={
//                                     anime.images?.jpg?.large_image_url ||
//                                     anime.images?.jpg?.image_url ||
//                                     "https://i.imgur.com/q7o5S4F.png"
//                                 }
//                                 alt={anime.title}
//                                 className="w-full h-52 object-cover rounded-lg transition group-hover:scale-105"
//                             />
//                         </div>

//                         <h2 className="mt-2 text-sm font-semibold text-black dark:text-white group-hover:text-purple-600">
//                             {anime.title}
//                         </h2>

//                         <p className="text-xs text-gray-500 dark:text-gray-400">
//                             Episodes: {anime.episodes ?? "?"}
//                         </p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }
import { useState } from "react";
import { searchAnimes } from "../../service/server";
import { useNavigate } from "react-router-dom";

export default function AnimeSearch() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false); // NEW
    const navigate = useNavigate();

    const handleSearch = async () => {
        if (!query.trim()) {
            setResults([]);
            setSearched(false); 
            return;
        }

        setLoading(true);
        setSearched(true);

        try {
            const res = await searchAnimes(query, 1, 20);
            setResults(res.data || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="px-6 py-6 mt-20">
            {/* SEARCH BAR */}
            <div className="flex gap-3">
                <input
                    type="text"
                    placeholder="Search Anime..."
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        if (e.target.value.trim() === "") {
                            setSearched(false);
                            setResults([]);
                        }
                    }}
                    className="w-full p-3 rounded-lg border border-gray-400 dark:border-gray-600 
                               bg-white dark:bg-gray-800 text-black dark:text-white"
                />
                <button
                    onClick={handleSearch}
                    className="px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                    Search
                </button>
            </div>

            {/* PLACEHOLDER WHEN NOTHING ENTERED */}
            {!searched && !loading && query.trim() === "" && (
                <div className="mt-10 flex flex-col items-center ">
                    <img
                        src={`${import.meta.env.BASE_URL}search.gif`}
                        className="w-56"
                        alt="Search Anime"
                    />
                    <p className="text-lg mt-3 text-gray-600 dark:text-gray-300">
                        Type something to search anime
                    </p>
                </div>
            )}

            {/* LOADING */}
            {loading && (
                <p className="mt-4 text-lg text-black dark:text-white">Loading...</p>
            )}

            {/* NO RESULTS IMAGE */}
            {searched && !loading && results.length === 0 && query.trim() !== "" && (
                <div className="mt-10 flex flex-col items-center">
                    <img
                        src={`${import.meta.env.BASE_URL}noresult.gif`}
                        className="w-60 opacity-80"
                        alt="No Results"
                    />
                    <p className="mt-3 text-lg text-gray-500">
                        No anime found for “{query}”
                    </p>
                </div>
            )}

            {/* RESULTS GRID */}
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4 mt-6">
                {results.map(anime => (
                    <div
                        key={anime.mal_id}
                        className="cursor-pointer group"
                        onClick={() => navigate(`/anime/${anime.mal_id}`)}
                    >
                        <div className="overflow-hidden rounded-lg shadow-md">
                            <img
                                src={
                                    anime.images?.jpg?.large_image_url ||
                                    anime.images?.jpg?.image_url ||
                                    "https://i.imgur.com/q7o5S4F.png"
                                }
                                alt={anime.title}
                                className="w-full h-52 object-cover rounded-lg transition group-hover:scale-105"
                            />
                        </div>

                        <h2 className="mt-2 text-sm font-semibold text-black dark:text-white group-hover:text-purple-600">
                            {anime.title}
                        </h2>

                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            Episodes: {anime.episodes ?? "?"}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
