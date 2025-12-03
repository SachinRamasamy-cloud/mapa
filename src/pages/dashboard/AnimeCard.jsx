import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";

const AnimeCard = ({ anime }) => {
    const [isHovered, setIsHovered] = useState(false);
    const cardRef = useRef(null);
    const navigate = useNavigate()
    const getPopupStyle = () => {
        if (!cardRef.current) return {};

        const rect = cardRef.current.getBoundingClientRect();
        const popupWidth = 300;
        const viewportWidth = window.innerWidth;

        let left = rect.right + 10;
        let top = rect.top;

        if (left + popupWidth > viewportWidth) {
            left = rect.left - popupWidth - 10;
        }

        return {
            position: "fixed",
            top: `${top}px`,
            left: `${left}px`,
            zIndex: 9999,
        };
    };

    return (
        <>
            <div
                ref={cardRef}
                onClick={() => navigate(`/anime/${anime.mal_id}`)}
                className="flex-shrink-0 w-36 md:w-48 cursor-pointer group relative"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Image */}
                <div className="relative overflow-hidden rounded-lg shadow-lg">
                    <img
                        src={anime.images.jpg.image_url}
                        alt={anime.title}
                        className="w-full h-48 md:h-60 object-cover rounded-lg transition duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-2 left-2 bg-black/70 text-white text-xs font-bold py-1 px-2 rounded">
                        #{anime.rank || "N/A"} |
                        <span className="ml-1 text-yellow-400">★ {anime.score || "N/A"}</span>
                    </div>
                </div>

                <h2 className="text-sm md:text-base text-black dark:text-white font-semibold mt-2 truncate group-hover:text-purple-700 transition duration-300 text-black">
                    {anime.title}
                </h2>
                <p className="text-xs text-gray-600 dark:text-gray-300 truncate">
                    {anime.type} | {anime.episodes ? `${anime.episodes} eps` : "Unknown"}
                </p>
            </div>

            {/* HOVER POPUP — PORTAL FIX */}
            {isHovered &&
                createPortal(
                    <div
                        style={getPopupStyle()}
                        className="bg-white text-black p-4 rounded-xl shadow-2xl w-[300px] border border-purple-300/60 
                       backdrop-blur-md transition duration-200"
                    >
                        <h3 className="font-bold text-lg mb-2 text-purple-700">{anime.title}</h3>

                        <p className="text-sm text-gray-700 mb-3 line-clamp-4">
                            {anime.synopsis || "Synopsis not available."}
                        </p>

                        <div className="flex justify-between text-xs font-semibold">
                            <span className="text-purple-600">Rank: #{anime.rank}</span>
                            <span className="text-yellow-500">★ {anime.score}</span>
                        </div>
                    </div>,
                    document.body
                )
            }

        </>
    );
};

export default AnimeCard;
