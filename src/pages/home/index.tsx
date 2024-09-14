import { useState } from "react";
import { Button } from "semantic-ui-react";
import { ColumnDisplay } from "./column-display";
import { fetchMovies, fetchTVShows } from './query';
import { useQuery } from "@tanstack/react-query";
import { Navigate } from 'react-router-dom'

export enum DisplayType {
    Movies = "movies",
    TvShows = "tvshows",
}

export const Home = () => {
    const [displayType, setDisplayType] = useState<DisplayType>(DisplayType.Movies); // Set a default value

    const { data: movieData, isLoading: isLoadingMovies } = useQuery({
        queryKey: ["movies"],
        queryFn: fetchMovies
    });

    const { data: tvShowData, isLoading: isLoadingTVShows } = useQuery({
        queryKey: ["tvshows"],
        queryFn: fetchTVShows
    });

    if (localStorage.getItem("guest_session_id") == null) {
        return <Navigate to="/auth" />
    }

    return (
        <div style={{ marginTop: 50, height: "auto" }}>
            <Button.Group>
                <Button
                    color={displayType === DisplayType.Movies ? "red" : undefined}
                    onClick={() => setDisplayType(DisplayType.Movies)}
                >
                    Movies
                </Button>
                <Button
                    color={displayType === DisplayType.TvShows ? "red" : undefined}
                    onClick={() => setDisplayType(DisplayType.TvShows)}
                >
                    TV Shows
                </Button>
            </Button.Group>

            {isLoadingMovies || isLoadingTVShows ? (
                <div>Loading...</div>
            ) : (
                <div style={{ marginTop: 20 }}>
                    {displayType === DisplayType.Movies ? (
                        <ColumnDisplay data={movieData.results} displayType={DisplayType.Movies} />
                    ) : (
                        <ColumnDisplay data={tvShowData.results} displayType={DisplayType.TvShows} />
                    )}
                </div>
            )}
        </div>
    );
};
