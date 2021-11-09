const API_KEY = "1ac954f3a80a366794602b75222bbf8e";

const requests = {
    fetchTrending:`/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchNetflixOriginals:`/discover/tv?api_key=${API_KEY}&with_networks=213`,
    fetchTopRated:`/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchActionMovies:`/discover/movie?api_key=${API_KEY}&with_genres=28`,
    fetchComedyMovies:`/discover/movie?api_key=${API_KEY}&with_genres=35`,
    fetchHorrorMovies:`/discover/movie?api_key=${API_KEY}&with_genres=27`,
    fetchRomanceMovies:`/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    fetchDocumentaries:`/discover/movie?api_key=${API_KEY}&with_genres=99`,
    fetchHistory:`/discover/movie?api_key=${API_KEY}&with_genres=36`,
    fetchSciFi:`/discover/movie?api_key=${API_KEY}&with_genres=878`,
    fetchMyster:`/discover/movie?api_key=${API_KEY}&with_genres=9648`,
    fetchWestern:`/discover/movie?api_key=${API_KEY}&with_genres=37`,
    fetchThriller:`/discover/movie?api_key=${API_KEY}&with_genres=53`,
    fetchCrime:`/discover/movie?api_key=${API_KEY}&with_genres=80`,
    fetchFantasy:`/discover/movie?api_key=${API_KEY}&with_genres=14`,
    fetchDrama:`/discover/movie?api_key=${API_KEY}&with_genres=18`,
    fetchAnimated:`/discover/movie?api_key=${API_KEY}&with_genres=16`,
    fetchMusic:`/discover/movie?api_key=${API_KEY}&with_genres=10402`,
    fetchTVMovie:`/discover/movie?api_key=${API_KEY}&with_genres=10770`,
    fetchFamily:`/discover/movie?api_key=${API_KEY}&with_genres=10751`,
    fetchAdventure:`/discover/movie?api_key=${API_KEY}&with_genres=12`,
    fetchWar:`/discover/movie?api_key=${API_KEY}&with_genres=10752`,
}

export default  requests;
