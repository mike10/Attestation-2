import './App.scss';
import React from "react";
import { BrowserRouter as Router, IndexRoute, Switch, Route, Redirect , useHistory  } from "react-router-dom";
import { useEffect, useRef } from "react"

import Header from "./components/Header/Header"
import Footer from './components/Footer/Footer';
import Registration from './components/Registration/Registration';
import ListUsers from './components/ListUsers/ListUsers';
import ListPosts from './components/ListPosts/ListPosts';
import Sign from './components/Sign/Sign';
import UserProfile from './components/UserProfile/UserProfile';
import AnimWait from './components/AnimWait/AnimWait';
import ModalWin from './components/ModalWin/ModalWin';
import EditFormProfile from './components/EditFormProfile/EditFormProfile';
import ArrowUp from './components/ArrowUp/ArrowUp';
import "./locale/i18n"
import { useSelector } from 'react-redux'


const App = () => {
  const theme = useSelector((state) => state.theme.value);
  return (
    <div className={`App App_theme-${theme}`}>
        <Router>
          
            <Header/>
            <div className="show-must-be-here form_flex form_center" >
              
              <Switch>
                <Route path="/posts">
                  <ListPosts/>
                </Route>
                <Route path="/users">
                  <ListUsers />
                </Route> 
                <Route path="/sign">
                  <Sign />
                </Route>
                <Route exact path="/">
                  <Registration />
                </Route>
                <Route path="/profile/:id">
                  <UserProfile/>
                </Route>
              </Switch>

            </div>
          
        </Router>
        <Footer/>  
    </div>
  );
}

export default App;
