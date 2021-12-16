import './Sign.scss';
import AnimWait from '../AnimWait/AnimWait';
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { fetchSign } from "../../redux/signSlice";
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next';

const Sign = () => {

  const { t } = useTranslation( "translation", { keyPrefix: 'pageSign' } );
  //i18n.t();
  const [show, setShow] = useState("un-show");
  const [error, setError] = useState("");
  const [value, setValue] = useState("")
  const status = useSelector((state) => state.sign.status);
  const dispatch = useDispatch()
  let history = useHistory()
  
  useEffect(() => {
    switch(status){
      case "loading": setShow("show"); break;
      case "error": alert("error"); break;
      case "success": 
        setShow("un-show"); 
        localStorage.setItem("user", value); 
        history.push(`/profile/${value}`); 
        break;
      
    }
}, [status]);

  //61a11c6f41cd2e0ad3593bc5
  
  const handleChange = (e) => {
    let str = e.target.value
    let regexp = /^[0-9A-Za-z]+$/i;
    if(!regexp.test(str)){
      setError("error")
      return;
    } 
    setError("")
    setValue(str)
  }

  const onSign = () => {
    if(error === "error" || value.length < 20){
      alert(t("incorrect"))
      return
    }
    dispatch(fetchSign(value))
  }
  

  return (
    <div className="sign">
      <AnimWait onShow={show}/>
      <div>
        <h1>{t("sign")}</h1>
        <div>
          <label><p>ID:</p> <input type="text" placeholder={t("Input your id")}  onChange={handleChange} className={"sign__text "+error}/></label>
        </div>
      </div>
      <div>
        <input type="button" value={t("sign in")} onClick={onSign}/>
      </div>
      <div className="sign__reg">
        {t("Do you have an account")} <a href="/">{t("reg")}</a> 
      </div>
      

    </div>
  );


}



export default Sign
