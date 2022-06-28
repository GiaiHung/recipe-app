import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import Loading from '../components/Loading'
import { motion } from 'framer-motion'

const Recipe = () => {
    const { name } = useParams()
    const [activeTab, setActiveTab] = useState('instructions')
    const [recipe, setRecipe] = useState({})
    const [loading, setLoading] = useState(false)

    const getRecipe = async () => {
        setLoading(true)
        try {
            const response = await fetch(`https://api.spoonacular.com/recipes/${name}/information?apiKey=${process.env.REACT_APP_ACCESSKEY}`)
            const data = await response.json()
            setRecipe(data)
            setLoading(false)
        } catch (error) {
            console.log('error');
        }
    }

    useEffect(() => {
        getRecipe()
    }, [name])

    if (loading) return <Loading />

    const { title, image, instructions, summary, extendedIngredients } = recipe

    return (
        <Flex>
            <h3>{title}</h3>
            <img src={image} alt={title} />
            <Info>
                <div className='btn-container'>
                    <Button
                        className={activeTab === 'instructions' ? 'active' : ''}
                        onClick={() => setActiveTab('instructions')}
                    >
                        Instructions
                    </Button>
                    <Button
                        className={activeTab === 'ingredients' ? 'active' : ''}
                        onClick={() => setActiveTab('ingredients')}
                    >
                        Ingredients
                    </Button>
                </div>
                {activeTab === 'instructions' &&
                    <motion.div
                        animate={{ opacity: 1 }}
                        initial={{ opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h4 dangerouslySetInnerHTML={{ __html: instructions }}></h4>
                        <h4 dangerouslySetInnerHTML={{ __html: summary }}></h4>
                    </motion.div>}
                {activeTab === 'ingredients' &&
                    <motion.ul
                        animate={{ opacity: 1 }}
                        initial={{ opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {
                            extendedIngredients.map(({ id, original }) => (
                                <li key={id}>{original}</li>
                            ))
                        }
                    </motion.ul>}
            </Info>
        </Flex>
    )
}

const Flex = styled.div`
    margin: 2rem auto;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    justify-content: center;

    .btn-container {
        width: 450px;
        margin: auto;
        display: flex;
        gap: 1rem;
        justify-content: space-around;
        align-items: center;
    }

    img {
        min-width: 23rem;
        object-fit: cover;
        border-radius: 2rem;
    }

    h4 {
        margin: auto;
        width: 80vw;
        max-width: 900px;
        font-weight: 300;
        font-size: 1.5rem;
    }

    .active {
        background-color: #313131;
        color: #fff;
    }

    @media screen and (max-width: 876px) {
        img {
            max-width: 17rem;
        }

        h3 {
            font-size: 1rem;
        }

        .btn-container {
            font-size: 1rem;
        }
    }
`

const Info = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    font-size: 1.2rem;

    li {
        list-style-type: disc;
        font-weight: 300;
        font-size: 1.5rem;
    }

    @media screen and (max-width: 876px) {
        li {
            width: 80vw;
            margin: auto;
            font-size: 1rem;
        }

        h4 {
            font-size: 1rem;
        }
    }
`

const Button = styled.div`
    padding: 0.75rem 1rem;
    color: #313131;
    background-color: transparent;
    border: 2px solid #313131;
    border-radius: 2rem;
    cursor: pointer;
`

export default Recipe
