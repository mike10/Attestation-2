import './Footer.scss';
import { useTranslation } from 'react-i18next';
import { onChangeTheme } from '../../redux/changeTheme';
import { useSelector, useDispatch } from 'react-redux'

const Footer = () => {

  const { t, i18n } = useTranslation();
  const invertor = document.getElementById('inverter');
  const theme = useSelector((state) => state.theme.value);
  const dispatch = useDispatch()

  const toogleTheme = () => {
    
    
    dispatch(onChangeTheme())
    
      
  }
  


    return (
      <footer className={`footer form-fixed form_flex form_theme-${theme}`}>
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