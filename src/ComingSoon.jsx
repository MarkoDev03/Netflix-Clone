import React, { useLayoutEffect, useState } from 'react'
import Footer from './Footer'
import Axios from "./axios";
import Requests from "./requests";
import HeaderTab from './HeaderTab';
import { Bell, ChevronRight, InfoCircle } from 'react-bootstrap-icons';
import Gener from './Gener'
import './comingsoon.css'
import Aos from 'aos'
import "aos/dist/aos.css"

function ComingSoon() {
  const base_image_url = "https://image.tmdb.org/t/p/original/";

    var [movies, setAllMovies] = useState([]);

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

          localStorage.setItem("allmovies",JSON.stringify(moviesIn))
          setAllMovies(localStorage.getItem("allmovies") ? JSON.parse(localStorage.getItem("allmovies")) : moviesIn);
        }
    
        FetchDataFromAPI();

    Aos.init({duration:2000})

      }, []);

      setTimeout(() => {
      setInterval(() => {

         movies.forEach((movie) => {
         if (document.getElementById(movie.id).offsetTop < document.getElementById("all-soon-movies").scrollTop + 97) {
            document.getElementById(movie.id).classList.add("overlay-soon")
            
         } else {
          document.getElementById(movie.id).classList.remove("overlay-soon")
         }
         })
        }, 100);
      }, 2000);
    return (
        <div className='application'>
          <HeaderTab headline="Coming soon" />
            <div className='notification-bar my'>
                <div className="left-notification">
                   <Bell size={24} color="white" style={{marginLeft:'-5px'}} />
                   <span>Notifications</span>
                </div>
                <ChevronRight size={24} color="white" style={{marginRight:'15px'}} />
            </div>
            { <div className="soon-wrapper" id="all-soon-movies">
                {
                    movies.map((movie) => (        
                        <div className='card-soon' id={movie.id}>
                 <img src={base_image_url + movie.backdrop_path} alt="" className="image-soon" />
                 <div className="data-soon-banner">
                     <div>
                     <h4 className="soon-name-banner"> {movie?.original_name ||movie?.original_title ||movie?.name ||movie?.title}</h4>
                     </div>
                     <div className="options-soon">
                             <div className="option-soon">
                        
                             <Bell className="soon-icon" />
                             <span className="icon-txr">Remind me</span>
                             </div>
                             <div className="option-soon">
                             <InfoCircle className="soon-icon" />
                             <span className="icon-txr">Remind me</span>
                             </div>
                     </div>
                 </div>
                 <div className="data-soon">
                 <span className="soon-time">
                       Coming November 19
                     </span>
                     <h3 className="soon-name"> {movie?.original_name ||movie?.original_title ||movie?.name ||movie?.title}</h3>
                     <span className="soon-desc">
                        {movie.overview}
                     </span>
                 <Gener />
                 </div>
             </div>
                      
                    ))
                }
            </div> }
          <Footer />
        </div>
    )
}

export default ComingSoon
