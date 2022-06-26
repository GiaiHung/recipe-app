import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

import styled from 'styled-components'

const SearchForm = () => {
    const [input, setInput] = useState('')
    const navigate = useNavigate()

    const handleSubmit = e => {
        e.preventDefault()
        navigate(`/searched/${input}`)
        setInput('')
    }

    return (
        <FormStyle onSubmit={handleSubmit}>
            <div>
                <button type='submit'>
                    <FaSearch />
                </button>
                <input
                    type="text"
                    placeholder='Search foods...'
                    value={input}
                    onChange={e => setInput(e.target.value)}
                />
            </div>
        </FormStyle>
    )
}

const FormStyle = styled.form`
    width: 70vw;
    max-width: 500px;
    margin: 2rem auto;
    border-radius: 2rem;

    div {
        position: relative;
    }

    input {
        width: 100%;
        border-radius: 2rem;
        background: linear-gradient(35deg, #494949, #313131);
        text-transform: capitalize;
        color: #aaa;
        padding: .75rem 1.2rem;
        border: none;
        border-bottom: #999 3px solid;
    }

    input::placeholder {
        color: #aaa;
        text-transform: capitalize;
    }

    button {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 3%;
        color: #fff;
        cursor: pointer;
        background-color: transparent;
        border: none;
    }
`

export default SearchForm
