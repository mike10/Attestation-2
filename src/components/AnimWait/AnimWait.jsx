import "./AnimWait.scss"
import { useState } from 'react';

const AnimWait = (props) => {

    

    return(
        <div className={`cssload-container ${props.onShow}`}>
            <div className="cssload-loading"><i></i><i></i><i></i><i></i></div>
        </div>
    )
}

export default AnimWait
