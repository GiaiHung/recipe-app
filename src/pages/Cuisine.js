import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

import styled from 'styled-components'

import { motion } from 'framer-motion'
import Loading from '../components/Loading'

const Cuisine = () => {
    const [loading, setLoading] = useState(false)
    const [cuisine, setCuisine] = useState([])
    const params = useParams()

    const getSearch = async (name) => {
        const check = localStorage.getItem(`${params.type}`)
        if (check) {
            switch (params.type) {
                case 'italian': {
                    setCuisine(JSON.parse(check))
                }
                case 'chinese': {
                    setCuisine(JSON.parse(check))
                }
                case 'thai': {
                    setCuisine(JSON.parse(check))
                }
                case 'american': {
                    setCuisine(JSON.parse(check))
                }
            }
        } else {
            setLoading(true)
            const response = await fetch(`
            https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_ACCESSKEY}&cuisine=${name}
            `)
            const data = await response.json()
            setCuisine(data.results)
            localStorage.setItem(`${params.type}`, JSON.stringify(data.results))
            setLoading(false)
        }
    }

    useEffect(() => {
        getSearch(params.type)
    }, [params.type])

    if (loading) {
        return <Loading />
    }

    return (
        <>
            <Link to='/'>
                <HomeBtn>Back to home</HomeBtn>
            </Link>
            <Grid
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                transition={{ duration: 0.75 }}
            >
                {
                    cuisine.map(item => {
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

const Grid = styled(motion.div)`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    grid-gap: 2rem;
    text-align: center;
`

const Card = styled.div`
    img {
        width: min(400px, 100%);
        border-radius: 2rem;
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

export default Cuisine
