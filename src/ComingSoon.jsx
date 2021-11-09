import React, { useLayoutEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import Footer from './Footer'
import Axios from "./axios";
import Requests from "./requests";
import HeaderTab from './HeaderTab';
import { Bell, ChevronRight } from 'react-bootstrap-icons';
import ComingSoonComponent from './ComingSoonComponent'
import "swiper/swiper.min.css";
import './comingsoon.css'

function ComingSoon() {

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

          setAllMovies(moviesIn);
        }
    
        FetchDataFromAPI();

      }, []);

    return (
        <React.Fragment>
          <HeaderTab headline="Coming soon" />
            <div className='notification-bar'>
                <div className="left-notification">
                   <Bell size={24} color="white" />
                   <span>Notifications</span>
                </div>
                <ChevronRight size={24} color="white" />
            </div>
            { <Swiper className="soon-wrapper">
                {
                    movies.map((movie) => (       
                           <SwiperSlide key={movie.id}>
                               <ComingSoonComponent movie={movie} />
                           </SwiperSlide>
                    ))
                }
            </Swiper> }
          <Footer />
        </React.Fragment>
    )
}

export default ComingSoon
