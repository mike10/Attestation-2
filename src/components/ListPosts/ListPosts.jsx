import './ListPosts.scss';
import { Post } from "../../components/Post/Post"
import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { fetchPosts, fetchComments, resetPage } from "../../redux/postsSlice"
import AnimWait from '../AnimWait/AnimWait';
import ModalWin from "../ModalWin/ModalWin";
import ArrowUp from '../ArrowUp/ArrowUp';
import { formatDate } from '../../additionData/FormatDate';

const ListPosts = () => {
  const childRef = useRef();
  const [scroll, setScroll] = useState(0);
  const comments = useSelector(state => state.posts.comments)
  const [idPost, setIdPost] = useState("") 
  const [modalShow, setModalShow] = useState("un-show");
  const [show, setShow] = useState("show");
  const page = useSelector(state => state.posts.page);
  const isFull = useSelector(state => state.posts.isFull);
  const posts = useSelector(state => state.posts.data);
  const statusPost = useSelector(state => state.posts.status);
  const theme = useSelector((state) => state.theme.value);
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
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.unobserve(childRef.current)
          if(!isFull){
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
    return () => {
      observer.disconnect()
    }
  }, [page]);


  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  useEffect(() => {
    switch(statusPost){
      case "loading": setShow("show"); break;
      case "error": alert("error"); setShow("un-show"); break;
      case "success": setShow("un-show"); break;
    }
  }, [statusPost]);  

  const mountPosts = () => {
    let mount = []
    for (const item of posts) {
      if(posts[posts.length-1].id == item.id) {
        mount.push(<Post {...item} open={()=>setModalShow("show_flex")} 
        setId={()=>{setIdPost(item); dispatch(fetchComments({id: item.id, page: comments.page})); }}  key={item.id} ref={childRef}/> )
        break
      }
      mount.push(<Post {...item}  open={()=>setModalShow("show_flex")} 
      setId={ ()=>{setIdPost(item); dispatch(fetchComments({id: item.id, page: comments.page})) }} key={item.id}/>)
    }
    return mount
  }


  const handleScroll = (e) => {
    console.log(idPost.id);
    let positioScroll = e.target.scrollLeft + e.target.offsetWidth
    let scrollWight = Math.max(
      e.target.scrollWidth, e.target.scrollWidth,
      e.target.offsetWidth, e.target.offsetWidth,
      e.target.clientWidth, e.target.clientWidth
    );
    if(positioScroll >= scrollWight){
      console.log("запрос новых комментариев");
        if(!comments.isFull){
          console.log("запуск");
          console.log(idPost.id);
          dispatch(fetchComments({id: idPost.id, page: comments.page}))
        }
        
    } 
  }

  return (
    <>
        <AnimWait onShow={show}/>
        <ArrowUp onShow={scroll>document.documentElement.clientHeight ? "show" : "un-show" }/>  
        <ModalWin onShow={modalShow} onClose={()=>{setModalShow("un-show"); dispatch(resetPage())}}>
              <div className={`form form_w40em  form_theme-f2${theme}`}>
                <div className='post post_modal'>
                  <header className='form_flex'>
                    <div className='form_flex'>
                      <div><img className="post_avatar" src={idPost?.owner?.picture} /></div>
                      <div className='post_middle-vert'>{`${idPost?.owner?.title} ${idPost?.owner?.firstName} ${idPost?.owner?.lastName}` }</div>
                    </div>
                    <div className='post_middle-vert'>{formatDate(idPost?.publishDate)}</div>
                  </header>
                  
                  <div>
                    <img className="post_picture form_border-rad10 " src={idPost?.image} alt={idPost?.id} />
                  </div>
                  <div><div className="post__text">{idPost?.text}</div></div>
                </div>
                <div className="form_flex form_flex-start form_scroll comments_hor-scroll" onScroll={handleScroll}>
                  {comments.data.map((item, index) => {
                    return ( 
                      <div key={item.owner.id+index} className={`form comment form_theme-${theme}`}>
                        <div><img className="post_avatar" src={item.owner.picture} /></div>
                        <div>
                          <p className='comment__p'>{`${item.owner.title} ${item.owner.firstName} ${item.owner.lastName}` }</p>
                          <div className="comment_mes">{item.message}</div>
                        </div>
                        <div className='comment__date'>{formatDate(item.publishDate)}</div>

                      </div>                    
                    )
                    
                  })}
                </div> 
              </div>
              
        </ModalWin>
        { mountPosts() }
    </>
  );
}

export default ListPosts
