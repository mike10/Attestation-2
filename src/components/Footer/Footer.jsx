import { useState } from 'react';
import './Footer.scss';
import { useTranslation } from 'react-i18next';

const Footer = () => {

  const { t, i18n } = useTranslation();
  const [theme, setTheme] = useState("")
  const invertor = document.getElementById('inverter');


  const toogleTheme = () => {
    if(invertor.getAttribute('media') == "none"){
      invertor.setAttribute("media", "screen")
    }else{
      invertor.setAttribute("media", "none")
    }
  //   if(!theme){
  //     setTheme("dark")
  //     if(invertor.getAttribute('media') == "none"){
  //       invertor.setAttribute("media", "screen")
  //     }else{
  //       invertor.setAttribute("media", "none")
  //     }
  //   }
  //  setTheme("")
  }

    return (
      <footer className="footer">
       
          <div className="logo">{t('logo')}</div>
          <label htmlFor="chk">{t('change_view')} 
            <label className="switch">
              <input type="checkbox" id="chk" onChange={toogleTheme}/>
              <span className="slider round"></span>
            </label>
          </label>
      </footer>
    );
}


export default Footer