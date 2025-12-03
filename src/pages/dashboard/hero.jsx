import React, { useEffect, useState, useRef } from 'react';
import { newAnime } from '../../service/server';
import { motion, AnimatePresence } from 'framer-motion';

// Custom CSS to hide the scrollbar (optional, but good for aesthetics)
const scrollbarHideStyles = `
    .scrollbar-hide::-webkit-scrollbar {
        display: none;
    }
    .scrollbar-hide {
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
    }
    /* Custom style for the large title text shadow */
    .hero-title-shadow {
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.9);
    }
`;

export default function Hero() {
    const [newanime, setNewAnime] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollRef = useRef(null);

    const loaddata = async () => {
        try {
            const res = await newAnime();
            setNewAnime(res.data);
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch anime data:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        loaddata();
    }, []);

    // Auto-advance logic
    useEffect(() => {
        if (newanime.length > 0) {
            const interval = setInterval(() => {
                setCurrentIndex(prev => (prev + 1) % newanime.length);
            }, 8000);
            return () => clearInterval(interval);
        }
    }, [newanime]);

    // Scroll the featured row to keep the current index visible
    useEffect(() => {
        if (scrollRef.current && newanime.length > 0) {
            const cardWidth = 208;
            // Center the selected card in the viewport of the scroll container
            const scrollPosition = currentIndex * cardWidth - (scrollRef.current.clientWidth / 2) + (cardWidth / 2);
            scrollRef.current.scrollTo({ left: scrollPosition, behavior: 'smooth' });
        }
    }, [currentIndex, newanime]);

    // if (loading) return <div className='h-screen w-full flex items-center justify-center text-white bg-gray-900'>Loading...</div>;
    if (!newanime.length) return <div className=''></div>;

    const spotlightAnime = newanime[currentIndex];
    const featuredAnimeRow = newanime.slice(0, 10);

    const scrollLeft = () => scrollRef.current?.scrollBy({ left: -400, behavior: 'smooth' });
    const scrollRight = () => scrollRef.current?.scrollBy({ left: 400, behavior: 'smooth' });
    const setSpotlightAnime = (index) => setCurrentIndex(index);

    // Function to render the title in the multi-line style
    const renderTitle = (title) => {
        // Splitting into words, keeping the first 3 for the large text stack look
        return title.toUpperCase().split(' ').slice(0, 3).map((word, index) => (
            <span key={index} className='block'>{word}</span>
        ));
    };

    return (
        <div className='h-screen w-full relative overflow-hidden bg-gray-900'>
            <style>{scrollbarHideStyles}</style>

            {/* 1. Background Image and Overlays */}
            <AnimatePresence mode="wait">
                <motion.img
                    key={spotlightAnime.mal_id}
                    src={spotlightAnime.images.jpg.large_image_url}
                    alt={spotlightAnime.title}
                    className='absolute inset-0 w-full h-full object-cover object-top'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.8 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.0 }}
                />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-black/30"></div>
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black to-transparent"></div>


            {/* 2. Content Container: Flex row anchored to the bottom, justifying content left/right */}
            <div className="relative h-full flex items-end p-8 md:p-16 text-white z-10">
                <div className='flex justify-between items-end w-full'>

                    {/* LEFT SECTION: Title, Description, and Buttons */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={spotlightAnime.mal_id}
                            initial={{ x: -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -100, opacity: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="flex flex-col max-w-xl mb-4"
                        >
                            <p className='text-sm font-semibold mb-2 rounded-lg bg-purple-400/30 w-fit p-2 text-purple-400'>
                                NEW RELEACE
                            </p>
                            <h1 className='text-4xl md:text-6xl font-black mb-4 leading-none hero-title-shadow'>
                                {/* FIX: Using text-6xl/8xl and leading-none ensures tight spacing for the multi-line effect */}
                                {renderTitle(spotlightAnime.title)}
                            </h1>
                            <p className='text-base md:text-lg mb-8 font-light max-w-lg'>
                                {spotlightAnime.synopsis ? spotlightAnime.synopsis.substring(0, 200) + "..." : "No synopsis available."}
                            </p>
                            <div className="flex gap-4">
                                <button className='uppercase text-sm rounded-lg bg-purple-500 text-white py-3 px-6 w-fit transition duration-300 font-semibold'>
                                    Watch Now
                                </button>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* RIGHT SECTION: Featured Anime Row & Navigation */}
                    <div className="hidden md:flex flex-col items-end min-w-0">
                        <div className="text-right w-full">
                            <p className='text-sm mb-2 font-medium mr-4'>featured anime</p>
                        </div>
                        <div className="flex items-center gap-2">
                            {/* Scroll Button Left */}
                            <button
                                onClick={scrollLeft}
                                className="text-white bg-black/50 hover:bg-black/80 p-3 rounded-full shadow-lg transition duration-300 hidden lg:block"
                                aria-label="Scroll Left"
                            >
                                &#10094;
                            </button>

                            <div
                                ref={scrollRef}
                                className="flex gap-4 overflow-x-auto scrollbar-hide py-2 max-w-xs md:max-w-md lg:max-w-xl"
                            >
                                {featuredAnimeRow.map((anime, index) => (
                                    <div
                                        key={anime.mal_id || index}
                                        className={`w-36 md:w-48 flex-shrink-0 cursor-pointer text-center transition duration-300 ease-in-out p-1 ${index === currentIndex ? 'transform scale-105 border-2 border-blue-500 rounded-lg opacity-100 shadow-xl' : 'opacity-70 hover:opacity-100'}`}
                                        onClick={() => setSpotlightAnime(index)}
                                    >
                                        <img
                                            src={anime.images.jpg.image_url}
                                            alt={anime.title}
                                            // FIX: The card itself has 1px padding, so image is slightly smaller to allow border/scale space
                                            className='w-full h-48 md:h-60 object-cover rounded-md'
                                        />
                                        <h1 className='text-xs md:text-sm font-semibold mt-1 truncate'>{anime.title}</h1>
                                    </div>
                                ))}
                            </div>

                            {/* Scroll Button Right */}
                            <button
                                onClick={scrollRight}
                                className="text-white bg-black/50 hover:bg-black/80 p-3 rounded-full shadow-lg transition duration-300 hidden lg:block"
                                aria-label="Scroll Right"
                            >
                                &#10095;
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}