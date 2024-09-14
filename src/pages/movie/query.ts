export const fetchMovieDetails = async (movieId: string) => {
    try {
        const res = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
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
        console.error('Error during login mutation:', error);
        throw error; // Re-throw the error to be handled by `useMutation`
    }
};