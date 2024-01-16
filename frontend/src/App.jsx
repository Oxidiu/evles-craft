import React from 'react'
import Header from "./components/Header.jsx"
import {Container} from 'react-bootstrap'
import Footer from './components/Footer.jsx'
import { Outlet } from 'react-router-dom'
const App = () => {
  return (
    <>
      <Header/>
      <main>
        <Container>
          <Outlet/>
        </Container>
      </main>
      <Footer/>
    </>
  )
}

export default App
