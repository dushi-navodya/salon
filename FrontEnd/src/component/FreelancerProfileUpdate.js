import React from'react'
import {Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,
} from 'antd'; 

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const { TextArea } = Input;
class FreelancerProfileUpdateForm extends React.Component{
    constructor(props){
        super(props)
        this.state={
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
        }
    }
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
            //   this.addUser();           
              
          }
          else{
              console.log(err);
          }
        });
      }

    render(){
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
        return(
            <div>
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
                        rules: [{ required: false, message: 'Please input your first name!', whitespace: true }],
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
                        rules: [{ required: false, message: 'Please input your last name!', whitespace: true }],
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
                            required: false, message: 'Please input your E-mail!',
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
                              <Col span={9} ><Checkbox value="E">EDUCATOR</Checkbox></Col>
                              <Col span={9}><Checkbox value="S">STYLIST</Checkbox></Col>
                              
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
                        rules: [{ required: false, message: 'Please input your Experience in years!',whitespace: false  }],
                        })(
                        <Input  type='number' onChange={e=>this.setState({freelancer:{...freelancer,experience: e.target.experience}})} pattern='^-?[0-9]\d*\.?\d*$'/>,
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Stylist Rate"
                    >
                        {getFieldDecorator('stylistRate', {
                        // initialValue : {experience : this.state.freelancer.experience},
                        rules: [{ required: false, message: 'Please input your Experience in years!',whitespace: false  }],
                        })(
                        <Input  type='number' onChange={e=>this.setState({freelancer:{...freelancer,experience: e.target.experience}})} pattern='^-?[0-9]\d*\.?\d*$'/>,
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Educator Rate"
                    >
                        {getFieldDecorator('educatorRate', {
                        // initialValue : {experience : this.state.freelancer.experience},
                        rules: [{ required: false, message: 'Please input your Experience in years!',whitespace: false  }],
                        })(
                        <Input  type='number' onChange={e=>this.setState({freelancer:{...freelancer,experience: e.target.experience}})} pattern='^-?[0-9]\d*\.?\d*$'/>,
                        )}
                    </FormItem>            

                    <FormItem
                        {...formItemLayout}
                        label="Add Bio"
                    >
                        {getFieldDecorator('bio', {
                        // initialValue : {experience : this.state.freelancer.experience},
                        rules: [{ required: false, message: 'Please input your Experience in years!',whitespace: false  }],
                        })(
                            <TextArea rows={4} />
                        )}
                    </FormItem>

                    
                    <FormItem {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit" style={{backgroundColor: "#1a2930", border: "2px solid rgba(0, 0, 0, 0.7)"}}>Update Profile</Button>
                    </FormItem>
        </Form>
        
            </div>
        )
    }
}

const WrappedRegistrationForm = Form.create()(FreelancerProfileUpdateForm);
export default WrappedRegistrationForm;