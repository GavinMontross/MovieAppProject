import { Container, Header, Menu, Segment, Loader } from "semantic-ui-react";
import { DisplayType } from "../home";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchRatedMovies, fetchRatedTvShows } from "./query";
import { ColumnDisplay } from "../home/column-display";
import { Navigate } from "react-router-dom";

export const Rated = () => {
    const [activeTabs, setActiveTabs] = useState<string>(DisplayType.Movies);

    // Fetch rated movies
    const { data: ratedMovies, isLoading: isLoadingRatedMovies } = useQuery({
        queryKey: ["ratedMovies"],
        queryFn: fetchRatedMovies,
    });

    // Fetch rated TV shows
    const { data: ratedTvShows, isLoading: isLoadingRatedTvShows } = useQuery({
        queryKey: ["ratedTvShows"],
        queryFn: fetchRatedTvShows,
    });

    // Handle loading states
    if (isLoadingRatedMovies || isLoadingRatedTvShows) {
        return (
            <Container style={{ marginTop: 50 }}>
                <Loader active inline="centered" />
            </Container>
        );
    }

    if (localStorage.getItem("guest_session_id") == null) {
        return <Navigate to="/auth" />
    }

    return (
        <Container style={{ marginTop: 50 }}>
            <Menu pointing secondary>
                <Menu.Item
                    name="Movies"
                    active={activeTabs === DisplayType.Movies}
                    onClick={() => setActiveTabs(DisplayType.Movies)}
                />
                <Menu.Item
                    name="TV Shows"
                    active={activeTabs === DisplayType.TvShows}
                    onClick={() => setActiveTabs(DisplayType.TvShows)}
                />
            </Menu>

            <Segment>
                {activeTabs === DisplayType.Movies ? (
                    <div>
                        <Header as="h2">Rated Movies</Header>
                        {ratedMovies?.results?.length > 0 ? (
                            <ColumnDisplay data={ratedMovies.results} displayType={DisplayType.Movies} isRated />
                        ) : (
                            <p>No rated movies found.</p>
                        )}
                    </div>
                ) : (
                    <div>
                        <Header as="h2">Rated TV Shows</Header>
                        {ratedTvShows?.results?.length > 0 ? (
                            <ColumnDisplay data={ratedTvShows.results} displayType={DisplayType.TvShows} isRated/>
                        ) : (
                            <p>No rated TV shows found.</p>
                        )}
                    </div>
                )}
            </Segment>
        </Container>
    );
};
