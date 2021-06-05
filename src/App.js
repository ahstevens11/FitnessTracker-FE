import './App.css';
import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Link, Switch, Route} from "react-router-dom"
import {default as MakeRoutine} from "./components/routines/MakeRoutine"
import {getToken, clearToken} from "./auth"
import{fetchUserData, fetchAllActivites} from "./api"
import {
  Login,
  Register,
  MyRoutines,
  Routines,
  Activities,
  Home
} from "./components"

const App = () => {
  const [authorized, setAuthorized] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [loggedIn, setLoggedIn] = useState(getToken());
  const [activities, setActivities] = useState(null);
  

  useEffect(async () => {
    if (loggedIn) {
        try {
            const data = await fetchUserData();
            setCurrentUser(data.username);
            const grabbedActivities = await fetchAllActivites();
            setActivities(grabbedActivities);

        } catch (error) {
            console.error(error);
        }
    }
  }, [loggedIn])

  return (
    <Router>
      <nav className="navBar">
        <h1>Fitness Tracker</h1>
        <div>
          <Link className="Link" to= '/'>Home</Link>
          <Link className="Link" to= '/routines'>Routines</Link>
          <Link className="Link" to= '/myRoutines'>My Routines</Link>
          <Link className="Link" to= '/activities'>Activites</Link>
          { !loggedIn ? (<Link className="Link" to= '/Login'>Login</Link>) : null}
          { !loggedIn ? (<Link className="Link" to= '/Register'>Sign Up</Link>) : null}
          {loggedIn ? <Link className="Link" onClick={() => {
                        clearToken();
                        //setUsername(null);
                        setLoggedIn(null);
                        setAuthorized(null)
                        setCurrentUser(null)
                    }}
                        to='/'>Log Out</Link> : null}
        </div>
      </nav>
      <main>
        <Switch>
          <Route exact path= '/'>
            <Home />
          </Route>
          <Route path='/Login'>
              <Login
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
                setCurrentUser={setCurrentUser}
                setAuthorized={setAuthorized}
                authorized={authorized}
              />
          </Route>
          <Route path='/Register'>
             <Register
             setAuthorized={setAuthorized} 
             loggedIn={loggedIn}
             setLoggedIn={setLoggedIn}
             /> 
          </Route>
          <Route path='/routines'>
            <Routines />
          </Route>
          <Route path='/myRoutines'>
             <MyRoutines 
             loggedIn={loggedIn}
             currentUser={currentUser}
             activities={activities}
          setActivities={setActivities}
              />
          </Route>
          <Route path='/activities'>
          <Activities
             loggedIn={loggedIn}
             currentUser={currentUser}
             activities={activities}
             setActivities={setActivities}
              />
          </Route>
          <Route path='/createRoutine'>
            <MakeRoutine />
          </Route> 
        </Switch>  
      </main>
    </Router>
  );
}

export default App;