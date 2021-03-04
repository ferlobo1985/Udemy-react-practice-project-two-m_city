import React,{ useState } from 'react';
import { easePolyOut } from 'd3-ease';
import  { Animate } from 'react-move';

const Test = () => {
    const [show,setShow] = useState(true);
    const [bck,setBck] = useState('#ffffff')

    return(
        <>
            <Animate
                show={show}
                start={{
                    backgroundColor:bck,
                    width:500,
                    height:500,
                    opacity:0
                }}
                enter={{
                    backgroundColor:bck,
                    width:[100],
                    height:[100],
                    opacity:[1],
                    timing:{
                        duration:1000,
                        dalay:1000,
                        ease:easePolyOut
                    }
                }}
                update={{

                }}
                leave={{
                    
                }}
            >
                { ({ width,height,opacity,backgroundColor })=> (
                    <div
                        style={{
                            backgroundColor,
                            opacity,
                            width,
                            height
                        }}
                    >
                        hello
                    </div>
                )}
            </Animate> 
        </>
    )
}

export default Test;