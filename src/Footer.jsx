import React from 'react'
import { NavLink } from 'react-router-dom'
import { HouseDoor, CollectionPlay, EmojiSmile, ArrowDownCircle } from 'react-bootstrap-icons';
import './footer.css'

function Footer() {

    const StyleSheet1 = {
        position:'fixed',
        bottom:'0px',
        zIndex:999999999999
    }

    const icons = 
    [
        {icon:<HouseDoor size={23}  />, text:"Home", route:"/home"},
        {icon:<CollectionPlay size={23}  />, text:"Coming Soon", route:"/comingsoon"},
        {icon:<EmojiSmile size={23} />, text:"Fast Laughts", route:"/fastlaughts"},
        {icon:<ArrowDownCircle size={23}  />, text:"Downloads", route:"/downloads"},
    ]

    return (
        <React.Fragment>
            <footer className='footer' style={StyleSheet1}>
                {
                    icons.map((link) => (
                         <NavLink
                           key={link.route}
                           to={link.route}
                           activeClassName='active-fill'
                           className='block-footer'
                         >
                           {link.icon}
                           <span>
                               {link.text}
                           </span>
                         </NavLink>
                    ))
                }
            </footer>
        </React.Fragment>
    )
}

export default Footer
