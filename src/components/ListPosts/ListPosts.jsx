import './ListPosts.scss';
import { Post } from "../../components/Post/Post"
import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { fetchPosts, fetchComments } from "../../redux/postsSlice"
import AnimWait from '../AnimWait/AnimWait';
import ModalWin from "../ModalWin/ModalWin";
import ArrowUp from '../ArrowUp/ArrowUp';

const ListPosts = () => {

  const childRef = useRef();
  const [scroll, setScroll] = useState(0);
  const comments = useSelector(state => state.posts.comments)
  const [idPost, setIdPost] = useState("") 
  const [modalShow, setModalShow] = useState("un-show");
  const [show, setShow] = useState("show");
  const page = useSelector(state => state.posts.page);
  const total = useSelector(state => state.posts.total);
  const posts = useSelector(state => state.posts.data);
  const statusPost = useSelector(state => state.posts.status);
  const dispatch = useDispatch()

  useEffect(() => {
    window.addEventListener("scroll", ()=>{
      setScroll(window.scrollY);
    });
    return () => window.removeEventListener("scroll", ()=>{});
  }, [])

  useEffect(() => {
  }, [page, posts.length]);
  
  useEffect(() => {
    console.log("total= "+total);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.unobserve(childRef.current)
          if(total > page*20){
            dispatch(fetchPosts(page));
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
  }, [childRef, page]);


  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  useEffect(() => {
    switch(statusPost){
      case "loading": setShow("show"); break;
      case "error": alert("error"); break;
      case "success": setShow("un-show"); break;
    }
  }, [statusPost]);  

  const mountPosts = () => {
    let mount = []
    for (const item of posts) {
      if(posts[posts.length-1].id == item.id) {
        mount.push(<Post {...item}  open={()=>setModalShow("show")} 
        setId={()=>{setIdPost(item); dispatch(fetchComments(item.id))}}  key={item.id} ref={childRef}/> )
        break
      }
      mount.push(<Post {...item}  open={()=>setModalShow("show")} 
      setId={()=>{setIdPost(item); dispatch(fetchComments(item.id))}}  key={item.id}/>)
    }
    return mount
  }

    return (
      <>
          <AnimWait onShow={show}/>
          <ArrowUp onShow={scroll>document.documentElement.clientHeight ? "show" : "un-show" }/>  
          <ModalWin onShow={modalShow} onClose={()=>setModalShow("un-show")}>
                <div className='post post_modal'>
                  <div>
                    <div><img className="post_avatar" src={idPost?.owner?.picture} /></div>
                     <div>{`${idPost?.owner?.title} ${idPost?.owner?.firstName} ${idPost?.owner?.lastName}` }</div>
                  </div>
                  <div>{`${new Date(idPost?.publishDate).getDate()}.${new Date(idPost?.publishDate).getMonth()}.${new Date(idPost?.publishDate).getFullYear()}`}</div>
                  <div>
                    <img className="post_picture" src={idPost?.image} alt={idPost?.id} />
                  </div>
                  <div><div className="post__text">{idPost?.text}</div></div>
                </div>
                <div className="comments comments_margin">
                  {comments.map((item, index) => {
                    return <> 
                      <div key={item.owner.id} className='comment'>
                        <div><img className="post_avatar" src={item.owner.picture} /></div>
                        <div>{`${item.owner.title} ${item.owner.firstName} ${item.owner.lastName}` }</div>
                        <div>{`${new Date(item.publishDate).getDate()}.${new Date(item.publishDate).getMonth()}.${new Date(item.publishDate).getFullYear()}`}</div>
                      </div>                    
                      <div>{item.message}</div>
                    </>
                  })}
                </div>
          </ModalWin>
          { mountPosts() }
      </>
    );
}

export default ListPosts
