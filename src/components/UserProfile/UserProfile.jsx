import "./UserProfile.scss"
import { useEffect, useState} from 'react';
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { fetchProfile } from "../../redux/profileSlice";
import { fetchProfilePosts } from "../../redux/profilePostsSlice"
import AnimWait from '../AnimWait/AnimWait';
import ModalWin from "../ModalWin/ModalWin";
import EditFormProfile from "../EditFormProfile/EditFormProfile";
import {formatDate}  from "../../additionData/FormatDate";


 const UserProfile = () => {

    let { id } = useParams();
    const [show, setShow] = useState("show");
    const [modalShow, setModalShow] = useState("un-show");
    const profile = useSelector((state) => state.profile.data);
    const signUser = useSelector((state) => state.sign.data);
    const profileStatus = useSelector((state) => state.profile.status);
    const posts = useSelector((state) => state.profilePosts.data);
    const postsStatus = useSelector((state) => state.profilePosts.status);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchProfile(id));
        dispatch(fetchProfilePosts(id));
    }, []);
    
    useEffect(() => {
        let status = profileStatus || postsStatus
        switch(status){
          case "loading": setShow("show"); break;
          case "error": alert("error"); break;
          case "success":  setShow("un-show"); break;
        }
    }, [profileStatus, postsStatus]); 

    useEffect(() => {
    }, [profile]); 

    const getPosts = () => {
        if (posts.length == 0){
            return <p>постов нет</p>   
        }
        
        let post = posts.map((val, index) => {
            return (
                <div key={index} className="userprofile_posts">
                    <img src={val.image} alt="" />
                    <p>{val.text}</p>
                </div>
            )
        })
        return post
    }

    const mountButtonEdit = () => {
        if(signUser.id === profile.id) {
            return (
            <div className="userprofile__edit" onClick={()=>setModalShow("show")}>
                <div>Редактировать</div>       
            </div>
            )
        }
    }

    return (
        <div className="userprofile">
            <AnimWait onShow={show}/>
            <ModalWin onShow={modalShow} onClose={()=>setModalShow("un-show")}>
                <EditFormProfile/>
            </ModalWin>

            <div className="userprofile__prof">
                <div className="userprofile__prof-info">
                    <div>
                        <img className="userprofile__img" src={profile.picture} alt="" />
                    </div>
                    <div>
                        <div >
                            <h1 className="userprofile_h1"> {`${profile.title} ${profile.firstName} ${profile.lastName}`}</h1>
                        </div>
                        <div className="userprofile__inline">
                            <p>Пол: </p>
                            {profile.title == "ms" ? "Женский" : "Мужской"}
                        </div>
                        <div className="userprofile__inline">
                            <p>Дата рождения: </p>
                            {formatDate(profile.dateOfBirth)}
                        </div>
                        <div className="userprofile__inline">
                            <p>Дата регистрации: </p>
                            {formatDate(profile.registerDate)}
                        </div>
                        <div className="userprofile__inline">
                            <p>Email: </p>
                            {profile.email}
                        </div>
                        <div className="userprofile__inline">
                            <p>Телефон: </p>
                            {profile.phone}
                        </div>
                        <div className="userprofile__inline">
                            <p>ID: </p>
                            {profile.id}
                        </div>
                    </div>
                </div>
                {mountButtonEdit()}
            </div>

            <div className="userprofile__user-posts">
                { getPosts() }
            </div>
            
        </div>
        
    )
   
}

export default UserProfile
