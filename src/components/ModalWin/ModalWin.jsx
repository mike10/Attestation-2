import "./ModalWin.scss"


const ModalWin = (props) => {

    return(
        <div className={"form_flex form_center modal-win "+props.onShow} >
            <div className="modal-win__close" onClick={()=>props.onClose()}>❌</div>
            <div className="modal-win__form form_flex form_center ">{props.children}</div>
            <div className="modal-win__background"></div>
        </div>
    )
}

export default ModalWin
