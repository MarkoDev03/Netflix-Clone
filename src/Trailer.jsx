import React, { useState, useLayoutEffect, useReducer } from "react";
import "./Trailer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCheck, faPlus,faChevronDown,faPlayCircle,faThumbsDown,faThumbsUp,faChevronUp,faTimes,faDownload,faPlay,faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import Nseries from "./netflix-logo.png";
import { auth, database } from "./Firebase";

const geners = [
  { text: "Drama", class: "grey" },
  { text: "·", class: "dot" },
  { text: "Comedy", class: "grey" },
  { text: "·", class: "dot" },
  { text: "Action", class: "grey" },
  { text: "·", class: "dot" },
  { text: "Horror", class: "grey" },
];

const base_image_url = "https://image.tmdb.org/t/p/original/";

function Trailer({movies}) {

  // const movies = movie;

  const closeTrailer = () => {
   
    setTimeout(() => {
      setMoviesTrailer("");
    }, 300);
    setPayload(false)
    
    var data = []
      
      auth.onAuthStateChanged((user) => {
        database.ref("search-history/" + user.uid).on('child_added', (snap) => {
         data.push(snap.val())
        })
      })
      
     setTimeout(() => {
       localStorage.setItem("search-history",JSON.stringify(data))
      }, 1000);
 
  document.getElementById("trailer").classList.add('none')

  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "like": 
        return {like: state.like = true, dislike: state.dislike = false}
      case "dislike":
        return {like: state.like = false, dislike: state.dislike = true}
      default:
        return  {like: state.like = false, dislike: state.dislike = false}
    }
  }

  const [state, dispatch] = useReducer(reducer, {like: false, dislike:false});

  const [movieTrailer, setMoviesTrailer] = useState("");
  const [loadtext, setLoad] = useState(false);
  const [list, setList] = useState(false);
  const [payload, setPayload] = useState(false);
  const [logo, setLogo] = useState(null);

  useLayoutEffect(() => {
    if (movies === "") {
      //setMoviesTrailer("");

    } else {
      setMoviesTrailer(movies);
      setPayload(true)
      var user = auth.currentUser;
      var ids = [];

      fetch(`https://api.themoviedb.org/3/movie/${movies.id}/images?api_key=1ac954f3a80a366794602b75222bbf8e`)
      .then((response) => response.json())
      .then((data) => {
       
       if (data?.logos?.length > 0) {
         setLogo(data.logos[0].file_path)
        }
      })

      if (user) {
        database.ref("list/" + user.uid + "/").on("child_added", (snapshot) => {
          if (parseInt(snapshot.val().id) === movies.id) {
            ids.push(snapshot.val().id);
          }
        });
        for (const id of ids) {

          if (id === movies.id) {
            setList(true);
          } else {
            setList(false);
          }
        }
      }
    }
  },[movies]);

  window.addEventListener("load", () => {});

  const addToList = () => {
    var user = auth.currentUser;

    if (user) {
      database.ref("list/" + user.uid + "/" + movieTrailer.id).set(movieTrailer);
      setList(true);
    }
  };

  const removeFromList = () => {
    var user = auth.currentUser;

    if (user) {
      database
        .ref("list/" + user.uid + "/")
        .child(movieTrailer.id)
        .remove();
      setList(false);
    }
  };

  const addText = (idText) => {
    let textOverview = document.getElementById(idText);
    setLoad(true);
    textOverview.classList.replace("overview-ttt", "overview-a");
  };

  const removeText = (idText) => {
    let textOverview = document.getElementById(idText);
    setLoad(false);
    textOverview.classList.replace("overview-a", "overview-ttt");
  };

  return (
    <div className={payload === false ? "none" : "overlay"} style={movies === "" ? {display:'none'}:{display:'flex'}} >
      {movieTrailer ==="" ? "" : (
      <div
        className={payload === false ? "none bn" : "bn  trailer show"}
        style={{  position: "fixed" }}
        id="trailer"
      >
      {window.innerWidth > 900 ? 
      (
        <div className='pc-tr' >
          <div
            style={{
              backgroundImage: `url(${base_image_url + movieTrailer.backdrop_path})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              height: "300px",
              width: "100%",
            }}
            className="poster-100 "
          >
            <FontAwesomeIcon
              icon={faTimes}
              className="icon play close-x"
              onClick={closeTrailer}
            ></FontAwesomeIcon>
            <div className="N-series">
              <img src={Nseries} alt="" className="N-S" />
            </div>
            {/*  */}
            {
              logo == null ? (<h3 className="movie-headline-trailer">
              {movieTrailer?.original_name ||
                movieTrailer?.original_title ||
                movieTrailer?.name ||
                movieTrailer?.title}
            </h3>): (
                <img src={base_image_url + logo} alt="" className="logo-movie" loading="lazy" crossOrigin="anonymous" />
              )
            }
            <div className="fade-img"></div>
          </div>
          <div className="bar">
            <div className="options">
              <FontAwesomeIcon
                icon={faPlayCircle}
                className="icon play"
              ></FontAwesomeIcon>
              <div>
                {list ? (
                  <div onClick={removeFromList}>
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="icon block-item"
                    ></FontAwesomeIcon>
                  </div>
                ) : (
                  <div onClick={addToList}>
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="icon block"
                    ></FontAwesomeIcon>
                  </div>
                )}
              </div>
              <div>
                {
                  state.like ? (
                  <div onClick={()=> {dispatch({type:''})}}>
                      <FontAwesomeIcon
                    icon={faThumbsUp}
                    className="icon block-item"
                  ></FontAwesomeIcon>
                  </div>
                  ):(
                    <div onClick={()=> {dispatch({type:'like'})}}>
                       <FontAwesomeIcon
                  icon={faThumbsUp}
                  className="icon block"
                  ></FontAwesomeIcon>
                    </div>
                  )
                }
              </div>
             
              <div>
                {
                  state.dislike?
                  (
                      <div  onClick={() => {dispatch({type:''})}}>
                        <FontAwesomeIcon
                icon={faThumbsDown}
                className="icon block-item"
              ></FontAwesomeIcon>
                      </div>
                  )
                  :
                  (
                    <div onClick={() => {dispatch({type:'dislike'})}}>
                      <FontAwesomeIcon
                icon={faThumbsDown}
                className="icon block"
              ></FontAwesomeIcon>
                    </div>
                  )
                }
              </div>
            </div>
            <div
              id={movieTrailer.backdrop_path}
              onClick={() => {
                !loadtext
                  ? addText(movieTrailer.poster_path)
                  : removeText(movieTrailer.poster_path);
              }}
            >
              {loadtext ? (
                <FontAwesomeIcon
                  icon={faChevronUp}
                  className="icon block i-r aniat"
                ></FontAwesomeIcon>
              ) : (
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="icon block i-r aniat"
                ></FontAwesomeIcon>
              )}
            </div>
          </div>
          <div className="options">
            <h4 className="vote">{movieTrailer.vote_average} Average vote</h4>
            <h4 className="grey dark-grey">
              {movieTrailer.adult === true ? "16+" : "All years"}
            </h4>
            <h4 className="grey year">
              {movieTrailer.release_date?.substring(0, 4)}
            </h4>
          </div>
          <p className="overview-ttt" id={movieTrailer.poster_path}>
            {movieTrailer.overview}
          </p>
          <div
            className="options"
            style={{ marginLeft: "10px", height: "40px", marginTop: "-10px" }}
          >
            {geners.map((item, index) => (
              <p className={item.class} key={index}>
                {item.text}
              </p>
            ))}
          </div>
        </div>
      )

      :
      (
        <div className={payload === false ? " none  mobi-trailer" : 'show mobi-trailer'} 
        style={movieTrailer === "" ? {display:'none'}:{display:'flex'}}
        >
         <header className='mobi-header'>
        <div className='mobi-header-left'>
        <p className="mobi-headline">
              {movieTrailer?.original_name ||
                movieTrailer?.original_title ||
                movieTrailer?.name ||
                movieTrailer?.title}
            </p>
            <span>2021 &nbsp;&nbsp;16+ &nbsp;&nbsp; Limited series </span>
        </div>
            <FontAwesomeIcon
              icon={faTimes}
              className="mobi-close"
              onClick={closeTrailer}
            ></FontAwesomeIcon>
         </header>
         <main className='main-div'>
              <img src={`${base_image_url}${movieTrailer.poster_path}`} alt="" className='image-mobi' />
              <p className='overview-mobi'>{movieTrailer.overview}</p>
         </main>
         <section className='section-mobi'>
             <button className='mobi-play'>
               
             <FontAwesomeIcon
                      icon={faPlay}
                      className='play-mobi'
                    ></FontAwesomeIcon>
               Play</button>
             <div className='add-tolist-div mx-2'> 
                {list ? (
                  <div onClick={removeFromList}>
                    <FontAwesomeIcon
                      icon={faCheck}
                      className=" block-removed"
                    ></FontAwesomeIcon>
                  </div>
                ) : (
                  <div onClick={addToList}>
                    <FontAwesomeIcon
                      icon={faPlus}
                      className=" block-removed"
                    ></FontAwesomeIcon>
                  </div>
                )}
                <span className='desc-span'>Add to list</span>
              </div>
              <div className='add-tolist-div mx-2'> 
              
                    <FontAwesomeIcon
                      icon={faDownload}
                      className="block-removed "
                    ></FontAwesomeIcon>
               
               
                <span className='desc-span mb-y'>Download</span>
              </div>
         </section>
         <footer className='mobi-footer'>
         <FontAwesomeIcon
                      icon={faInfoCircle}
                      className="block-removed"
                    ></FontAwesomeIcon>
               
                   <span>Episodes & info</span>
         </footer>
        </div>
      )

      }
      </div>
      )}
    </div>
  );
}

export default Trailer;
