export const rateMovie = async (movieId: number, rating: number) => {
    try {
        const res = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}/rating?guest_session_id=${localStorage.getItem("guest_session_id")}&api_key=${import.meta.env.VITE_API_KEY}`, // Removed extra space
            {
                method: "POST",
                headers: {
                    accept: "application/json",
                    "content-type": "application/json;charset=utf-8", // Fixed typo
                },
                body: JSON.stringify({ value: rating }), // Simplified to use JSON.stringify
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

export const rateTvShow = async (tvShowId: number, rating: number) => {
    try {
        const res = await fetch(
            `https://api.themoviedb.org/3/tv/${tvShowId}/rating?guest_session_id=${localStorage.getItem("guest_session_id")}&api_key=${import.meta.env.VITE_API_KEY}`, // Ensure no extra spaces in URL
            {
                method: "POST",
                headers: {
                    accept: "application/json",
                    "content-type": "application/json;charset=utf-8", // Fixed typo
                },
                body: JSON.stringify({ value: rating }), // Simplified body format
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
        console.error('Error during rating TV show:', error);
        throw error; // Re-throw the error to be handled by `useMutation`
    }
};

