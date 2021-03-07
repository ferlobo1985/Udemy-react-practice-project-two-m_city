import React,{ useEffect, useReducer, useState } from 'react';
import { showErrorToast } from '../Utils/tools';

import { CircularProgress } from '@material-ui/core';
import { matchesCollection } from '../../firebase';

import LeagueTable from './tables';
import MatchesList from './matchesList';

const TheMatches = () => {
    const [matches, setMatches ] = useState(null);

    useEffect(()=>{
        if(!matches){
            matchesCollection.get().then(snapshot => {
                const matches = snapshot.docs.map(doc=>({
                    id: doc.id,
                    ...doc.data()
                }));
                setMatches(matches)
            }).catch(error => {
                showErrorToast(error)
            })
        }
    },[matches])

    return(
        <>
            { matches ?
                <div className="the_matches_container">
                    <div className="the_matches_wrapper">
                        <div className="left">
                        list
                        </div>
                        <div className="right">
                            <LeagueTable/>
                        </div>
                    </div>
                </div>
        
            :
                <div className="progress">
                    <CircularProgress/>
                </div>
            }

            
        </>
    )

} 

export default TheMatches;