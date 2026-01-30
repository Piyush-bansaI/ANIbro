export const fetchManga = {
    top: "/top/manga",
    topFilter:f => `/top/manga?filter=${f}`,
    searchPrev:(s, h) => `/manga?q=${encodeURIComponent(s)}&limit=5${h}`,
    search:(s, h) => `/manga?q=${encodeURIComponent(s)}${h}`,
    genreInfo:(id) => `https://api.jikan.moe/v4/manga?genres=${id}`,
    random: "/random/manga",
}