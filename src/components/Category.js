import React from 'react'
import { NavLink } from 'react-router-dom'
import { GiHamburger, GiChopsticks, GiSushis } from 'react-icons/gi'
import { FaPizzaSlice } from 'react-icons/fa'

import styled from 'styled-components'

const Category = () => {
    return (
        <Grid>
            <SLink to='/cuisine/american'>
                <GiHamburger />
                <h4>American</h4>
            </SLink>
            <SLink to='/cuisine/chinese'>
                <GiChopsticks />
                <h4>Chinese</h4>
            </SLink>
            <SLink to='/cuisine/vietnamese'>
                <GiSushis />
                <h4>Vietnamese</h4>
            </SLink>
            <SLink to='/cuisine/italian'>
                <FaPizzaSlice />
                <h4>Italian</h4>
            </SLink>
        </Grid>
    )
}

const Grid = styled.div`
    margin: 1.5rem auto;
    width: 80vw;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    place-items: center;
    font-size: .8rem;
    color: #fff;

    svg {
        font-size: 2rem;
    }

    @media screen and (max-width: 768px) {
        display: grid;
        grid-template-columns: 1fr 1fr;
        max-width: 450px;
    }
`

const SLink = styled(NavLink)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: .75rem;
    width: 6rem;
    height: 6rem;
    background-color: #fce043;
    background-image: linear-gradient(315deg, #fce043 0%, #fb7ba2 74%);
    color: #fff;
    border-radius: 50%;

    &.active {
        background-color: #ff4e00;
        background-image: linear-gradient(315deg, #ff4e00 0%, #ec9f05 74%);
    }
`

export default Category
