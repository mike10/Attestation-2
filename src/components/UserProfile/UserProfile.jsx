import "./UserProfile.scss"
import { useEffect, useState} from 'react';
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { fetchProfile, fetchProfilePost } from "../../redux/profileSlice";
import AnimWait from '../AnimWait/AnimWait';
import ModalWin from "../ModalWin/ModalWin";
import EditFormProfile from "../EditFormProfile/EditFormProfile";
import {formatDate}  from "../../additionData/FormatDate";


 const UserProfile = () => {

    let { id } = useParams();
    const theme = useSelector((state) => state.theme.value);
    const [show, setShow] = useState("show");
    const [modalShow, setModalShow] = useState("un-show");
    const profile = useSelector((state) => state.profile.data);
    const signUser = useSelector((state) => state.sign.data);
    const status = useSelector((state) => state.profile.status);
    const posts = useSelector((state) => state.profile.posts.data);
    const pagePosts = useSelector((state) => state.profile.posts.page);
    const isFullPosts = useSelector((state) => state.profile.posts.isFull);
    
    const dispatch = useDispatch()
    
    useEffect(() => {
        if(profile.id != id){
            dispatch(fetchProfile(id));
        }
    }, [id]);

    useEffect(() => {
        dispatch(fetchProfile(id));
    }, [signUser]);
    
    useEffect(() => {
        switch(status){
          case "loading": setShow("show"); break;
          case "error": alert("error"); setShow("un-show"); break;
          case "success":  setShow("un-show"); break;
        }
    }, [status]); 

    useEffect(() => {
        console.log("pagePosts, isFullPosts");
        console.log(pagePosts, isFullPosts);
    }, [pagePosts, isFullPosts]);
    
    const handleScroll = () => {
        let positioScroll = parseInt(window.innerHeight)+parseInt(window.pageYOffset)
            let scrollHeight = Math.max(
                document.body.scrollHeight, document.documentElement.scrollHeight,
                document.body.offsetHeight, document.documentElement.offsetHeight,
                document.body.clientHeight, document.documentElement.clientHeight
              );
            if(positioScroll >= scrollHeight){
                if(!isFullPosts){
                    console.log("запуск");
                    console.log(pagePosts);
                    dispatch(fetchProfilePost({id: id, page: pagePosts}));
                }
                
            } 
    }
    useEffect(() => {
        document.addEventListener('scroll', handleScroll);
        return () => {
            document.removeEventListener('scroll', handleScroll);
        };
    }, [pagePosts])
     

    const getPosts = () => {
        if (posts.length == 0){
            return <p className="userprofile_w100">постов нет</p>   
        }
        
        let post = posts.map((val, index) => {
            return (
                <div key={index} className={`userprofile_w15em form form_theme-${theme}`}>
                    <img src={val.image} alt="" className="form_border-rad10 userprofile_w13em"/>
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
        <div className="userprofile" onScroll={handleScroll}>
            <AnimWait onShow={show}/>
            <ModalWin onShow={modalShow} onClose={()=>setModalShow("un-show")}>
                <EditFormProfile/>
            </ModalWin>

            <div className={`userprofile__prof form form_theme-${theme}`} >
                <div className="form_flex">
                    <div >
                        {profile.picture && <img className="userprofile__img form_border-rad10" src={profile.picture} alt="" />}
                        
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

            <div className="userprofile__user-posts form_flex form_flex-start">
                { getPosts() }
            </div>
            
        </div>
        
    )
   
}

export default UserProfile
