import { Layout } from 'antd';
import React from 'react';
import HeaderLayout from '../component/Header';
import SearchLayout from '../component/Search';

const user = JSON.parse(localStorage.getItem('user'));

class CustomLayout extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            search:{},
            user:localStorage.getItem('user'),
            
        }
    }

    setSearch=(search)=>{
        this.setState({search: search})
    }
    
    render(){
        return (
           <div>
              <HeaderLayout/>      
                <SearchLayout setSearch={this.setSearch.bind(this)}/>         
           {/* <Freelancers search={this.state.search}/> */}
     
           </div>
        );
    }
    
}


export default CustomLayout;
