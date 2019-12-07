
import './App.css';
import React, { useState } from 'react'
import { BrowserRouter 
  as Router, Route, Link, Redirect, withRouter } from 'react-router-dom'
import { Container, Table, Form, Button, Message, Menu, Alert  } from 'semantic-ui-react'

import styled from 'styled-components'

/*const Button = styled.button`
  background: Bisque;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid Chocolate;
  border-radius: 3px;
`*/
const Input = styled.input`
  margin: 0.25em;
`
const Page = styled.div`
  padding: 1em;
  background: papayawhip;
`
  
const Home = () => (
  <div>
    <h2>TKTL notes app</h2>

    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  </div>
)

const Note = ({ note }) => {
  return (
    <div>
      <h2>{note.content}</h2>
      <div>{note.user}</div>
      <div><strong>{note.important ? 'important' : ''}</strong></div>
    </div>
  )
}

const Notes = (props) => (
  <div>
    <h2>Notes</h2>
    <Table striped celled>
      <Table.Body>
      {props.notes.map(note =>
        <Table.Row key={note.id}>
          <Table.Cell><Link to={`/notes/${note.id}`}>{note.content}</Link></Table.Cell>
          <Table.Cell>{note.user}</Table.Cell>
        </Table.Row>
      )}
      </Table.Body>
    </Table>
  </div>
)

const Users = () => (
  <div>
    <h2>TKTL notes app</h2>
    <ul>
      <li>Matti Luukkainen</li>
      <li>Juha Tauriainen</li>
      <li>Arto Hellas</li>
    </ul>
  </div>
)

let Login = (props) => {
  const onSubmit = (event) => {
    event.preventDefault()
    props.onLogin('pokumars')
    props.history.push('/')
  }

  return (
    <Form onSubmit={onSubmit}>
      <Form.Field>
        <label>username</label>
        <input name='username' />
      </Form.Field>
      <Form.Field>
        <label>password</label>
        <input type='password' />
      </Form.Field>
      <Button type='submit'>login</Button>
    </Form>
  )
}

Login = withRouter(Login)

const App = () => {
  const [notes, setNotes] = useState([
    {
      id: 1,
      content: 'HTML on helppoa',
      important: true,
      user: 'Matti Luukkainen'
    },
    {
      id: 2,
      content: 'Selain pystyy suorittamaan vain javascriptiä',
      important: false,
      user: 'Matti Luukkainen'
    },
    {
      id: 3,
      content: 'HTTP-protokollan tärkeimmät metodit ovat GET ja POST',
      important: true,
      user: 'Arto Hellas'
    }
  ])

  const [user, setUser] = useState(null) 
  const [message, setMessage] = useState(null)

  const login = (user) => {
    setUser(user)
    setMessage(`welcome ${user}`)
    setTimeout(() => {
      setMessage(null)
    }, 10000)
  }

  const noteById = (id) =>
    notes.find(note => note.id === Number(id))

  const padding = { padding: 5 }

  return (
    <Container>
      {(message &&
        <Message success>
          {message}
        </Message>
      )}
      <Router>
        {(message &&
          <Alert variant="success">
            {message}
          </Alert>)}
        <div>
          
          <Menu inverted>
            <Menu.Item link>
              <Link to="/">home</Link>
            </Menu.Item>
            <Menu.Item link>
              <Link to="/notes">notes</Link>
            </Menu.Item>
            <Menu.Item link>
              <Link to="/users">users</Link>
            </Menu.Item>
            <Menu.Item link>
              {user
                ? <em>{user} logged in</em>
                : <Link to="/login">login</Link>
              }
            </Menu.Item>
          </Menu>

          <Route exact path="/" render={() => <Home />} />
          <Route exact path="/notes" render={() => <Notes notes={notes} />} />
          <Route exact path="/notes/:id" render={({ match }) =>
            <Note note={noteById(match.params.id)} />}
          />
          <Route path="/users" render={() =>
            user ? <Users /> : <Redirect to="/login" />
          } />
          <Route path="/login" render={() =>
            <Login onLogin={login} />}
          />
        </div>
      </Router>
      <div>
        <br />
        <em>Note app, Department of Computer Science 2019</em>
      </div>
    </Container>
  )
}
  
export default App