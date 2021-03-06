import React, { useState, useLayoutEffect } from "react";
import Axios from "./axios";
import "./Banner.css";
import Row from "./Row";
import Requests from "./requests";
import Buttons from "./Buttons";
import Logo from "./netflix-logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedo } from "@fortawesome/free-solid-svg-icons";
import './comingsoon.css'

function Banner({ title, fetchURL, isBannerInMiddle }) {
  const [movies, setMovies] = useState({genre_ids:[]});
  const [logo, setLogo] = useState("")
  const [genres, setGenres] = useState(["Horror", "Action", "Drama", "Western"]); 
  const [allMovies, setAllMovies] = useState([]);
  const [bannerMovies, setBannerMovies] = useState([]);
  //const [overview, setOverview] = useState("");

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
            ...data2.data.results,
            ...data1.data.results,
            ...data3.data.results,
            ...data4.data.results,
            ...data5.data.results,
            ...data6.data.results,
            ...data7.data.results,
            ...data8.data.results
          ];
    
          moviesIn = moviesIn.filter(
            (thing, index, self) =>
              index ===
              self.findIndex(
                (t) => t.poster_path === thing.poster_path && t.id === thing.id
              )
          );

          localStorage.setItem("allmovies", JSON.stringify(moviesIn))
          setAllMovies(localStorage.getItem("allmovies") ? JSON.parse(localStorage.getItem("allmovies")) : moviesIn);


          if (localStorage.getItem("bannerMovies")) { 
             let getLogos = JSON.parse(localStorage.getItem("bannerMovies"));

             setBannerMovies(getLogos)
             
           setMovies(
            getLogos[
                     Math.floor(Math.random() * getLogos.length)
                ]);
                // setOverview("")
                // setOverview(movies?.overview || "")
          } else {

           setMovies(
             moviesIn[
                      Math.floor(Math.random() * moviesIn.length)
                 ]);
                //  setOverview("")
                //  setOverview(movies?.overview || "")
                }
        }
    
        FetchDataFromAPI();

      }, []);

      const base_image_url = "https://image.tmdb.org/t/p/original";

      useLayoutEffect(() => {

        if (localStorage.getItem("bannerMovies")) {
          let getLogos = JSON.parse(localStorage.getItem("bannerMovies"));
          const item = getLogos.find((item) => item.id === movies?.id);
          if (item !== undefined) {
            setLogo(item.logo)
          }
        } else {
    
        fetch(`https://api.themoviedb.org/3/movie/${movies?.id}/images?api_key=1ac954f3a80a366794602b75222bbf8e`)
        .then((response) => response.json())
        .then((data) => {
         
         if (data?.logos?.length > 0) {
           setLogo(data?.logos[0].file_path)
          } else {
            setMovies(
              allMovies[
                Math.floor(Math.random() * allMovies.length)
              ]
            );
            // setOverview("")
            // setOverview(movies?.overview || "")
            return;
          }
          
         })
        }
      
      }, [movies, allMovies])

  useLayoutEffect(() => {
    async function getGeners() {
      const data = await Axios.get("https://api.themoviedb.org/3/genre/movie/list?api_key=1ac954f3a80a366794602b75222bbf8e&language=en-US");
    
      var resultGenres = []
      if (movies !== undefined) {
      if (movies?.genre_ids.length > 1) {
        data.data.genres.forEach((genre) => {
          movies.genre_ids.forEach((item) => {
            if ( +genre.id === +item) {
              resultGenres.push(genre.name)
            }
          })
        })
       } else {
        data.data.genres.forEach((genre) => {
            if ( +genre.id === +movies.genre_ids) {
              resultGenres.push(genre.name)
            }
        })
       }
      }
       setGenres(resultGenres)
    }
    
    getGeners()
  }, [movies?.genre_ids, movies])


   useLayoutEffect(() => {
    const getMoviesWithLogo = () => {
      let getResults = []
      if (!localStorage.getItem("bannerMovies")) {
      allMovies.forEach((movie) => {
        fetch(`https://api.themoviedb.org/3/movie/${movie.id}/images?api_key=1ac954f3a80a366794602b75222bbf8e`)
         .then((response) => response.json())
        .then((data) => {
     if (data?.logos.length > 0) {
        let dataFound = movie;
        dataFound.logo = data.logos[0].file_path;
        getResults.push(dataFound)
        localStorage.setItem("bannerMovies", JSON.stringify(getResults))
     }
    })
      })
    }
  }

   getMoviesWithLogo();

   }, [allMovies]);
  
   function fetchData() {

    setMovies(
      bannerMovies[
        Math.floor(Math.random() * bannerMovies.length)
      ]
    );
    // setOverview("")
    // setOverview(movies?.overview || "")

    try {
        document.getElementById('logo').classList.add("animatebannerlogo")
        document.getElementById('banner').classList.add("animatebanner")

        setTimeout(() => {
          document.getElementById('logo').classList.remove("animatebannerlogo")
          document.getElementById('banner').classList.remove("animatebanner")
        }, 300);
    } catch (error) {
       console.log(error);
    }
      setLogo(movies.logo)
  }

  return (
    <header
      className="banner"
      id="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movies?.backdrop_path}")`,
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* {!isBannerInMiddle ? <Navigation></Navigation> : ""} */}
      <div className={isBannerInMiddle ? "fade-top" : ""}></div>
      <div id="banner-content-id">
        <div className="banner_content" id="content">
          <div
            className={
              window.innerWidth < 900 && !isBannerInMiddle
                ? "banner-div mr-div"
                : "banner-div"
            }
          >

            {!isBannerInMiddle && logo === "" && logo === null && logo === undefined ? (
              <div className="n-series">
                <img src={Logo} alt="" className="n-logo" loading="lazy" crossOrigin="anonymous" />
                <p className="n-text">SERIES</p>
              </div>
            ) : (
              ""
            )}
            {
              logo !== "" && logo !== null && logo !== undefined ? (
                <img src={base_image_url + logo} alt="" className="logomoviesoonbanner" id="logo" loading="lazy" crossOrigin="anonymous" />
              ): (
                <h1
              className={
                !isBannerInMiddle && window.innerWidth < 900
                  ? "middle-title x-title"
                  : "banner_title mid-y"
              }
            >
              {movies?.title || movies?.name || movies?.original_name}
            </h1>
              )
          }
           {/* <span
            className={
              !isBannerInMiddle && window.innerWidth < 900
                ? "fade-none"
                : "movie_desc_banner"
            }
          >
            {overview} 
          </span> */}
          </div>
          <span className="genres-mapping mapbanner">
            {
                  genres !== [] ? (
                    
                    genres.map((genreItem, index) => (
                       <React.Fragment key={index}>{genreItem}<div className="red-dot-src-soon"></div></React.Fragment>
                      ))
                    
                  ): ""
                }
            </span>

          {window.innerWidth  > 900  ? ( 
          <Buttons
         movie={movies}
        classBtn={isBannerInMiddle? "align_left banner_buttons": "align_middle banner_buttons"}></Buttons>) :
         ""}
        </div>
      </div>
      <div className="swiper-original">
        {isBannerInMiddle ? (
          <Row title={title} fetchURL={fetchURL} key={1} ></Row>
        ) : (
          ""
        )}
        {!isBannerInMiddle && window.innerWidth > 900 ? (
          <Row title={title} fetchURL={fetchURL} key={1} ></Row>
        ) : (
          ""
        )}
      </div>

      <div
        className={
          !isBannerInMiddle && window.innerWidth < 900
            ? "fade--bottom new-fade"
            : "fade--bottom"
        }
      ></div>
      {!isBannerInMiddle && window.innerWidth < 900 ? (
        <div className="fade-geners">
          <Buttons classBtn="align_middle_btns banner_buttons b-mds" movie={movies}></Buttons>
        </div>
      ) : (
        ""
      )}
     
      <div className="movie-changer">
        <FontAwesomeIcon
          icon={faRedo} 
          className="refresh-icon"
          onClick={fetchData}
        ></FontAwesomeIcon>
        <button onClick={fetchData} className="change-movie">
          Change movie
        </button>
      </div> {
        window.innerWidth < 900 && !isBannerInMiddle ?
       (
       ""
       )
        : ""
      }
    </header>
  );
}
export default Banner;
