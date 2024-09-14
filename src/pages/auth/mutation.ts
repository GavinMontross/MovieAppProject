export const mutationLogin = async () => {
    try {
        const res = await fetch(
            "https://api.themoviedb.org/3/authentication/guest_session/new",
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
