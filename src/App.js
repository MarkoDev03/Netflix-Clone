import React, { useLayoutEffect, useState } from "react";
import Login from "./Login";
import Profile from "./Profile";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import { auth, database } from "./Firebase";
import List from './List.jsx'
import Movies from './Movies.jsx'
import Search from './Search.jsx'
import Avatar from './Avatar'
import FastLaughts from './FastLaughts'
import CommingSoon from './ComingSoon'
import Downloads from './Downloads'
import "./App.css";

function App() {
  const [user, setUser] = useState(false);
  const [username, setUsername] = useState('')
  const [movies, setMovies] = useState([])
  
  useLayoutEffect(() => {
    const unsuscribed = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {

        setUser(true);
        setUsername(userAuth.uid);
        var allMovies = [];
        database
          .ref("list/" + auth.currentUser.uid + "/")
          .on("child_added", (snap) => {
            allMovies.push(snap.val());
          });

          database
          .ref("list/" + auth.currentUser.uid + "/")
          .on("child_removed", (snap) => {

            allMovies=[]
            allMovies.push(snap.val());
          });
          
        setMovies(allMovies);
      } else {
        setUser(false);
        setUsername('');
      }
    
    });

    return unsuscribed;
  }, []);

  return (
    <div className="App">
      <Router>
        {user === false ? (
          <Login />
        ) : (
          <Switch>
            <Route exact path="/">
              <Home user={username} />
            </Route> 
            <Route exact path="/home">
              <Home user={username} />
            </Route> 
            <Route exact path={`/profile/:uid/settings`}>
              <Profile />
            </Route> 
            <Route exact path="/login">
              <Login />
            </Route>   
            <Route exact path='/browse/my-list'>
              <List movies={movies} />
            </Route>
            <Route exact path='/browse/:gener'>
              <Movies username={username} />
            </Route>
            <Route exact path='/search' >
              <Search />
            </Route>
            <Route exact path='/profile/:email/change-avatar' >
              <Avatar />
            </Route>
            <Route exact path='/fastlaughts' >
              <FastLaughts />
            </Route>
            <Route exact path='/comingsoon' >
              <CommingSoon />
            </Route>
            <Route exact path='/downloads' >
              <Downloads />
            </Route>
          </Switch>
        )}
      </Router>
    </div>
  );
}

export default App;