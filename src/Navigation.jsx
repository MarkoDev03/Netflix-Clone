import React from "react";
import { Link } from "react-router-dom";
import "./nav.css";

function Navigation({classes}) {
    return (
      <header className={classes}>
        <Link to={`/browse/tv-shows`} className="linkhref">
          Tv Shows
        </Link>
        <Link to={`/browse/movies`} className="linkhref">
          Movies
        </Link>
        <Link to={`/browse/my-list`} className="linkhref">
          My List
        </Link>
      </header>
    );

}

export default Navigation;
