import "./User.scss"
import { Link } from "react-router-dom";
import React from "react";
import { forwardRef } from "react";
import { useSelector } from 'react-redux'


export const User = forwardRef((props, ref) => {
    const theme = useSelector((state) => state.theme.value);
    
    return (
        <Link to={"/profile/"+props.id} >
            <div className={`user form form_theme-${theme}`} ref={ref} tooltip={props.id} >
                <img className="form_border-rad10 user_img" src={props.picture} alt={props.id} />
                <p>{`${props.title} ${props.firstName} ${props.lastName}` }</p>
            </div>
        </Link>
    )
})

