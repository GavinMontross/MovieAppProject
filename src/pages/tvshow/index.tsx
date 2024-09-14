import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Loader, Segment, Header, Grid, GridRow, Image, List, Label, Accordion, Card } from "semantic-ui-react";
import { fetchTVShowDetails } from "./query"

export const TvShow = () => {

    const { id } = useParams<string>();

    if (!id) {
        return <div>Invalid TVShow ID</div>;
    }

    const { data, isLoading } = useQuery({
        queryKey: ["tvShow", id], // Include ID in queryKey to differentiate between movies
        queryFn: () => fetchTVShowDetails(id),
    });

    // Wrap Loader in a container
    if (isLoading) {
        return (
            <Segment style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Loader active inline="centered" />
            </Segment>
        );
    }

    const seasonsPanels = data.seasons.map((season: any) => ({
        key: season.id,
        title: `Season ${season.season_number + 1}`,
        content: {
            content: (<Card style={{ height: "70px"}} meta={season.air_date} description={`${season.episode_count} episodes`}/>)
        }
    }))

    return (
        <div style={{ marginTop: 50 }}>
            <Segment>
                <Header>{data.name || "Unknown TV Show"}</Header> {/* Use `name` for TV shows */}
                <Grid columns={2} divided textAlign="left" style={{ marginTop: 20 }}>
                    <GridRow>
                        <Grid.Column width={6}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
                                <Image src={`https://image.tmdb.org/t/p/original/${data.poster_path}`} size="medium" centered />
                            </div>
                        </Grid.Column>
                        <Grid.Column width={10}>
                            <List>
                                <List.Item>
                                <List.Description>
                                    <List.Header>Created By: </List.Header>
                                    {data.created_by
                                    .map((creator: any) => creator.name)
                                    .join(", ") || "No creator listed"}
                                </List.Description>
                                </List.Item>
                                <List.Item>
                                    <List.Header>Genres: </List.Header>
                                    {data.genres?.map((genre: any) => <Label key={genre.id}>{genre.name}</Label>)}
                                </List.Item>
                                <List.Item>
                                    <List.Header>Episode Runtime: </List.Header>
                                    {data.episode_run_time.join(", ")} minutes
                                </List.Item>
                                <List.Item>
                                    <List.Header>First Air Date: </List.Header>
                                    {data.first_air_date}
                                </List.Item>
                                <List.Item>
                                    <List.Header>Production Companies: </List.Header>
                                    {data.production_companies?.map((company: any) => company.name).join(", ") || "N/A"}
                                </List.Item>
                                <List.Item>
                                    <List.Header>Number of Episodes: </List.Header>
                                    {data.number_of_episodes} {/* Use `first_air_date` for TV shows */}
                                </List.Item>
                                <List.Item>
                                    <List.Header>Number of Seasons: </List.Header>
                                    {data.number_of_seasons} {/* Use `first_air_date` for TV shows */}
                                </List.Item>

                                <List.Item>
                                    <List.Header>Seasons: </List.Header>
                                    <List.Description style={{height: "200px", overflowY: "scroll"}}>
                                        <Accordion defaultActiveIndex={0} panels={seasonsPanels} styled/>
                                    </List.Description>
                                </List.Item>

                                <List.Item>
                                    <List.Header>Networks: </List.Header>
                                {data.networks.map((network: any) => (
                                <Image key={network.id} src={`https://image.tmdb.org/t/p/original/${network.logo_path}`} size="tiny" style={{marginRight: 10}} />
                                 ))}
                                </List.Item>
                            </List>
                        </Grid.Column>
                    </GridRow>
                </Grid>
            </Segment>
        </div>
    );
};