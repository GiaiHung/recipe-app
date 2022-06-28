import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

import styled from 'styled-components'

const SearchForm = () => {
    const [value, setValue] = useState('')
    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault()
        navigate(`/searched/${value}`)
    }

    return (
        <Form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder='Search...'
                value={value}
                onChange={e => setValue(e.target.value)}
            />
            <FaSearch />
        </Form>
    )
}

const Form = styled.form`
    position: relative;
    width: 70vw;
    max-width: 450px;
    margin: 1.5rem auto;
    border: none;

    input {
        padding: .75rem 1rem;
        border: none;
        border-bottom: 3px solid #313131;
        width: 100%;
        height: 100%;
    }

    svg {
        position: absolute;
        right: 3%;
        top: 50%;
        transform: translateY(-50%);
        font-size: 1.2rem;
        color: #6c6d70;
        border: none;
        background-color: transparent;
    }
`

export default SearchForm
