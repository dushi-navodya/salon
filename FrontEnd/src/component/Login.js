import React from 'react';
import {
    Form, Icon, Input, Button, Checkbox,
  } from 'antd';
import './CSS/login.css'
import axios from 'axios'
import {Link} from 'react-router-dom'

class Login extends React.Component{
    constructor(props){
          super(props);
          this.state ={
              user:{
                  id:'',
              userName:'',
              email:'',
              password:'',
              userGroupID:'',
              
              
          },
          count:1
      }
    }
      handleSubmit = (e) => { 
        const {count} =this.state;
        const {user} = this.state;
        console.log("jn")
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            axios.get('http://localhost:8080/user/getUser', {
            params: {
                email: values.email,
            }
            })
            .then(response => {
                // console.log(response.data[0]);
                if(response.data.length !==0)
                {         
                  console.log("jdn")       
                  this.state.count=1 
                    // this.setState({count:1})
                    user.id = response.data[0].id;
                    user.email = response.data[0].email;
                    user.password=  response.data[0].password;
                    user.userGroupID = response.data[0].userGroupID;
                    user.userName = response.data[0].firstName;

                    // this.setState({user: {...this.state.user,id: response.data.id}})               /
                    // this.setState({user: {...this.state.user,email: response.data[0].email}})
                    // this.setState({user: {...this.state.user, password:  response.data[0].password}})
                    // this.setState({user: {...this.state.user,userGroupID:  response.data[0].userGroupID}})
                    // this.setState({user: {...this.state.user,userName:  response.data[0].firstName}})
              
                }
                else{ 
                  
                  this.setState({count:0})
                
                }
                console.log( user);
                ;
            });
            this.doValidation(count);
            
          }
          console.log(count)
        });
      }
      test=()=>{
        
      }
      doValidation=(count)=>{
        const{user}=this.state;
        console.log('data:'+count)
        if(count==1){
          console.log("valid user")
          console.log(user)
          localStorage.setItem('user', JSON.stringify(user));
          this.props.history.push({pathname:'/',data:user});
          
        }
        else if(count==0){
          console.log("invalid user")
        }
      }

      render() 
      {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="loginForm">            
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('email', {
                rules: [{
                    type: 'email', message: 'The input is not valid E-mail!'},{
                    required: true, message: 'Please input your username!' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(
                <Checkbox>Remember me</Checkbox>
              )}
              <a className="login-form-forgot" href="">Forgot password</a>
              {/* <a href="/home"> */}
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
              {/* </a> */}
              Or <a href="/signUp">register now!</a>
            </Form.Item>
          </Form>
          </div>
        );
      }
  }
  const WrappedNormalLoginForm = Form.create()(Login);

  export default WrappedNormalLoginForm;
  