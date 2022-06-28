import React from 'react'
import { GiKnifeFork } from 'react-icons/gi'
import { Link } from 'react-router-dom'

import styled from 'styled-components'

const Nav = () => {
    return (
        <NavBar>
            <GiKnifeFork />
            <Link to='/'>Delicious meals</Link>
        </NavBar>
    )
}

const NavBar = styled.nav`
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 1.5rem;
    font-size: 1.5rem;
    font-family: 'Lobster', cursive;

    svg {
        font-size: 2rem;
    }

    a {
        color: #313131;
    }
`

export default Nav
