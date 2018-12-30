import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import CustomLayout from './containers/Layout';
import Login from './component/Login'
import FreelancerProfile from './component/FreelancerProfile';
import Home from'./component/Home'
import FreelancerInfo from './component/FreelancerInfo'
import 'antd/dist/antd.css';

import {Switch, Route, Router} from 'react-router-dom';
import Signup from './component/Signup';

class App extends Component {
  render() {
    return (

      // <CustomLayout/>

      <Switch>
      <Route exact path='/' component={CustomLayout}/>
      <Route exact path='/home' component={Home} />
      <Route exact path='/login' component={Login}/>
      <Route exact path='/signUp' component={Signup}/>
      <Route exact path='/freelancerProfile' component={FreelancerProfile}/>
      <Route exact path='/freelancerinfo' component={FreelancerInfo}/>
  
      </Switch>

    );
  }
}

export default App;
