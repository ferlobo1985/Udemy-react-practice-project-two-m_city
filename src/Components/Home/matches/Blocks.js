import React,{ useState, useEffect } from 'react';
import { Slide } from "react-awesome-reveal";
import { matchesCollection } from '../../../firebase';

const Blocks = () => {
    const [matches, seMatches ] = useState([])


    useEffect(()=>{
        if(!matches.length > 0){
            matchesCollection.get().then( snapshot => {
                const matches = snapshot.docs.map( doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                console.log(matches)

            }).catch(error => {
                console.log(error)
            })

        }
    },[matches])

    return(
        <div>
            hello
        </div>
    )



}

export default Blocks;