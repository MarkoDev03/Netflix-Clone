import React, { useState, useLayoutEffect } from "react";
import Row from "./Row";
import Requests from "./requests";
import Banner from "./Banner";
import Footer from "./Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faArrowLeft,faRss,faSortDown} from "@fortawesome/free-solid-svg-icons";
import { Search } from 'react-bootstrap-icons';
import { useHistory, Link, useParams } from "react-router-dom";
import {auth} from './Firebase'
import "./App.css";
import "./list.css";

function Movies({ username }) {
  const { gener } = useParams();
  const [headline, setHeadline] = useState("");
  const history = useHistory();

  useLayoutEffect(() => {
    switch (gener) {
      case "tv-shows":
        setHeadline("TV Shows");
        break;
      case "movies":
        setHeadline("Movies");
        break;
      case "new&popular":
        setHeadline("New&Popular");
        break;
      default:
        setHeadline("404");
        break;
    }
  }, [gener]);

  function setBannerMovies(gener) {
   if (gener === "tv-shows") {
       return (
          <Banner
            fetchURL={Requests.fetchFamily}
            title="Family TV Shows"
          ></Banner>
        );
   } else if (gener === "movies") {
       return (
            <Banner
                fetchURL={Requests.fetchCrime}
                title="Crime Movies"
              ></Banner>
       )
   } else if (gener === "new&popular") {
   return (
    <Banner
    fetchURL={Requests.fetchDrama}
    title="Drama Movies and Tv Shows"
  ></Banner>
   )
   }
      
  }

  return (
    <div className="App">
      <header className="float-header" style={{ zIndex: "999999" }}>
        <div className="flex">
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="Aee"
            onClick={() => {
              history.push("/home");
            }}
          ></FontAwesomeIcon>
          <p className="headline" style={{ fontSize: "21px" }}>
            {headline}
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
      {setBannerMovies(gener)}
      <Row
        title="Netflix Original"
        fetchURL={Requests.fetchNetflixOriginals}
        key={1}
        isLaregeRow
      ></Row>
      <Row title="Trending Now" fetchURL={Requests.fetchTrending} key={2}></Row>
      <Row
        title="Mystery Movies and Shows"
        fetchURL={Requests.fetchMyster}
        key={11}
      ></Row>
      <Row
        title="Only on Netflix"
        fetchURL={Requests.fetchNetflixOriginals}
        key={15}
        isOnlyOnNetflix
      ></Row>
      <Row
        title="Top 10 in Serbia Today"
        fetchURL={Requests.fetchTopRated}
        key={3}
        isTopTen
        isLaregeRow
      ></Row>
      <Row
        title="Western Movies and Shows"
        fetchURL={Requests.fetchWestern}
        key={11}
      ></Row>
      <Row
        title="Action Movies and Shows"
        fetchURL={Requests.fetchActionMovies}
        key={4}
      ></Row>
      <Row
        title="Horror Movies and Shows"
        fetchURL={Requests.fetchHorrorMovies}
        key={5}
      ></Row>
      <Row
        title="Comedy Movies and Shows"
        fetchURL={Requests.fetchComedyMovies}
        key={5}
      ></Row>
      <Row
        title="Romance Movies and Shows"
        fetchURL={Requests.fetchRomanceMovies}
        key={7}
      ></Row>
      <Row
        title="Documentaries"
        fetchURL={Requests.fetchDocumentaries}
        key={8}
      ></Row>
      <Row
        title="History Movies and Shows"
        fetchURL={Requests.fetchHistory}
        key={9}
      ></Row>
      <Row
        title="Sci-Fi Movies and Shows"
        fetchURL={Requests.fetchSciFi}
        key={10}
      ></Row>
      <Row
        title="Thriller Movies and Shows"
        fetchURL={Requests.fetchThriller}
        key={12}
      ></Row>
      <Row
        title="Crime Movies and Shows"
        fetchURL={Requests.fetchCrime}
        key={13}
      ></Row>
      <Row
        title="Fantasy Movies and Shows"
        fetchURL={Requests.fetchFantasy}
        key={14}
      ></Row>
      <Row title="Animated" fetchURL={Requests.fetchAnimated} key={16}></Row>
      <Row title="Music" fetchURL={Requests.fetchMusic} key={17}></Row>
      <Row
        title="TV Movies and Shows"
        fetchURL={Requests.fetchTVMovie}
        key={18}
      ></Row>
      <Row title="Drama" fetchURL={Requests.fetchDrama} key={19}></Row>
      <Row
        title="Family Movies and Shows"
        fetchURL={Requests.fetchFamily}
        key={20}
      ></Row>
      <Row
        title="Adventure Movies"
        fetchURL={Requests.fetchAdventure}
        key={21}
      ></Row>
      <Row
        title="War Movies and Shows"
        fetchURL={Requests.fetchWar}
        key={22}
      ></Row>
       <div style={{width:'1px',height:'85px'}}></div>
       <Footer />
    </div>
  );
}

export default Movies;
