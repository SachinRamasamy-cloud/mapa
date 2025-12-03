import axios from "axios";
import base from "./commonAPI";

// Basic search
export const searchAnime = async (q) => {
    const res = await axios.get(`${base}/anime`, { params: { q } });
    return res.data;
};

// Advanced search with filters
export const searchAnimeAdvance = async (params) => {
    const res = await axios.get(`${base}/anime`, { params });
    return res.data;
};

// Search anime by name with optional page & limit
export const searchAnimes = async (query, page = 1, limit = 20) => {
    try {
        const res = await axios.get(`${base}/anime`, {
            params: {
                q: query,
                page,
                limit,
                order_by: "score",
                sort: "desc"
            }
        });

        return res.data;
    } catch (err) {
        console.error("Error searching anime:", err);
        throw err;
    }
};


// Recommendations (global)
export const recommendedAnime = async () => {
    const res = await axios.get(`${base}/recommendations/anime`);
    return res.data;
};

// Random anime
export const randomAnime = async () => {
    const res = await axios.get(`${base}/random/anime`);
    return res.data;
};



export const topAnime = async () => {
    const res = await axios.get(`${base}/top/anime`);
    return res.data;
};

export const topAiringAnime = async () => {
    const res = await axios.get(`${base}/top/anime`, {
        params: { filter: "airing" }
    });
    return res.data;
};

export const topUpcomingAnime = async () => {
    const res = await axios.get(`${base}/top/anime`, {
        params: { filter: "upcoming" }
    });
    return res.data;
};

export const topPopularAnime = async () => {
    const res = await axios.get(`${base}/top/anime`, {
        params: { filter: "bypopularity" }
    });
    return res.data;
};



export const newAnime = async () => {
    const res = await axios.get(`${base}/seasons/now`);
    return res.data;
};

export const soonAnime = async () => {
    const res = await axios.get(`${base}/seasons/upcoming`);
    return res.data;
};

// Get all available seasons
export const getAllSeasons = async () => {
    const res = await axios.get(`${base}/seasons`);
    return res.data;
};

// Get anime by specific season + year
export const getSeasonAnime = async (year, season) => {
    const res = await axios.get(`${base}/seasons/${year}/${season}`);
    return res.data;
};



// Basic details
export const getAnimeDetails = async (mal_id) => {
    const res = await axios.get(`${base}/anime/${mal_id}`);
    return res.data;
};

// Full details (includes staff, relations, recommendations)
export const getAnimeFullDetails = async (mal_id) => {
    const res = await axios.get(`${base}/anime/${mal_id}/full`);
    return res.data;
};

// Pictures
export const getAnimePictures = async (mal_id) => {
    const res = await axios.get(`${base}/anime/${mal_id}/pictures`);
    return res.data;
};

// Trailers & videos
export const getAnimeVideos = async (mal_id) => {
    const res = await axios.get(`${base}/anime/${mal_id}/videos`);
    return res.data;
};


// Characters for an anime
export const getAnimeCharacters = async (mal_id) => {
    const res = await axios.get(`${base}/anime/${mal_id}/characters`);
    return res.data;
};

// Staff info
export const getAnimeStaff = async (mal_id) => {
    const res = await axios.get(`${base}/anime/${mal_id}/staff`);
    return res.data;
};



export const getAnimeEpisodes = async (mal_id, page = 1) => {
    const res = await axios.get(`${base}/anime/${mal_id}/episodes`, {
        params: { page }
    });
    return res.data;
};


// News
export const getAnimeNews = async (mal_id) => {
    const res = await axios.get(`${base}/anime/${mal_id}/news`);
    return res.data;
};

// Reviews
export const getAnimeReviews = async (mal_id) => {
    const res = await axios.get(`${base}/anime/${mal_id}/reviews`);
    return res.data;
};


// geners
export const getGenres = async () => {
    const res = await axios.get(`${base}/genres/anime`);
    return res.data;
};

// get generes by id
export const getAnimeByGenre = async (genreId, page = 1) => {
    const res = await axios.get(`${base}/anime?genres=${genreId}&page=${page}`);
    return res.data;
};


// top manga
export const topManga = async () => {
    const res = await axios.get(`${base}/top/manga`);
    return res.data;
};

// recommend
export const recommendManga = async () => {
    const res = await axios.get(`${base}/recommendations/manga`);
    return res.data;
};

// upcomming
export const upcommingManga = async () => {
    const res = await axios.get(`${base}/manga`, {
        params: { order_by: "start_date", sort: "asc" }
    });
    return res.data;
};

// all manga recommend
export const getMangaRecommendations = async (mal_id) => {
    const res = await axios.get(`${base}/manga/${mal_id}/recommendations`);
    return res.data;
};

// manga full detial
export const getMangaFullDetails = async (mal_id) => {
    const res = await axios.get(`${base}/manga/${mal_id}/full`);
    return res.data;
};
