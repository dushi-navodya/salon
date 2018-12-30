import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Signup from './Signup';

const Body =(props)=>(
    <main>
    <Switch>
    <Route exact path='/signUp' component={Signup}/>
    {/* <Route exact path='/stylistDtails' component={Stylist_Details}/> */}
    </Switch>
    </main>
)
export default Body;