import React, { useState, useLayoutEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Search as SearchIcon } from 'react-bootstrap-icons';
import {
  faArrowLeft,
  faSortDown,
} from "@fortawesome/free-solid-svg-icons";
import { useHistory, Link } from "react-router-dom";
import { auth } from "./Firebase";
import Requests from "./requests";
import Axios from "./axios";
import Trailer from "./Trailer";
import "./search.css";
import "./App.css";
import "./list.css";

function Search() {
  const history = useHistory();
  var [movies, setAllMovies] = useState([]);
  var [results, setSearchResults] = useState([]);
  const [movie, setMovie] = useState("");
  const searchBar = useRef('')

  useLayoutEffect(() => {
    async function FetchDataFromAPI() {
      const data1 = await Axios.get(Requests.fetchDocumentaries);
      const data2 = await Axios.get(Requests.fetchCrime);
      const data3 = await Axios.get(Requests.fetchDrama);
      const data4 = await Axios.get(Requests.fetchHorrorMovies);
      const data5 = await Axios.get(Requests.fetchMyster);
      const data6 = await Axios.get(Requests.fetchNetflixOriginals);
      const data7 = await Axios.get(Requests.fetchRomanceMovies);
      const data8 = await Axios.get(Requests.fetchThriller);
      const data9 = await Axios.get(Requests.fetchTrending);
      const data10 = await Axios.get(Requests.fetchWar);
      const data11 = await Axios.get(Requests.fetchWestern);
      const data12 = await Axios.get(Requests.fetchHistory);
      const data13 = await Axios.get(Requests.fetchMusic);
      const data14 = await Axios.get(Requests.fetchSciFi);
      const data15 = await Axios.get(Requests.fetchActionMovies);
      const data16 = await Axios.get(Requests.fetchAdventure);
      const data17 = await Axios.get(Requests.fetchAnimated);
      const data18 = await Axios.get(Requests.fetchComedyMovies);
      const data19 = await Axios.get(Requests.fetchFantasy);
      var moviesIn = [];

      moviesIn = [
        ...data2.data.results,
        ...data1.data.results,
        ...data3.data.results,
        ...data4.data.results,
        ...data5.data.results,
        ...data6.data.results,
        ...data7.data.results,
        ...data8.data.results,
        ...data9.data.results,
        ...data10.data.results,
        ...data11.data.results,
        ...data12.data.results,
        ...data13.data.results,
        ...data14.data.results,
        ...data15.data.results,
        ...data16.data.results,
        ...data17.data.results,
        ...data18.data.results,
        ...data19.data.results,
      ];

      moviesIn = moviesIn.filter(
        (thing, index, self) =>
          index ===
          self.findIndex(
            (t) => t.poster_path === thing.poster_path && t.id === thing.id
          )
      );

      setAllMovies(moviesIn);
      setSearchResults([]);
    }

    FetchDataFromAPI();
  }, []);
  
function searchAPI() {
        var inputValue = searchBar.current.value;
        var input = new RegExp(inputValue, "i");
        var searchResults = [];
        movies.forEach(function (movie) {
          var term =
            movie?.title ||
            movie?.name ||
            movie?.original_title ||
            movie.original_name;
          if (term.search(input) !== -1 && inputValue.length > 0) {
            searchResults.push(movie);
          }
          if (inputValue.length < 1) {
            setSearchResults([]);
          }
        });
        searchResults = searchResults.filter(
          (thing, index, self) =>
            index ===
            self.findIndex(
              (t) => t.poster_path === thing.poster_path && t.id === thing.id
            )
        );
        setSearchResults(searchResults);
      }
      
 
  function MovieClick(movies) {

      setMovie(movies);
      console.log(movies)
    
  }

  return (
    <div className="component-div" style={{height:'100vh'}}>
      <header
        className="float-header"
        style={{ zIndex: "999999", opacity: "1", backgroundColor: "black" }}
      >
        <div className="flex">
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="Aee"
            onClick={() => {
              history.push("/home");
            }}
          ></FontAwesomeIcon>
        </div>
        <div className="user">
          <Link to={`/profile/${auth.currentUser.uid}/settings`}>
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
      </header>
      <div className="search-bar-wrpe">

      <div className="search-bar">
        <SearchIcon
  
          className="search-icon-search"
        />
        <input
          type="search"
          name=""
          id="search"
          placeholder="Search for a show, movie, gener, etc."
          autoComplete="off"
          ref={searchBar}
          onKeyUp={searchAPI}
        />
      </div>
      </div>
      <div className="list-div" style={{ marginTop: "125px" }}>
        <div className="list-wrapper" id="list">
          {results.map((item) => (
            <img
              src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
              alt=""
              className="movie"
              key={item.id}
              onClick={() => {MovieClick(item)}}
            />
          ))}
        </div>
      </div>
      {movie && <Trailer movies={movie}></Trailer>}
    </div>
  );
}

export default Search;
