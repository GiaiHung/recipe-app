import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Loading from './Loading'

import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css'
import styled from 'styled-components'

const Popular = () => {
    const [popular, setPopular] = useState([])
    const [loading, setLoading] = useState(false)

    const getPopular = async () => {
        setLoading(true)

        try {
            const check = localStorage.getItem('popular')
            if (check) {
                setPopular(JSON.parse(check))
            } else {
                const response = await fetch(`
                    https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_ACCESSKEY}&number=10
                `)
                const data = await response.json()
                setPopular(data.recipes)
                localStorage.setItem('popular', JSON.stringify(data.recipes))
            }
            setLoading(false)
        } catch (error) {
            console.log('error');
        }
    }

    useEffect(() => {
        getPopular()
    }, [])

    if (loading) return <Loading />

    return (
        <Wrapper>
            <h3>Trending</h3>
            <Splide
                options={{
                    perPage: 4,
                    arrows: false,
                    pagination: false,
                    drag: 'free',
                    gap: '5rem',
                    breakpoints: {
                        1024: {
                            perPage: 3,
                        },
                        768: {
                            perPage: 2,
                        },
                        560: {
                            perPage: 1,
                        }
                    }
                }}
            >
                {
                    popular.map(({ id, title, image }) => (
                        <SplideSlide key={id}>
                            <Card>
                                <Link to={`/recipe/${id}`}>
                                    <img src={image} alt={title} />
                                    <h4>{title}</h4>
                                    <Gradient />
                                </Link>
                            </Card>
                        </SplideSlide>
                    ))
                }
            </Splide>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    margin: 2rem auto;

    h3 {
        margin: 1rem 1rem;
    }
`

const Card = styled.div`
    min-height: 23rem;
    overflow: hidden;
    position: relative;

    img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        min-height: 23rem;
        object-fit: cover;
        border-radius: 2rem;
    }

    h4 {
        position: absolute;
        bottom: 5%;
        left: 50%;
        transform: translateX(-50%);
        color: #fff;
        z-index: 10;
        width: 90%;
    }
`

const Gradient = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
    z-index: 5;
    border-radius: 2rem;
`

export default Popular
