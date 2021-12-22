import './ListUsers.scss';
import {User} from "../../components/User/User"
import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { fetchUsers } from "../../redux/usersSlice"
import AnimWait from '../AnimWait/AnimWait';
import ArrowUp from '../ArrowUp/ArrowUp';


const ListUsers = (props) => {

  const childRef = useRef();
  const [scroll, setScroll] = useState(0);
  const [showAnimWait, setShowAnimWait] = useState("show");
  const page = useSelector(state => state.users.page);
  const isFull = useSelector(state => state.users.isFull);
  const data = useSelector(state => state.users.data);
  const status = useSelector(state => state.users.status);
  const dispatch = useDispatch()
  
  useEffect(() => {
    window.addEventListener("scroll", ()=>{
      setScroll(window.scrollY);
    });
    return () => window.removeEventListener("scroll", ()=>{});
  }, [])

  useEffect(() => {
  }, [data.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if(entry.isIntersecting) {
          observer.unobserve(childRef.current)
          if(!isFull){
            dispatch(fetchUsers(page));
          }
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1
      }
    );
    
    if (childRef.current) {
      observer.observe(childRef.current);
    }
    return () => {
      observer.disconnect()
    }
  }, [ page]);

  useEffect(() => {
    dispatch(fetchUsers(page));
  }, [dispatch]);

  useEffect(() => {
    switch(status){
      case "loading": setShowAnimWait("show"); break;
      case "error": alert("error"); setShowAnimWait("un-show");   break;
      case "success": setShowAnimWait("un-show");   break;
    }
  }, [status]);   
  
  const mountUsers = () => {
    let mount = []
    for (const item of data) {
      if(data[data.length-1].id == item.id){
        mount.push(<User {...item} key={item.id} ref={childRef} />)
        break
      }
      mount.push(<User {...item} key={item.id} />)
    }
    return mount
  }

    return (

      <div  className="listusers form_flex form_center" >
          <AnimWait onShow={showAnimWait}  />
          <ArrowUp onShow={scroll>document.documentElement.clientHeight ? "show" : "un-show" }/>  
          {mountUsers()}
           
      </div>
    );
}

export default ListUsers
