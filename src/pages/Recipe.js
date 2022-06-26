import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

import styled from 'styled-components'
import Loading from '../components/Loading'

const Recipe = () => {
  const { id } = useParams()
  const [info, setInfo] = useState({})
  const [activeTab, setActiveTab] = useState('instructions')
  const [loading, setLoading] = useState(false)

  const getInfo = async () => {
    setLoading(true)
    try {
      const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.REACT_APP_ACCESSKEY}`)
      const data = await response.json()
      setInfo(data)
      setLoading(false)
    } catch (error) {
      console.log('error');
    }
  }

  useEffect(() => {
    getInfo()
  }, [id])

  if (loading) {
    return (
      <Loading />
    )
  }

  const { id: idInfo, image, title, summary, instructions, extendedIngredients } = info

  return (
    <RecipeWrapper key={idInfo} >
      <Link to='/'>
        <HomeBtn>Back to home</HomeBtn>
      </Link>
      <div>
        <h4>{title}</h4>
        <img src={image} alt={title} />
      </div>
      <Info>
        <div className="btn-container">
          <Button
            className={activeTab === 'instructions' ? 'active' : ''}
            onClick={() => setActiveTab('instructions')}>
            Instructions
          </Button>
          <Button
            className={activeTab === 'ingredients' ? 'active' : ''}
            onClick={() => setActiveTab('ingredients')}>
            Ingredients
          </Button>
        </div>
        {activeTab === 'instructions' && <div>
          <h3 dangerouslySetInnerHTML={{ __html: summary }}></h3>
          <br />
          <h3 dangerouslySetInnerHTML={{ __html: instructions }}></h3>
        </div>}
        <br />
        {activeTab === 'ingredients' && <ul>
          {
            extendedIngredients.map(ingredient => {
              const { id, original } = ingredient
              return (
                <li key={id}>
                  {original}
                </li>
              )
            })
          }
        </ul>}
      </Info>
    </RecipeWrapper >
  )
}

const RecipeWrapper = styled.div`
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  width: 90vw;
  max-width: 1080px;

  img {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    min-height: 15rem;
    object-fit: cover;
    border-radius: 2rem;
  }

  h4 {
    text-align: center;
    font-size: 2.5rem;
    margin: 2rem auto;
  }

  h3 {
    font-size: 1.5rem;
    font-weight: 300;
  }

  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: #fff;
  }

  a {
    color: blueviolet;
  }

  ul {
    list-style-type: disc;
    font-size: 1.75rem;
    font-weight: 300;
  }

  @media screen and (max-width: 900px) {
    img {
      max-width: 350px;
    }

    h4 {
      font-size: 1.5rem
    }

    h3 {
      font-size: 1rem;
    }

    ul {
      font-size: 1rem;
    }
  }
`;

const Info = styled.div`
  margin-left: 5rem;

  .btn-container {
    display: flex;
  }

  @media (max-width: 1068px) {
    margin-top: 1rem;
    margin-left: 1rem;
  }
`;

const Button = styled.button`
  margin: 1rem;  
  font-size: 3vmin;
  padding: .75rem 1rem;
  border-radius: 1.5rem;
  color: linear-gradient(35deg, #494949, #313131);
  background-color: transparent;
  border: 2px solid #313131;
  cursor: pointer
`;

const HomeBtn = styled.button`
    font-size: 1rem;
    background-color: #759612;
    padding: .75rem 1rem;
    border: none;
    color: #fff;
    margin: 1rem auto;
    display: flex;
    align-items: center;
    border-radius: 10px;
    cursor: pointer;
`

export default Recipe
