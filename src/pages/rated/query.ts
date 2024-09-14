export const fetchRatedMovies = async () => {
    try {
        const res = await fetch(
            `https://api.themoviedb.org/3/guest_session/${localStorage.getItem("guest_session_id")}/rated/movies?language=en-US&page=1&sort_by=created_at.asc&api_key=${import.meta.env.VITE_API_KEY}`
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
        console.error('Error fetching rated movies:', error);
        throw error; // Re-throw the error to be handled by useQuery
    }
};

export const fetchRatedTvShows = async () => {
    try {
        const res = await fetch(
            `https://api.themoviedb.org/3/guest_session/${localStorage.getItem("guest_session_id")}/rated/tv?language=en-US&page=1&sort_by=created_at.asc&api_key=${import.meta.env.VITE_API_KEY}`
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
        console.error('Error fetching rated TV shows:', error);
        throw error; // Re-throw the error to be handled by useQuery
    }
};
