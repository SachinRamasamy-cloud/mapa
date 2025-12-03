import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    getAnimeFullDetails,
    getAnimeEpisodes,
    getAnimeStaff,
    getAnimeVideos,
} from "../../service/server";

export default function Detail() {
    const { id } = useParams();
    const [details, setDetails] = useState(null);
    const [episodes, setEpisodes] = useState([]);
    const [staff, setStaff] = useState([]);
    const [trailer, setTrailer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [visibleCount, setVisibleCount] = useState(8);

    useEffect(() => {
        loadAll();
        window.scrollTo(0, 0);
    }, [id]);

    const loadAll = async () => {
        setLoading(true);
        try {
            const resDetails = await getAnimeFullDetails(id);
            setDetails(resDetails.data);

            const resEpisodes = await getAnimeEpisodes(id);
            setEpisodes(resEpisodes.data || []);

            const resStaff = await getAnimeStaff(id);
            setStaff(resStaff.data || []);

            const resVideos = await getAnimeVideos(id);
            const trailerVideo =
                resVideos.data?.find((v) => v.trailer) || resVideos.data?.[0];
            setTrailer(trailerVideo?.trailer ?? null);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return "Unknown";
        return new Date(dateStr).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    if (loading)
        return (
            <p className="text-center text-purple-500 mt-20 text-xl font-semibold animate-pulse">
                Loading...
            </p>
        );
    if (!details)
        return (
            <p className="text-center text-red-500 mt-10">No details found.</p>
        );

    return (
        <div className="text-black dark:text-white">

            {/* Banner */}
            <div
                className="h-[420px] w-full bg-cover bg-center relative rounded-b-3xl shadow-lg"
                style={{
                    backgroundImage: `url(${details.images?.jpg?.large_image_url})`,
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/80 backdrop-blur-sm"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 -mt-56 relative">

                {/* Poster + Info */}
                <div className="flex flex-col md:flex-row gap-10 p-6 bg-white dark:bg-black/40 backdrop-blur-xl rounded-3xl shadow-xl border border-white/10">

                    <img
                        src={details.images?.jpg?.image_url}
                        alt={details.title}
                        className="w-52 md:w-64 rounded-2xl shadow-2xl border border-white/20"
                    />

                    <div className="flex-1 flex flex-col gap-4">
                        <h1 className="text-4xl font-extrabold drop-shadow-lg leading-tight">
                            {details.title}
                        </h1>

                        {details.title_japanese && (
                            <p className="text-gray-400 italic text-lg">
                                {details.title_japanese}
                            </p>
                        )}

                        {/* Stats */}
                        <div className="flex flex-wrap gap-3 mt-3">
                            <Stat label="⭐ Score" value={details.score ?? "N/A"} color="purple" />
                            <Stat label="🎞 Episodes" value={details.episodes ?? "?"} color="blue" />
                            <Stat label="📌 Status" value={details.status} color="green" />
                            <Stat label="🏷 Type" value={details.type} color="yellow" />
                        </div>

                        <p className="text-sm mt-1 opacity-90">
                            <span className="font-semibold">Aired: </span>
                            {formatDate(details.aired?.from)} →{" "}
                            {formatDate(details.aired?.to)}
                        </p>

                        {details.studios?.length > 0 && (
                            <p className="text-sm opacity-90">
                                <span className="font-semibold">Studio: </span>
                                {details.studios.map((s) => s.name).join(", ")}
                            </p>
                        )}

                        {/* Genres */}
                        <div className="flex flex-wrap gap-2 mt-3">
                            {details.genres?.map((g) => (
                                <span
                                    key={g.mal_id}
                                    className="px-4 py-1 bg-gray-900/30 dark:bg-white/10 border border-white/10 rounded-full text-xs backdrop-blur-sm"
                                >
                                    {g.name}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Synopsis */}
                <Section title="Synopsis">
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                        {details.synopsis || "No synopsis available."}
                    </p>
                </Section>

                {/* Trailer */}
                {trailer?.url && (
                    <Section title="Trailer">
                        <div className="aspect-video rounded-2xl overflow-hidden shadow-lg">
                            <iframe
                                src={trailer.url.replace(
                                    "https://www.youtube.com/watch?v=",
                                    "https://www.youtube.com/embed/"
                                )}
                                title="Trailer"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-full"
                            ></iframe>
                        </div>
                    </Section>
                )}
                {/* Episodes */}
                {episodes.length > 0 && (
                    <div className="mt-14 w-full">
                        <h2 className="text-3xl font-bold mb-4">Episodes</h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {episodes.slice(0, visibleCount).map((ep) => (
                                // ... inside the .map((ep) => (...) )
                                <div
                                    key={ep.mal_id}
                                    className="group bg-white/5 dark:bg-black/30 p-4 rounded-2xl border border-white/10 hover:border-purple-500/40 transition shadow-sm hover:shadow-lg hover:scale-[1.02] duration-300" // Added scale on hover
                                >
                                    {/* Image with improved ratio and better overlay for context */}
                                    <div className="relative w-full aspect-video rounded-lg mb-3 overflow-hidden">
                                        <img
                                            src={ep.image_url || details.images?.jpg?.image_url}
                                            alt={ep.title}
                                            className="w-full h-full object-cover"
                                        />
                                        {/* Episode Number Badge (New Element) */}
                                        <span className="absolute top-2 left-2 px-2 py-0.5 bg-purple-600 text-white text-xs font-bold rounded-full">
                                            EP {ep.episode}
                                        </span>
                                    </div>

                                    {/* Title becomes main focus */}
                                    <p className="font-bold text-base line-clamp-2 group-hover:text-purple-400 transition">
                                        {ep.title}
                                    </p>

                                    {/* Aired date remains subtle */}
                                    <p className="text-xs text-gray-400 mt-1">
                                        {ep.aired ? formatDate(ep.aired) : "Unknown Air Date"}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Load More / Show Less Button */}
                        <div className="flex justify-center mt-6">
                            {visibleCount < episodes.length ? (
                                <button
                                    onClick={() => setVisibleCount(visibleCount + 8)}
                                    className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-md transition"
                                >
                                    Load More
                                </button>
                            ) : (
                                <button
                                    onClick={() => setVisibleCount(8)}
                                    className="px-6 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded-full shadow-md transition"
                                >
                                    Show Less
                                </button>
                            )}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}

/* Reusable Components */

function Section({ title, children }) {
    return (
        <div className="mt-14 max-w-5xl">
            <h2 className="text-3xl font-bold mb-4">{title}</h2>
            {children}
        </div>
    );
}

function Stat({ label, value, color }) {
    return (
        <span
            className={`px-3 py-1 text-sm rounded-lg bg-${color}-700/20 dark:bg-${color}-500/20 border border-${color}-500/40`}
        >
            {label}: {value}
        </span>
    );
}
