import "./Post.scss"
import { forwardRef } from 'react';
import { formatDate } from '../../additionData/FormatDate';
import { useSelector } from 'react-redux'

export const Post = forwardRef((props, ref) => {
    const theme = useSelector((state) => state.theme.value);
    return (
        <div className={`form post post_17em form_theme-${theme}`} onClick={()=>{props.open(); props.setId()}} ref={ref}>
            <div className="form_flex form_flex-start " tooltip={props.owner.id}>
                <img className="post_avatar" src={props.owner?.picture} alt={props.owner?.id} />
                <div className="post__name-date">
                    <p className="post__p">{`${props.owner?.title} ${props.owner?.firstName} ${props.owner?.lastName}` }</p>
                    <div className="post__date">{formatDate(props.publishDate)}</div>
                </div>
            </div>
            <img className="post_picture form_border-rad10" src={props.image} alt={props.id} />
            <div className="post__text">{props.text}</div>
        </div>

    )
})

