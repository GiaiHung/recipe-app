import { BrowserRouter, Link } from 'react-router-dom'
import { GiKnifeFork } from 'react-icons/gi'

import styled from 'styled-components'

import Category from "./components/Category"
import SearchForm from './components/SearchForm'
import Pages from "./pages/Pages"

const App = () => {
  return (
    <BrowserRouter>
      <Nav>
        <GiKnifeFork />
        <Logo to='/'>
          Delicious Foods
        </Logo>
      </Nav>
      <SearchForm />
      <Category />
      <Pages />
    </BrowserRouter>
  )
}

const Nav = styled.nav`
  padding: 2rem 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  svg {
    font-size: 2rem;
  }
`;

const Logo = styled(Link)`
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 400;
  font-family: "Lobster Two", cursive;
  color: #313131;
  margin-left: 1.5rem;
`;

export default App
