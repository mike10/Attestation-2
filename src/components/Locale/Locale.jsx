import './Locale.scss';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

const Locale = (props) => {


    const [active, setActive] = useState({ru: "locale__a_active", en:""})
    const { i18n } = useTranslation();

    const OnClick = (e) => {
        const item = e.target.outerText.toLowerCase()
        i18n.changeLanguage(item);
        if(item === "ru"){
            setActive({ru: "locale__a_active", en: ""})
        } else {
           setActive({ru:"", en: "locale__a_active" }) 
        }
    }

    return (
        <div className={props.className}>
            <a className={active.ru} href="#" onClick={OnClick}>ru</a>
            <a className={active.en} href="#" onClick={OnClick}>en</a>
        </div>
    );
}

export default Locale
