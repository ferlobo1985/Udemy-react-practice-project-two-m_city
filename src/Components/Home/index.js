import React from 'react';
import Featured from './featured';
import MatchesHome from './matches';

const Home = () => {
    return(
        <div className="bck_blue">
            <Featured/>
            <MatchesHome/>
        </div> 
    )
}

export default Home;