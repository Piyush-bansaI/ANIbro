export const fetchAnime = {
    top: "/top/anime",
    topFilter:f => `/top/anime?filter=${f}`, // for airing, upcoming, byPopularity, favorite
    searchPrev:(s, h) => `/anime?q=${encodeURIComponent(s)}&limit=5${h}`,
    search:(s, h) => `/anime?q=${encodeURIComponent(s)}${h}`,
    genreInfo:(id) => `https://api.jikan.moe/v4/anime?genres=${id}`,
    random: "/random/anime",
}