import { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './App.css';

export default function App() {
  function Categories() {
    return(
    <ol>
      <li></li>
      <li></li>
      <li></li>
    </ol>)
  }
  return (
    <main>
      <header className='advert'></header>

      <section className='logo'>
        <div className='menu'>
          <Container className='menu' fluid>
            <Row>
              <Col>Casino</Col>
            </Row>
          </Container>
        </div>
      </section>

      <section className='sidebar'>
        Categories
        <li>
          <Categories></Categories>
        </li>
      </section>

      <section className='content'></section>

      <footer></footer>
    </main>
  )
}