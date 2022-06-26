import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaPizzaSlice } from 'react-icons/fa'
import { GiChopsticks, GiNoodles, GiHamburger } from 'react-icons/gi'

import styled from 'styled-components'

const Category = () => {
    return (
        <List>
            <SLink to='cuisine/italian'>
                <FaPizzaSlice />
                <h4>Italian</h4>
            </SLink>
            <SLink to='cuisine/chinese'>
                <GiChopsticks />
                <h4>Chinese</h4>
            </SLink >
            <SLink to='cuisine/thai'>
                <GiNoodles />
                <h4>Thai</h4>
            </SLink>
            <SLink to='cuisine/american'>
                <GiHamburger />
                <h4>America</h4>
            </SLink>
        </List>
    )
}

const List = styled.div`
    display: flex;
    justify-content: center;
    text-align: center;
    color: #fff;
    margin: 2rem auto;
    gap: 1rem;

    svg {
        font-size: 2rem;
        cursor: pointer;
        color: #fff;
    }

    a {
        color: #fff;
    }

    @media screen and (max-width: 768px) {
        display: grid;
        grid-template-columns: repeat(2, minmax(100px, 1fr));
        place-items: center;
    }
`

const SLink = styled(NavLink)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    margin-right: 2rem;
    text-decoration: none;
    width: 6rem;
    height: 6rem;
    background: linear-gradient(35deg, #494949, #313131);
    cursor: pointer;

    &.active {
        background: linear-gradient(to right, #f27121, #e94057);
    }

    @media screen and (max-width: 768px) {
        margin-right: 0;
        width: 5rem;
        height: 5rem;
    }
`

export default Category
