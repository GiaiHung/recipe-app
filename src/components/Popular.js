import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import styled from 'styled-components'

import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/splide/dist/css/themes/splide-default.min.css'

const mainURL = 'https://api.spoonacular.com/recipes/random'
const key = `?apiKey=${process.env.REACT_APP_ACCESSKEY}`
const number = `&number=10`

const Popular = () => {
    const [popular, setPopular] = useState([])

    useEffect(() => {
        getPopular()
    }, [])

    const getPopular = async () => {
        const check = localStorage.getItem("popular")

        if (check) {
            setPopular(JSON.parse(check));
        } else {
            const resp = await fetch(
                `${mainURL}${key}${number}`
            );
            const data = await resp.json();
            setPopular(data.recipes);
            localStorage.setItem("popular", JSON.stringify(data.recipes));
        }
    }

    return (
        <Wrapper>
            <h3>Random Picks</h3>
            <Splide
                options={{
                    perPage: 4,
                    arrows: false,
                    pagination: false,
                    drag: "free",
                    gap: "5rem",
                    breakpoints: {
                        1024: {
                            perPage: 3
                        },
                        767: {
                            perPage: 2
                        },
                        640: {
                            perPage: 1
                        },
                    },
                }}
            >
                {popular.map(({ title, id, image }) => (
                    <SplideSlide key={id}>
                        <Link to={`/recipe/${id}`}>
                            <Card>
                                <p>{title}</p>
                                <img src={image} alt={title} />
                                <Gradient />
                            </Card>
                        </Link>
                    </SplideSlide>
                ))}
            </Splide>
        </Wrapper>
    )
}

const Wrapper = styled.section`
    margin: 4rem 0;
`;

const Card = styled.div`
overflow: hidden;
min-height: 23rem;
position: relative;
img {
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 2rem;
}
p {
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 0);
    color: #fff;
    width: 100%;
    height: 40%;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
}
`;

const Gradient = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
  z-index: 3;
  border-radius: 2rem;
`;

export default Popular
