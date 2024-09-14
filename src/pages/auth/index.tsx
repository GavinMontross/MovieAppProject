import { Grid, Header, Form, Segment, Button } from 'semantic-ui-react';
import { useMutation } from '@tanstack/react-query';
import { mutationLogin } from './mutation';
import { useNavigate } from 'react-router-dom';

export const Auth = () => {
    // Use the hook inside the component
    const navigate = useNavigate();

    // useMutation with the mutation function
    const { mutate } = useMutation({
        mutationKey: ["login"],
        mutationFn: mutationLogin,
        onSuccess: (data) => {
            if (data && data.guest_session_id) {
                localStorage.setItem('guest_session_id', data.guest_session_id);
                navigate("/"); // Use navigate here
            } else {
                console.error('guest_session_id is not defined in the response');
            }
        },
        onError: (error) => {
            console.error('Error during login mutation:', error);
        }
    });

    const handleLogin = async () => {
        mutate();
    };

    return (
        <Grid textAlign="center" verticalAlign='middle' style={{ height: "100vh" }}>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as="h2" color="red" textAlign="center">
                    Welcome! Login by registering as a guest below.
                </Header>
                <Form size="large">
                    <Segment stacked>
                        <Button color="red" size="large" fluid onClick={handleLogin}>
                            Login
                        </Button>
                    </Segment>
                </Form>
            </Grid.Column>
        </Grid>
    );
};
