import React from 'react';
import './CSS/header.css'

const user = JSON.parse(localStorage.getItem('user'));
class Hearder extends React.Component{

constructor(props){
  super(props);
  this.state={
    user:localStorage.getItem('user')
  }
}

  render(){
    console.log(this.state.user);
    return (
      
      <div>
      <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"></link>
      <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
      <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
      <script src="https://unpkg.com/react-router-dom/umd/react-router-dom.min.js"></script>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      
      <header id="header">
      <a href ="/login">
      <button href ="/login" type="button" className = "login"> Login </button>
      </a>
      <a href ="/SignUp">   
      <button type="button" className = "login"> SignUp </button>
      </a>
          <div className="container">
      
            <div id="logo" className="pull-left">
              <h1><a href="/" className="scrollto" style={{color:"#f7ce3e "}}>STYLIST</a></h1>
            </div>
            
      
            <nav id="nav-menu-container">
              <ul className="nav-menu">
                <li className="menu-active"><a href="/">Home</a></li>
                <li><a href="">About Us</a></li>
                <li><a href="">FAQ</a></li>
                <li><a href="">Contact US</a></li>
               
                
                
                {/* <li class="menu-has-children"><a href="">Drop Down</a>
                  <ul>
                    <li><a href="#">Drop Down 1</a></li>
                    <li><a href="#">Drop Down 3</a></li>
                    <li><a href="#">Drop Down 4</a></li>
                    <li><a href="#">Drop Down 5</a></li>
                  </ul>
                </li>
                 <li class="menu-has-children"><a href="">Drop Down</a>
                  <ul>
                    <li><a href="#">Drop Down 1</a></li>
                    <li><a href="#">Drop Down 3</a></li>
                    <li><a href="#">Drop Down 4</a></li>
                    <li><a href="#">Drop Down 5</a></li>
                  </ul>
                </li> */}
              </ul>
              
            </nav>      
             
          </div>
          
        </header>
        
      </div>
    )

  }
    
    

}



   
      


export default Hearder;
