import { Layout } from 'antd';
import React from 'react';
import HeaderLayout from './Header';
import SearchLayout from './Search';
import FreelancerInfo from './FreelancerInfo';


const user = JSON.parse(localStorage.getItem('user'));

class Home extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            search:{},
            user:localStorage.getItem('user')
        }
    } componentDidMount() {
     
        this.initializeNavBar();

    }
    initializeNavBar() {

        const user = JSON.parse(localStorage.getItem('user'));
        if (user === null) {
            this.setState({
                user: null
            })
        }
        else {
            console.log("user email" + user.email)
            this.setState({
                user: {
                    id: user.id,
                    userGroupID: user.userGroupID,
                    password: user.password,
                    email: user.email
                }
            })
        }
    }
    render(){
      

           if(user.userGroupID===1){
               return(
                    <div>
                        <HeaderLayout/>
                        <FreelancerInfo freelancer={user.id}/>
                    </div>
               )
           }
           else if(user.userGroupID===2)
           {
               return(
                   <div>
                       <HeaderLayout/>
                       <SearchLayout/>
                   </div>
               )
           }
           else if(user.userGroupID===null){
               return(
                   <div>
                       <HeaderLayout/>
                   </div>
               )
           }
         
    }
    
}


export default Home;
