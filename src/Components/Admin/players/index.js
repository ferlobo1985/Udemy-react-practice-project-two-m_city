import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../Hoc/AdminLayout';

import { playersCollection } from '../../../firebase';
import { Button } from '@material-ui/core';

const AdminPlayers = () => {
    const [lastVisible,setLastVisible] = useState(null);
    const [loading,setLoading]= useState(false);
    const [players,setPlayers] = useState(null);


    useEffect(()=>{
        if(!players){
            setLoading(true);
            playersCollection
            .limit(2)
            .get()
            .then(snapshot => {
                const lastVisible = snapshot.docs[snapshot.docs.length -1];
                const players = snapshot.docs.map(doc=>({
                    id:doc.id,
                    ...doc.data()
                }));
                setLastVisible(lastVisible);
                setPlayers(players)
            }).catch(error=>{
                console.log(error)
            }).finally(()=>{
                setLoading(false)
            })

        }
    },[players]);


    const loadMorePlayers = () => {
        if(lastVisible){
            setLoading(true);
            playersCollection
            .startAfter(lastVisible)
            .limit(2)
            .get()
            .then( snapshot =>{
                const lastVisible = snapshot.docs[snapshot.docs.length -1];
                const newPlayers = snapshot.docs.map(doc=>({
                    id:doc.id,
                    ...doc.data()
                }));

                setLastVisible(lastVisible);
                setPlayers([...players,...newPlayers]);
            }).catch(error=>{
                console.log(error)
            }).finally(()=>{
                setLoading(false)
            })


        } else {
            console.log('nothing to load')
        }

    }


    console.log(players)
    console.log(lastVisible)

    return(
        <AdminLayout title="The players">
            

            <Button
                onClick={()=> loadMorePlayers()}
            >
                Load more
            </Button>

        </AdminLayout>
    )
}

export default AdminPlayers;