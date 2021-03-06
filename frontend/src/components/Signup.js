import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    justify-content: center;
    margin: 50px;
`;
const FormWrapper = styled.div`
    background: olive;
    color: white;
    width: 500px;
    padding: 50px;
    h2 {
        margin: 5px;
    }
    form {
        display: flex;
        flex-direction: column;
    }
    input {
        margin: 5px;
        width: 300px;
        line-height: 2;
        border-radius: 5px;
    }
    button {
        width: 70px;
        margin: 5px;
    }
`;

class Signup extends React.Component {
    state = {
        username: '',
        password: ''
    }

    handleInputChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();
        const endpoint = `${process.env.REACT_APP_API_URL}/api/register`;
        const loginEndpoint = `${process.env.REACT_APP_API_URL}/api/login`;

        axios
            .post(endpoint, this.state)
            .then(res => {
                axios
                    .post(loginEndpoint, { username: this.state.username, password: this.state.password })
                    .then(res => {
                        localStorage.setItem('jwt', res.data.token);
                        this.props.history.push('/jokes');
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    };
    
    render() {
        return (
            <Container>
                <FormWrapper>
                    <h2>Create a username and password</h2>
                    <form onSubmit={this.handleSubmit} >
                        <input placeholder="username" name="username" value={this.state.username} type="text" onChange={this.handleInputChange} />
                        <input placeholder="password" name="password" value={this.state.password} type="password" onChange={this.handleInputChange} />
                        <button type="submit">Sign Up!</button>
                    </form>
                </FormWrapper>
            </Container>
        );
    };
};

export default Signup;