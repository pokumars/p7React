import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom'


const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote =>
         <li key={anecdote.id} >
           <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
         </li>)}
    </ul>
  </div>
)

const Anecdote = ({ anecdote }) => {
  return (
    <>
      <p>{anecdote.content}</p>
      <p><b>{anecdote.author}</b></p>
      <p><a href={`${anecdote.info}`} >more info</a></p>
      <p>votes {anecdote.votes}</p>
    </>
  )
}


const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Notification = (props) => {
  if(props.message === null) {
    return null
  }
  const notificationStyle = {
    color: 'blue',
    background: 'lightgrey',
    fontSize: 15,
    borderStyle: 'solid',
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10
  }

  return (
    <div style={notificationStyle}>
      <p>{props.message}</p>
    </div>
  )
}


const Footer = () => (
  <div>
    Learning about react router and other things. by Github user:
    <a href='https://github.com/pokumars'>pokumars</a>
    </div>
)

const CreateNewReroute = (props) => {
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')


  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content,
      author,
      info,
      votes: 0
    })
    notify(`added "${content}" `, 10000)
    
    props.history.push('/anecdotes')
  }
  const notify= (message, time) => {
    props.makeNotification(message, time)
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <div>
          author
          <input name='author' value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div>
          url for more info
          <input name='info' value={info} onChange={(e) => setInfo(e.target.value)} />
        </div>
        <button>create</button>
      </form>
    </div>
  )

}
const CreateNew = withRouter(CreateNewReroute)

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('')

  const makeNotification = (theMessage, theTime) => {
    setNotification(theMessage);

    setTimeout(() => {
      setNotification(null)
    },theTime)
  }

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }
  const padding = { padding: 5 }

  return (
    <Router>
      <div>
        <div>
          <Link to="/anecdotes" style={padding}>anecdotes</Link>
          <Link to="/about" style={padding} >about</Link>
          <Link to="/create" style={padding}>create new</Link>

          <h1>Software anecdotes</h1>
          <Notification message={notification} />
        </div>
        <Route exact path="/anecdotes" render={() => <AnecdoteList anecdotes={anecdotes} />}/>
        <Route path="/about" render={() => <About />}/>
        <Route path="/create" render={() => <CreateNew addNew={addNew}
        makeNotification={makeNotification} />}/>
        <Route path="/anecdotes/:id" render={({ match }) =>
          <Anecdote anecdote={anecdoteById(match.params.id)}/>}/>
        <div>

        </div>
        <Footer />
      </div>
    </Router>
  )
}

export default App;