import React from 'react';
import styled from 'styled-components';

const H1 = styled.h1`
    text-align: center;
    margin: 30px;
    font-size: 80px;
    color: olive;
`;

const Homepage = () => {
    return (
        <div>
            <H1>Welcome to Dad Jokes!</H1>
        </div>
    )
}

export default Homepage;