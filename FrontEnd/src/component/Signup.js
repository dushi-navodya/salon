import { Tabs } from 'antd';
import './CSS/signup.css'
import React from 'react'
import {Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,
  } from 'antd';
import axios from 'axios'


const TabPane = Tabs.TabPane;

function callback(key) {
    console.log(key);
  }

// function onChange(e) {
//     console.log(`checked = ${e.target.checked}`);
//   }

//   function onChangeNumber(value) {
//     console.log('changed', value);
//   }
   

  const FormItem = Form.Item;
  const Option = Select.Option;
  const AutoCompleteOption = AutoComplete.Option;
  
  class RegistrationForm extends React.Component {

    state = {
      confirmDirty: false,
      autoCompleteResult: [],
      user:{
        firstName:'',
        lastName:'',                  
        email:'',        
        password:'',
        userGroupId:1,
        userID:''
      },
      freelancer:{          
        experience: 1,
        isEducator:0,
        isStylist:0,
        stylistID:''
      }
    };
  
    handleFreelancerSubmit = (e) => {
      e.preventDefault();
      const {user} =this.state;
      const {freelancer} = this.state;
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
            console.log('Received values of form: ', values);

            this.state.user.firstName = values.firstName;
            this.state.user.lastName = values.lastName;
            this.state.user.email = values.email;
            this.state.user.password = values.password;
            this.state.freelancer.experience = values.experience;
            this.state.user.userGroupID = values.prefix;

            if(values.occupation.length == 2)
            {
                console.log("l");
                this.state.freelancer.isEducator = 1;
                this.state.freelancer.isStylist = 1;
            }
            else if(values.occupation[0]== "S")
            {
                console.log("h");
                this.state.freelancer.isStylist = 1;
                this.state.freelancer.isEducator = 0;
            }else if(values.occupation[0]== "E")
            {
                console.log("k");
                this.state.freelancer.isEducator = 1;
                this.state.freelancer.isStylist = 0;
            }
            else{
                alert("You must Select A Occupation")
            }
            console.log(user);
            console.log(freelancer);
            this.addUser();           
            
        }
        else{
            console.log(err);
        }
      });
    }
     addUser=_=>{
         const {user} = this.state;
        axios.post('http://localhost:8080/user/register', {
            firstName: user.firstName,
            lastName: user.lastName,
            password:user.password,
            email:user.email,
            userGroupID:user.userGroupId

          }).then(res => {
            console.log(res);
            console.log(res.data);
            user.userID = res.data.id;
            if(user.userID != null){
                this.addFreelancer(res.data);
            }
            
          }).catch(err=>{
            console.log(err);
          });
    }
    addFreelancer=_=>{
        const {freelancer}=this.state;
        const { user } = this.state;
        console.log(user.userID);
        axios.post('http://localhost:8080/stylist/save', {
            experience: freelancer.experience,
            isEducator: freelancer.isEducator,
            isStylist:freelancer.isStylist,
            userID:user.userID

          }).then(res => {
            console.log(res);
            console.log(res.data);
          }).catch(err=>{
            console.log(err);
          });
    }
  
    handleConfirmBlur = (e) => {
      const value = e.target.value;
      this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }
  
    compareToFirstPassword = (rule, value, callback) => {
      const form = this.props.form;
      if (value && value !== form.getFieldValue('password')) {
        callback('Two passwords that you enter is inconsistent!');
      } else {
        callback();
      }
    }
  
    validateToNextPassword = (rule, value, callback) => {
      const form = this.props.form;
      if (value && this.state.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
    }
  
    handleWebsiteChange = (value) => {
      let autoCompleteResult;
      if (!value) {
        autoCompleteResult = [];
      } else {
        autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
      }
      this.setState({ autoCompleteResult });
    }
   
    
   
  
    render() {
      const { getFieldDecorator } = this.props.form;
      const { autoCompleteResult } = this.state;
      const{ user } = this.state;
      const{ freelancer } =this.state;
  
      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      };
      const tailFormItemLayout = {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      };
      const prefixSelector = getFieldDecorator('prefix', {
        initialValue: '1',
      })(
        <Select style={{ width: 70 }}>
          <Option value="86">1</Option>
          <Option value="87">2</Option>
          <Option value="86">3</Option>
          <Option value="87">4</Option>
          <Option value="86">5</Option>
          <Option value="87">6</Option>
        </Select>
      );
  
      const websiteOptions = autoCompleteResult.map(website => (
        <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
      ));
     
      return (
        <div>
            <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"></link>
            <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
            <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
            <script src="https://unpkg.com/react-router-dom/umd/react-router-dom.min.js"></script>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            
            

        <div className ="cont" >
        <div id="logo" className="pull-left">
            <h1><a href="/" className="scrollto" className="colorLogo">STYLIST</a></h1>
            </div>
            <div className="tabs">
        <Tabs defaultActiveKey="1" onChange={callback} style={{color: "#F7882F"}} >
            <TabPane tab="Freelancer" key="1" >
                <Form onSubmit={this.handleFreelancerSubmit}>
                <FormItem
                        {...formItemLayout}
                        label={(
                        <span>
                            First Name&nbsp;
                            <Tooltip title="Your prefered First Name?">
                            <Icon type="question-circle-o" />
                            </Tooltip>
                        </span>
                        )}
                    >
                        {getFieldDecorator('firstName', {
                        // initialValue : {firstName : this.state.user.firstName},
                        rules: [{ required: true, message: 'Please input your first name!', whitespace: true }],
                        })(
                        <Input onChange={e=>this.setState({user:{...user,firstName : e.target.firstName}})} />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={(
                        <span>
                            Last Name&nbsp;
                            <Tooltip title="Your prefered Last Name?">
                            <Icon type="question-circle-o" />
                            </Tooltip>
                        </span>
                        )}
                    >
                        {getFieldDecorator('lastName', {
                        // initialValue : {lastName : this.state.user.lastName},
                        rules: [{ required: true, message: 'Please input your last name!', whitespace: true }],
                        })(
                        <Input onChange={e=>this.setState({user:{...user,lastName : e.target.lastName}})} />
                        )}
                    </FormItem>                  
                    <FormItem
                        {...formItemLayout}
                        label="E-mail"
                    >
                        {getFieldDecorator('email', {
                        // initialValue : {email : this.state.user.email},
                        rules: [{
                            type: 'email', message: 'The input is not valid E-mail!',
                        }, {
                            required: true, message: 'Please input your E-mail!',
                        }],
                        })(
                        <Input type ="text" onChange={e=>this.setState({user:{...user,email : e.target.email}})} />
                        )}
                    </FormItem>
                    <FormItem
                    {...formItemLayout}
                        label={(
                        <span>
                            Occupation&nbsp;
                            
                        </span>
                        )}>
                        {getFieldDecorator('occupation',  {
                        initialValue: ["S"],
                       
                        })(     
                            <Checkbox.Group style={{ width: "100%" }}>
                            <Row>
                              <Col span={8} ><Checkbox value="E">EDUCATOR</Checkbox></Col>
                              <Col span={8}><Checkbox value="S">STYLIST</Checkbox></Col>
                              
                            </Row>
                          </Checkbox.Group>     
                        
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Experience Years"
                    >
                        {getFieldDecorator('experience', {
                        // initialValue : {experience : this.state.freelancer.experience},
                        rules: [{ required: true, message: 'Please input your Experience in years!',whitespace: false  }],
                        })(
                        <Input  type='number' onChange={e=>this.setState({freelancer:{...freelancer,experience: e.target.experience}})} pattern='^-?[0-9]\d*\.?\d*$'/>,
                        )}
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="Password"
                    >
                        {getFieldDecorator('password', {
                        rules: [{
                            required: true, message: 'Please input your password!',
                        }, {
                            validator: this.validateToNextPassword,
                        }],
                        })(
                        <Input type="password" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Confirm Password"
                    >
                        {getFieldDecorator('confirm', {
                        // initialValue : {confirm : this.state.user.password},
                        rules: [{
                            required: true, message: 'Please confirm your password!',
                        }, {
                            validator: this.compareToFirstPassword,
                        }],
                        })(
                        <Input type="password" onBlur={this.handleConfirmBlur} onChange={e=>this.setState({user:{...user,confirm: e.target.password}})}/>
                        )}
                    </FormItem>
                    
                    <FormItem {...tailFormItemLayout}>
                        {getFieldDecorator('agreement', {
                        valuePropName: 'checked',
                        })(
                        <Checkbox>I have read the <a href="" style={{color: "#F7882F"}}>agreement</a></Checkbox>
                        )}
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit" style={{backgroundColor: "#F7882F", border: "2px solid rgba(0, 0, 0, 0.7)"}}>Register</Button>
                    </FormItem>
        </Form>
        </TabPane>
          <TabPane tab="Employer" key="2">
          {/* <Form onSubmit={this.handleSubmit}>
                    <FormItem
                        {...formItemLayout}
                        label="E-mail"
                    >
                        {getFieldDecorator('email', {
                        rules: [{
                            type: 'email', message: 'The input is not valid E-mail!',
                        }, {
                            required: true, message: 'Please input your E-mail!',
                        }],
                        })(
                        <Input />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Password"
                    >
                        {getFieldDecorator('password', {
                        rules: [{
                            required: true, message: 'Please input your password!',
                        }, {
                            validator: this.validateToNextPassword,
                        }],
                        })(
                        <Input type="password" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Confirm Password"
                    >
                        {getFieldDecorator('confirm', {
                        rules: [{
                            required: true, message: 'Please confirm your password!',
                        }, {
                            validator: this.compareToFirstPassword,
                        }],
                        })(
                        <Input type="password" onBlur={this.handleConfirmBlur} />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={(
                        <span>
                            Nickname&nbsp;
                            <Tooltip title="What do you want others to call you?">
                            <Icon type="question-circle-o" />
                            </Tooltip>
                        </span>
                        )}
                    >
                        {getFieldDecorator('nickname', {
                        rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
                        })(
                        <Input />
                        )}
                    </FormItem>
                    
                    <FormItem
                        {...formItemLayout}
                        label="Phone Number"
                    >
                        {getFieldDecorator('phone', {
                        rules: [{ required: true, message: 'Please input your phone number!' }],
                        })(
                        <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Website"
                    >
                        {getFieldDecorator('website', {
                        rules: [{ required: true, message: 'Please input website!' }],
                        })(
                        <AutoComplete
                            dataSource={websiteOptions}
                            onChange={this.handleWebsiteChange}
                            placeholder="website"
                        >
                            <Input />
                        </AutoComplete>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Captcha"
                        extra="We must make sure that your are a human."
                    >
                        <Row gutter={8}>
                        <Col span={12}>
                            {getFieldDecorator('captcha', {
                            rules: [{ required: true, message: 'Please input the captcha you got!' }],
                            })(
                            <Input />
                            )}
                        </Col>
                        <Col span={12}>
                            <Button>Get captcha</Button>
                        </Col>
                        </Row>
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        {getFieldDecorator('agreement', {
                        valuePropName: 'checked',
                        })(
                        <Checkbox>I have read the <a href="">agreement</a></Checkbox>
                        )}
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">Register</Button>
                    </FormItem>
        </Form>
        */}
       </TabPane>
        </Tabs>
        </div>
        </div>
        </div>
      );
    }
  }

  const WrappedRegistrationForm = Form.create()(RegistrationForm);

  export default WrappedRegistrationForm;
