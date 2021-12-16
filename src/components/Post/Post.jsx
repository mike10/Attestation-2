import "./Post.scss"
import { forwardRef } from 'react';

export const Post = forwardRef((props, ref) => {

    return (
        <div className="post post_17em" onClick={()=>{props.open(); props.setId()}} ref={ref}>
            <div className="post__owner" tooltip={props.owner.id}>
                <img className="post_avatar" src={props.owner?.picture} alt={props.owner?.id} />
                <div className="post__name-date">
                    <p className="post__p">{`${props.owner?.title} ${props.owner?.firstName} ${props.owner?.lastName}` }</p>
                    <div className="post__date">
                        {`${new Date(props.publishDate).getDate()}.${new Date(props.publishDate).getMonth()}.${new Date(props.publishDate).getFullYear()}`}
                    </div>
                </div>
            </div>
            <img className="post_picture" src={props.image} alt={props.id} />
            <div className="post__text">{props.text}</div>
        </div>

    )
})

