import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import styled from 'styled-components'
import Loading from '../components/Loading'
import { motion } from 'framer-motion'

const Cuisine = () => {
    const { type } = useParams()
    const [cuisines, setCuisines] = useState([])
    const [loading, setLoading] = useState(false)

    const getCuisines = async () => {
        setLoading(true)

        try {
            const check = localStorage.getItem(type)

            if (check) {
                setCuisines(JSON.parse(check))
            } else {
                const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_ACCESSKEY}&cuisine=${type}`)
                const data = await response.json()
                setCuisines(data.results)
                localStorage.setItem(type, JSON.stringify(data.results))
            }

            setLoading(false)
        } catch (error) {
            console.log('error');
        }
    }

    useEffect(() => {
        getCuisines()
    }, [type])

    if (loading) return <Loading />

    return (
        <>
            <Link to='/'>
                <Button>Back to home</Button>
            </Link>
            <Grid
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                transition={{ duration: 0.75 }}
            >
                {
                    cuisines.map(({ id, title, image }) => (
                        <Card key={id}>
                            <img src={image} alt={title} />
                            <h4>{title}</h4>
                        </Card>
                    ))
                }
            </Grid>
        </>
    )
}

const Grid = styled(motion.div)`
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

export const Button = styled.button`
    margin: 1rem auto;
    padding: .75rem 1rem;
    border: none;
    border-radius: 2rem;
    background-color: blueviolet;
    color: #eee;
    font-weight: 500;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    font-size: 1.2rem;

    :hover {
        color: #fff;
        background-color: #3f39bd;
    }
`

export default Cuisine
