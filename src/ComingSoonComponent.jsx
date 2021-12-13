import React, { useLayoutEffect, useState } from 'react'
import { Bell, InfoCircle } from 'react-bootstrap-icons';
import Gener from './Gener'

function ComingSoonComponent({movie}) {
    const [logo, setLogo] = useState("")
    const base_image_url = "https://image.tmdb.org/t/p/original/";

    useLayoutEffect(() => {
     fetch(`https://api.themoviedb.org/3/movie/${movie.id}/images?api_key=1ac954f3a80a366794602b75222bbf8e&language=en-US&include_image_language=en,null`)
   .then((response) => response.json())
   .then((data) => {
    setLogo(data.logos[0].file_path)
   })
    }, [movie.id])

    return (
        <div className='card-soon' id={movie.id}>
        <img src={base_image_url + movie.backdrop_path} alt="" className="image-soon"
             loading="lazy"     
        />
        <div className="data-soon-banner">
          
          {
              logo !== "" && logo !== null && logo !== undefined ? (
                <img src={base_image_url + logo} alt="" className="logomoviesoon" loading="lazy" />
              ): (
                <h4 className="soon-name-banner"> {movie?.original_name ||movie?.original_title ||movie?.name ||movie?.title}</h4>
              )
          }
            
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
    )
}

export default ComingSoonComponent
