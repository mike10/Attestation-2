import './Registration.scss';

import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import AnimWait from '../AnimWait/AnimWait';
import { useSelector, useDispatch } from 'react-redux'
import { fetchSign, fetchCreateUser } from "../../redux/signSlice"
import { validation } from "../../additionData/Validation";
import { useTranslation } from 'react-i18next';

const Registration = () => {
  
  const { t } = useTranslation( "translation", { keyPrefix: 'pageReg' } );
  let history = useHistory();
  const status = useSelector((state) => state.sign.status);
  const newUserId = useSelector((state) => state.sign.data.id);
  const [profile, setProfile] = useState({})
  const [show, setShow] = useState("un-show");
  const dispatch = useDispatch()

  useEffect(() => {
    switch(status){
      case "loading": setShow("show"); break;
      case "error": alert("error"); break;
      case "success": {
        setShow("un-show");
        if(newUserId) {
          localStorage.setItem("user", newUserId);
          history.push(`/profile/${newUserId}`);
        }
      }
      
    }
  }, [status]);

  const onSubmit = () => {
    console.log(profile);
    let [isOk, answer] = validation(profile)

    if(isOk){
      if(!answer.title) {
        answer = {...answer, title: "mr"}
        console.log(answer);
      }
      //createNewUser(answer)
      dispatch(fetchCreateUser(JSON.stringify(answer)))
    }else{
      alert(t("validation."+answer))
    }
  }

  return (
    
    <div className="registration form">
      <AnimWait onShow={show}/>

      <h1>{t("reg")}</h1>

      <div className="form__element"> 
        <label>
          <p className="form__p">{t("name")}:</p>
          <div className="form__input-and-error">
          <input type="text" className="form__input" placeholder={t("input name")} onBlur={(e)=>{setProfile({...profile, firstName: e.target.value})}} required minLength="2" maxLength="20"/>
            <div className="form__message-error">{t("messages.required field")}</div>
          </div>
        </label>
      </div>

      <div className="form__element"> 
        <label>
          <p className="form__p">{t("surname")}:</p>
          <div className="form__input-and-error">
            <input type="text" className="form__input" placeholder={t("input surname")} onBlur={(e)=>{setProfile({...profile, lastName: e.target.value})}} required minLength="2" maxLength="20"/>
            <div className="form__message-error">{t("messages.required field")}</div>
          </div>
        </label>
      </div>
      

      <div className="form__element">
        <label>
          <p className="form__p">{t("gender")}:</p>
          <div className="form__input-and-error">
            <label><input type="radio" name="gen" defaultChecked onClick={() => {setProfile({...profile, title: "mr"})}}/>{t("male")}</label>
            <label><input type="radio" name="gen" onClick={() => {setProfile({...profile, title: "ms"})}}/>{t("female")}</label>
          </div>
        </label>
      </div>
      
      <div className="form__element">
        <label>
          <p className="form__p">{t("datebirthday")}:</p>
          <div className="form__input-and-error">
            <input className="form__input" type="text" placeholder={t("formatdb")} pattern="^\d{2}.\d{2}.\d{4}$" onBlur={(e)=>{setProfile({...profile, dateOfBirth: e.target.value})}}/>
            <div className="form__message-error">{t("messages.input data")}</div>
          </div>
        </label>
      </div>

      <div className="form__element"> 
        <label>
          <p className="form__p">Email:</p>
          <div className="form__input-and-error">
            <input className="form__input" type="email" placeholder="anonim@example.com"  onBlur={(e)=>{setProfile({...profile, email: e.target.value})}} required/>
            <div className="form__message-error">{t("messages.input email")}</div>
          </div>
        </label>
      </div>

      <div className="form__element"> 
        <label>
          <p className="form__p">{t("phone")}:</p>
          <div className="form__input-and-error">
            <input className="form__input" type="tel"  placeholder="+79991234567" pattern="^\+7\d{10}$" onBlur={(e)=>{setProfile({...profile, phone: e.target.value})}}/>
            <div className="form__message-error">{t("messages.input phone")}</div>
          </div>
        </label>
      </div>

      <div>
        <input type="button" value={t("reg-butn")} onClick={onSubmit}/>
      </div>

      <div className="registration__sign">
      {t("have acc")} <a href="/sign">{t("sign in")}</a> 
      </div>
    </div>
  );
}

export default Registration

