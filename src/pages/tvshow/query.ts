export const fetchTVShowDetails = async (tvShowId: string) => {
    try {
        const res = await fetch(`https://api.themoviedb.org/3/tv/${tvShowId}?language=en-US`, {
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`            },
        });

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        console.log('Fetched TV show details:', data); // Check the response
        return data;
    } catch (error) {
        console.error('Error fetching TV show details:', error);
        throw error; // Re-throw the error to be caught by useQuery
    }
};
