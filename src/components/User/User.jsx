import "./User.scss"
import { Link } from "react-router-dom";
import React from "react";
import { forwardRef } from "react";



export const User = forwardRef((props, ref) => {

    
    return (
        <Link to={"/profile/"+props.id} tooltip={props.id}>
            <div className="user" ref={ref}  >
                <img className="user__img" src={props.picture} alt={props.id} />
                <p>{`${props.title} ${props.firstName} ${props.lastName}` }</p>
            </div>
        </Link>
    )
})

