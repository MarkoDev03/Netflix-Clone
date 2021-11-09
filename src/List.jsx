import "./list.css";
import React, { useLayoutEffect, useState } from "react";
import { auth, database } from "./Firebase";
import Trailer from "./Trailer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faArrowLeft,faRss,faSortDown,} from "@fortawesome/free-solid-svg-icons";
import { Search } from 'react-bootstrap-icons';
import { useHistory, Link } from "react-router-dom";
import "./Navbar.css";

export default function List({ movies }) {
  const [movie, setMovie] = useState("");
  const [username, setUsername] = useState("");

  const history = useHistory();

  useLayoutEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUsername(user.uid);
    });
  }, []);

  database
    .ref("list/" + auth.currentUser.uid + "/")
    .on("child_removed", (snap) => {
      setTimeout(() => {
        document.getElementById(snap.val().id).style.display = "none";
      }, 1000);
    });

  function MovieClick(movies) {
 
      setMovie(movies);
    
  }

  return (
    <div className="list">
      <header className="float-header">
        <div className="flex">
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="Aee"
            onClick={() => {
              history.push("/home");
            }}
          ></FontAwesomeIcon>
          <p className="headline" style={{ fontSize: "21px" }}>
            My List
          </p>
        </div>
        <div className="right-hand">
        <FontAwesomeIcon icon={faRss} style={{opacity:'0'}} />
          <Search size={24} color='white'  onClick={() => {
              history.push("/search");
            }}/>
          <div className="user">
            <Link to={`/profile/${username}/settings`}>
              <img
                src={auth.currentUser.photoURL}
                className="whoswathcing"
                width={30}
                height={30}
                alt=""
              />
            </Link>
            <FontAwesomeIcon icon={faSortDown} className="switch" />
          </div>
        </div>
      </header>
      <div className="list-div">
        <div className="list-wrapper" id="list">
          {movies.map((item) => (
            <img
              src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
              alt=""
              className="movie"
              key={item.id}
              id={item.id}
              onClick={() => {
                MovieClick(item);
              }}
            />
          ))}
        </div>
      </div>
      {movie && <Trailer movies={movie}></Trailer>}
    </div>
  );
}
