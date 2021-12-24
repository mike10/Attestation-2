import './Header.scss';
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { fetchSign, closeProfile } from "../../redux/signSlice";
import { useTranslation } from 'react-i18next';
import Locale from '../Locale/Locale';


const Header = () => {

  const { t, i18n } = useTranslation();
  const sign = useSelector(state => state.sign.data);
  const status = useSelector(state => state.sign.status);
  const theme = useSelector(state => state.theme.value);
  const [menu320, setMenu320] = useState("") 
  const dispatch = useDispatch()
  
  let user = localStorage.getItem('user');

  

  useEffect(() => {
    
    if(user && !sign.id){
      dispatch(fetchSign(user))
    }
    if(status == "error"){
      alert("ошибка запроса пользователя"); 
    }
  }, [sign.id]);

  const setSign = () => {
    if (sign.id == undefined){
      return (
      <div className="header__sign header_flex">
        <Locale className="locale"/>  
        <div className="header__sign"><Link to="/sign">{t('sign')}</Link></div>
        <div className="header_reg"><Link to="/">{t('registration')}</Link></div>
      </div>)
    } 
    return(<>
      <div className="header__sign header_flex">
        <Locale className="locale"/>
        <Link to={"/profile/"+sign.id} className='header_flex'>
          <img src= {sign.picture} className="header_img"/>
          <div>{sign.lastName}</div>
        </Link>
        <div className="header_reg"><Link to="/sign" onClick={onCloseProfile}>{t('exit')}</Link></div>
      </div>
      
    </>)
  }

  const onCloseProfile = () => {
    localStorage.removeItem("user"); 
    dispatch(closeProfile())
  }

  const closeMenu320 = () => {
    if(menu320 === "show") {
      setMenu320("un-show")
    }
    
  }  

    return (
      <div className={`header form-fixed form_theme-${theme}`}>
          <div className="header__menu320" onClick={()=>{menu320=="show" ? setMenu320("un-show") : setMenu320("show")}}>☰</div>
          <nav className={`header_nav header_flex ${menu320}`} onClick={()=>{if(menu320 === "show") { setMenu320("un-show") }}}  >
            <div className="header__logo">{t('logo')}</div>
            <div className="header_flex">
              <div className="header__users"><Link to="/users">👥 {t('users')}</Link></div>
              <div className="header__posts"><Link to="/posts">▤ {t('posts')}</Link></div>
            </div>
            {/* <div className=""> */}
              {setSign()}
            {/* </div> */}
          </nav>
          <Locale className="locale320"/>
      </div>
    );
}


export default Header
