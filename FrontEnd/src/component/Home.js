import { Layout } from 'antd';
import React from 'react';
import HeaderLayout from './Header';
import SearchLayout from './Search';


const user = JSON.parse(localStorage.getItem('user'));

class Home extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            search:{},
            user:localStorage.getItem('user')
        }
    }

    setSearch=(search)=>{
        this.setState({search: search})
    }
    
    render(){
        return (
           <div>
               {
                   user.userGroupID ===1 ? <div> <HeaderLayout/>      
                   <SearchLayout setSearch={this.setSearch.bind(this)}/></div>
                   :<HeaderLayout/> 
               }
              {/* <HeaderLayout/>       */}
                {/* <SearchLayout setSearch={this.setSearch.bind(this)}/>          */}
           {/* <Freelancers search={this.state.search}/> */}
     
           </div>
        );
    }
    
}


export default Home;
