import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

const SCJoke = styled.p`
    margin: 20px;
    font-size: 20px;
`;

const H2 = styled.h2`
    font-size: 40px;
    color: olive;
    margin: 20px 0 10px 20px;
`;

class Jokes extends React.Component {
    state = {
        jokes: [],
        loggedIn: false
    }

    async componentDidMount() {
        const endpoint = `${process.env.REACT_APP_API_URL}/api/jokes`;

        try {
            const token = localStorage.getItem('jwt');
            const requestOptions = {
                headers: {
                    authorization: token
                }
            };
            const response = await axios.get(endpoint, requestOptions);
            console.log(response);

			this.setState({ jokes: response.data, loggedIn: true });
        } catch (error) {
            console.log('we ran into an issue getting the jokes');
        };
    }

    render() {

        if (this.state.loggedIn === true) {
            return (
                <div>
                    <H2>List of Dad Jokes</H2>

                    {this.state.jokes.map(joke => (
                        <SCJoke key={joke.id}>-{joke.joke}</SCJoke>
                    ))}
                </div>
            );
        } else {
            return (
                <H2>Please log in to view the data jokes</H2>
            )
        }
    };
};

export default Jokes;