import "./ArrowUp.scss"

const ArrowUp = (props) => {
    return(
         <div className={"arrowup "+props.onShow} >
            <a href="#" className="to-top" onClick={()=>{window.scrollTo(0, 0)}}>Back to top</a>
         </div>
    )
}

export default ArrowUp
