import {Avatar} from '@material-ui/core';
import React, { useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import './Sidebar.css'; 
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

function Sidebar() {

    const user = useSelector(selectUser); 

    const [showClick,setShowClick] = useState(false);
    const [expand,setExpand] = useState(false);

    const [matchs, setMatchs] = useState(window.matchMedia("(max-width: 870px)").matches)

    useEffect(() => {
        const handler = (e) => setMatchs( e.matches );
        window.matchMedia("(max-width: 870px)").addListener(handler);
    }, []);

    const recentItem = (topic) => (
        <div className="sidebar__recentItem">
            <span className="sidebar__hash">#</span>
            {topic}
        </div>
    );

    return (
        <div className='sidebar'>
            <div className="sidebar__top">
                <img src="https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569__480.jpg" alt="" />
                <Avatar src={user.photoUrl} className='sidebar__avatar' style={{width: '75px', height: '75px'}}>{user.email[0]}</Avatar>
                <h2>{user.name}</h2>
                <h4>{user.email}</h4>
            </div>

            <div>
                {!expand &&
                    <div className="showMoreLess__button">
                        <button className="clickShow__button" onClick={() => {
                                setShowClick(!showClick)
                                setExpand(!expand)
                            }}>
                            Show more 
                            <ExpandMoreIcon className="expandMore__icon"/>
                        </button >
                    </div>
                }
            </div>

            <div>
                {(showClick || !matchs) && 
                    <section>
                        <div className="sidebar__stats">
                            <div className="sidebar__stat">
                                <p>Who viewed you</p>
                                <p className="sidebar__statNumber">4,532</p> 
                            </div> 
                            <div className="sidebar__stat">
                                <p>Views on post</p>
                                <p className="sidebar__statNumber">2,532</p>  
                            </div>
                        </div>
                        <div className="sidebar__bottom">
                            <p>Recent</p>
                            {recentItem('React')}
                            {recentItem('Python')}
                            {recentItem('Express')}
                            {recentItem('Java')}
                            {recentItem('Flutter')}
                        </div>
                    </section>
                }
            </div>

            <div>
                {expand &&
                    <div className="showMoreLess__button">
                        <button className="clickShow__button" onClick={() => {
                                setShowClick(!showClick)
                                setExpand(!expand)
                            }}>
                            Show less
                            <ExpandLessIcon className="expandMoreLess__icon"/>
                        </button >
                    </div>
                }
            </div>
            
        </div>
    )
}

export default Sidebar
