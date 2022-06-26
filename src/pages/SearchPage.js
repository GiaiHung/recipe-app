import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

import styled from 'styled-components'

const SearchPage = () => {
    const [searched, setSearched] = useState([])
    const params = useParams()

    const getSearched = async (name) => {
        const response = await fetch(`
        https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_ACCESSKEY}&query=${name}
        `)
        const data = await response.json()
        setSearched(data.results)
    }

    useEffect(() => {
        getSearched(params.search)
    }, [params.search])

    console.log(searched);

    return (
        <>
            <Link to='/'>
                <HomeBtn>Back to home</HomeBtn>
            </Link>
            <Grid>
                {
                    searched.map(item => {
                        const { id, title, image } = item
                        return (
                            <Card key={id}>
                                <Link to={`/recipe/${id}`}>
                                    <img src={image} alt={title} />
                                    <h4>{title}</h4>
                                </Link>
                            </Card>
                        )
                    })
                }
            </Grid>
        </>
    )
}

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    grid-gap: 2rem;
    text-align: center;
`

const Card = styled.div`
    img {
        width: min(400px, 100%);
        border-radius: 2rem;
        cursor: pointer;
    }

    h4 {
        text-align: center;
        padding: 1rem;
        color: #313131;
    }
`

const HomeBtn = styled.button`
    font-size: 1rem;
    background-color: #759612;
    padding: .75rem 1rem;
    border: none;
    color: #fff;
    margin: 2rem auto;
    display: flex;
    align-items: center;
    border-radius: 10px;
    cursor: pointer;
`

export default SearchPage
