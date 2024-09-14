export const fetchMovies = async () => {
    try {
        const res = await fetch(
            "https://api.themoviedb.org/3/movie/popular?language=en-USpage=1",
            {
                headers: {
                    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`},
            }
        );

        // Ensure the response is ok before proceeding
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        // Parse the response body as JSON
        const data = await res.json();

        // Log and return the data
        console.log(data);
        return data;

    } catch (error) {
        console.error('Error during login mutation:', error);
        throw error; // Re-throw the error to be handled by `useMutation`
    }
};

export const fetchTVShows = async () => {
    try {
        const res = await fetch(
            "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1", // Updated endpoint and added '&page=1'
            {
                headers: {
                    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`                },
            }
        );

        // Ensure the response is ok before proceeding
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        // Parse the response body as JSON
        const data = await res.json();

        // Log and return the data
        console.log(data);
        return data;

    } catch (error) {
        console.error('Error fetching top-rated TV shows:', error);
        throw error; // Re-throw the error to be handled by `useQuery` or other hooks
    }
};

