import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Loader, Segment, Header, Grid, GridRow, Image, List, Label } from "semantic-ui-react";
import { fetchMovieDetails } from "./query";

export const Movie = () => {

    const { id } = useParams<string>();

    if (!id) {
        return <div>Invalid Movie ID</div>;
    }

    const { data, isLoading } = useQuery({
        queryKey: ["movie", id], // Include ID in queryKey to differentiate between movies
        queryFn: () => fetchMovieDetails(id),
    });

    // Wrap Loader in a container
    if (isLoading) {
        return (
            <Segment style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Loader active inline="centered" />
            </Segment>
        );
    }

    return (
        <div style={{ marginTop: 50 }}>
            <Segment>
                <Header>{data.title}</Header>
                <Grid columns={2} divided textAlign="left" style = {{marginTop: 20}}>
                    <GridRow>
                        <Grid.Column width={6}>
                            <div style={{display: "flex", alignItems: "center", justifyContent: "center", height: "100%"}}>
                                <Image src={`https://image.tmdb.org/t/p/original/${data.poster_path}`} size="medium" centered/>
                            </div>
                        </Grid.Column>
                        <Grid.Column width={10}>
                            <List>
                                <List.Item>
                                    <List.Header>Budget: </List.Header>
                                        {`$${data.budget.toLocaleString()}`}
                                </List.Item>
                                <List.Item>
                                    <List.Header>Genres: </List.Header>
                                    {data.genres.map((genre: any) => <Label key={genre.id}> {genre.name} </Label>)}
                                </List.Item>
                                <List.Item>
                                    <List.Header>IMDB ID: </List.Header>
                                    {data.imdb_id}
                                </List.Item>
                                <List.Item>
                                    <List.Header>Production Companies: </List.Header>
                                    {data.production_companies.map((company: any) => company.name)
                                    .join(", ")}
                                </List.Item>
                                <List.Item>
                                    <List.Header>Release Date: </List.Header>
                                    {data.release_date}
                                </List.Item>
                                <List.Item>
                                    <List.Header>Revenue: </List.Header>
                                    {`$${data.revenue.toLocaleString()}`}
                                </List.Item>
                                <List.Item>
                                    <List.Header>Runtime: </List.Header>
                                    {data.runtime} minutes
                                </List.Item>
                                <List.Item>
                                    <List.Header>Language: </List.Header>
                                    {data.original_language}
                                </List.Item>
                            </List>
                        </Grid.Column>
                    </GridRow>
                </Grid>
            </Segment>
        </div>
    );
};