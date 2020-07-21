import React from 'react'
import './App.css'
import {auth} from './firebase'
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import TasksPage from './pages/TasksPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Navbar from './components/Navbar';


function App() {
  
  const [session, setSession] = React.useState(null)

  React.useEffect(() => {
    
    auth.onAuthStateChanged((user) => {
        user ? setSession(user) : setSession(null)
    })

    console.log(session);

  }, [session])

  return (
    <Router>
      <div className="container mt-5">
        <Navbar session={session} />
        <Switch>
          <Route path='/login' >
            <LoginPage />
          </Route>
          <Route path='/register' >
            <RegisterPage />
          </Route>
          <Route path='/tasks' >
            <TasksPage session={session} />
          </Route>
          <Route path='/' >
            { session ? <TasksPage session={session} /> : <LoginPage /> }
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
