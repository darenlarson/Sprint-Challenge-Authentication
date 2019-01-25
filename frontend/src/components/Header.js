import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const SCHeader = styled.header`
  display: flex;
  background: olive;
  padding: 20px 0;
  justify-content: space-between;
`;
const SCNav = styled.nav`
  display: flex;
`;
const Logo = styled.div`
  font-size: 30px;
  color: olive;
  background: white;
  width: 150px;
  text-align: center;
  margin-left: 20px;
`;
const StyledLink = styled(NavLink)`
    color: white;
    border: 1px solid white;
    padding: 5px;
    font-size: 20px;
    text-decoration: none;
    margin: 0 10px;
    font-family: system-ui;
    /* width: 125px; */
    text-align: center;
    :hover {
        background: white;
        color: olive;
    }
`;
const SCButton = styled.button`
    color: white;
    border: none;
    background: none;
    border: 1px solid white;
    font-size: 20px;
    margin: 0 10px;
    padding: 5px;
    /* width: 125px; */
    text-align: center;
    :hover {
        cursor: pointer;
        background: white;
        color: olive;
    }
`;

class Header extends React.Component {

    signout = event => {
        event.preventDefault();
        localStorage.removeItem('jwt')
        this.props.history.push('/');
      }

    render() {
        return (
            <SCHeader>
                <Logo>Dad Jokes!</Logo>
                <SCNav>
                    <StyledLink to="/signin">Log in</StyledLink>
                    <StyledLink to="/signup">Register</StyledLink>
                    <StyledLink to="/jokes">Jokes</StyledLink>
                    <SCButton onClick={this.signout}>Log out</SCButton>
                </SCNav>
            </SCHeader>
        )
    }
}

export default Header;