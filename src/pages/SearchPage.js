import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Loading from '../components/Loading'

import { Button } from './Cuisine'

import styled from 'styled-components'

const SearchPage = () => {
    const { input } = useParams()
    const [search, setSearch] = useState([])
    const [loading, setLoading] = useState(false)

    const getSearch = async () => {
        setLoading(true)

        try {
            const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_ACCESSKEY}&query=${input}`)
            const data = await response.json()
            setSearch(data.results)
            setLoading(false)
        } catch (error) {
            console.log('error');
        }
    }
    console.log(search);

    useEffect(() => {
        getSearch()
    }, [input])

    if (loading) return <Loading />

    return (
        <>
            <Link to='/'>
                <Button>Back to home</Button>
            </Link>
            <Grid>
                {
                    search.map(({ id, title, image }) => (
                        <Card key={id}>
                            <Link to={`/recipe/${id}`}>
                                <img src={image} alt={title} />
                                <h4>{title}</h4>
                            </Link>
                        </Card>
                    ))
                }
            </Grid>
        </>
    )
}

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(368px, 1fr));
    gap: 1rem;
    margin: 2rem auto;
`

const Card = styled.div`
    border-radius: 2rem;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    img {
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        min-width: 20rem;
        border-radius: 2rem;
        object-fit: cover;
    }

    h4 {
        text-align: center;
        width: 90%;
        margin: auto;
    }

    @media screen and (max-width: 768px) {
        img {
            max-width: 18rem;
        } 
    }
`

export default SearchPage
