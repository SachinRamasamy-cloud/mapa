import { useEffect, useState } from "react";
import { getAnimeByGenre } from "../../service/server";
import { useParams, useNavigate } from "react-router-dom";
import {
    FiFilter,
    FiChevronDown,
    FiChevronUp,
    FiX,
    FiArrowLeft,
    FiArrowRight
} from "react-icons/fi";

export default function Genres() {
    const { id, name } = useParams();
    const [anime, setAnime] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasNext, setHasNext] = useState(false);
    const [totalPages, setTotalPages] = useState(1);

    const navigate = useNavigate();

    // Filters
    const [sortBy, setSortBy] = useState("");
    const [type, setType] = useState("");
    const [status, setStatus] = useState("");
    const [rating, setRating] = useState("");

    const [showFilters, setShowFilters] = useState(false);
    const fetchAnime = async (pageNum) => {
        try {
            setLoading(true);
            const data = await getAnimeByGenre(id, pageNum);

            setAnime(data.data || []);
            setHasNext(data.pagination?.has_next_page);
            setTotalPages(data.pagination?.last_visible_page || 1);

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    const getPageNumbers = () => {
        const pages = [];
        const maxPagesToShow = 5;

        if (totalPages <= maxPagesToShow) {
            return [...Array(totalPages).keys()].map(n => n + 1);
        }

        // Always show first and last
        pages.push(1);

        let left = page - 1;
        let right = page + 1;

        if (left > 2) pages.push("...");
        for (let i = Math.max(2, left); i <= Math.min(totalPages - 1, right); i++) {
            pages.push(i);
        }
        if (right < totalPages - 1) pages.push("...");

        pages.push(totalPages);

        return pages;
    };

    useEffect(() => {
        fetchAnime(page);
    }, [id, page]);


    // Apply Filters
    const applyFilters = () => {
        setPage(1);
        fetchAnime(1);
    };

    // Reset filters
    const clearFilters = () => {
        setSortBy("");
        setType("");
        setStatus("");
        setRating("");
        setPage(1);
        fetchAnime(1);
    };

    return (
        <div className="px-6 mt-20 mb-10 text-black dark:text-white">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">{name} Anime</h1>

                <button
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition"
                    onClick={() => setShowFilters(!showFilters)}
                >
                    <FiFilter size={18} />
                    Filters
                    {showFilters ? <FiChevronUp /> : <FiChevronDown />}
                </button>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
                <div className="bg-white/10 dark:bg-black/30 backdrop-blur-xl border border-white/10 p-5 rounded-2xl mb-6 space-y-4">

                    {/* Sort By */}
                    <div>
                        <label className="font-semibold">Sort By</label>
                        <select
                            className="w-full mt-1 p-2 bg-black/20 rounded-lg border border-white/10"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="">Default</option>
                            <option value="score">Score</option>
                            <option value="popularity">Popularity</option>
                            <option value="favorites">Favorites</option>
                            <option value="rank">Rank</option>
                            <option value="title">Title (A-Z)</option>
                            <option value="-title">Title (Z-A)</option>
                            <option value="year">Year</option>
                        </select>
                    </div>

                    {/* Type Filter */}
                    <div>
                        <label className="font-semibold">Type</label>
                        <select
                            className="w-full mt-1 p-2 bg-black/20 rounded-lg border border-white/10"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        >
                            <option value="">Any</option>
                            <option value="tv">TV</option>
                            <option value="movie">Movie</option>
                            <option value="ova">OVA</option>
                            <option value="special">Special</option>
                            <option value="ona">ONA</option>
                        </select>
                    </div>

                    {/* Status Filter */}
                    <div>
                        <label className="font-semibold">Status</label>
                        <select
                            className="w-full mt-1 p-2 bg-black/20 rounded-lg border border-white/10"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="">Any</option>
                            <option value="airing">Airing</option>
                            <option value="complete">Completed</option>
                            <option value="upcoming">Upcoming</option>
                        </select>
                    </div>

                    {/* Rating Filter */}
                    <div>
                        <label className="font-semibold">Rating</label>
                        <select
                            className="w-full mt-1 p-2 bg-black/20 rounded-lg border border-white/10"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                        >
                            <option value="">Any</option>
                            <option value="g">G - All Ages</option>
                            <option value="pg">PG</option>
                            <option value="pg13">PG-13</option>
                            <option value="r17">R - 17+</option>
                            <option value="r">R+</option>
                            <option value="rx">RX - Adult</option>
                        </select>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4 mt-4">
                        <button
                            onClick={applyFilters}
                            className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
                        >
                            Apply Filters
                        </button>

                        <button
                            onClick={clearFilters}
                            className="px-5 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg flex items-center gap-2"
                        >
                            <FiX /> Clear
                        </button>
                    </div>
                </div>
            )}

            {/* Grid */}
            {loading ? (
                <p className="text-center text-purple-400">Loading...</p>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                    {anime.map((a) => (
                        <div
                            key={a.mal_id}
                            className="cursor-pointer group"
                            onClick={() => navigate(`/anime/${a.mal_id}`)}
                        >
                            <div className="relative">
                                <img
                                    src={a.images?.jpg?.image_url}
                                    className="w-full h-56 object-cover rounded-xl shadow-lg group-hover:opacity-90 transition"
                                />
                                <div className="absolute inset-0 rounded-xl group-hover:border-2 group-hover:border-purple-500 transition"></div>
                            </div>

                            <h2 className="mt-2 font-semibold text-sm group-hover:text-purple-400 transition">
                                {a.title}
                            </h2>
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination */}
            <div className="flex justify-center items-center gap-3 mt-10">

                {/* Prev */}
                <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 disabled:opacity-40"
                >
                    <FiArrowLeft />
                </button>

                {/* Page Numbers */}
                <div className="flex items-center gap-2">
                    {getPageNumbers().map((p, idx) => (
                        p === "..." ? (
                            <span key={idx} className="px-3 text-gray-400">...</span>
                        ) : (
                            <button
                                key={idx}
                                onClick={() => setPage(p)}
                                className={`px-4 py-2 rounded-lg border text-sm transition 
                        ${page === p
                                        ? "bg-purple-700 border-purple-500 text-white"
                                        : "bg-white border-purple-500 text-black hover:bg-purple-700 hover:text-white"
                                    }`}
                            >
                                {p}
                            </button>
                        )
                    ))}
                </div>

                {/* Next */}
                <button
                    disabled={!hasNext}
                    onClick={() => setPage(page + 1)}
                    className="p-2 rounded-lg bg-purple-700 hover:bg-purple-600 disabled:opacity-40"
                >
                    <FiArrowRight />
                </button>

            </div>

        </div>
    );
}
