import React from 'react'
import { faBell, faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Gener from './Gener'

function ComingSoonComponent({movie}) {

    const base_image_url = "https://image.tmdb.org/t/p/original/";
    return (
        <React.Fragment>
             <div className='card-soon'>
                 <img src={base_image_url + movie.backdrop_path} alt="" className="image-soon" />
                 <div className="data-soon-banner">
                     <div>
                     <h4 className="soon-name-banner"> {movie?.original_name ||movie?.original_title ||movie?.name ||movie?.title}</h4>
                     </div>
                     <div className="options-soon">
                             <div className="option-soon">
                             <FontAwesomeIcon
                                icon={faBell}
                                className="soon-icon"
                             ></FontAwesomeIcon>
                             <span className="icon-txr">Remind me</span>
                             </div>
                             <div className="option-soon">
                             <FontAwesomeIcon
                                icon={faInfoCircle}
                                className="soon-icon"
                             ></FontAwesomeIcon>
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
        </React.Fragment>
    )
}

export default ComingSoonComponent
