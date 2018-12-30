import React from 'react'
import {
    Form, DatePicker, TimePicker, Button, Select, Input,List, Rate, Row, Col, Checkbox
  } from 'antd';
 import axios from 'axios' 
  const { MonthPicker, RangePicker } = DatePicker;
  const { Option } = Select;
  class TimeRelatedForm extends React.Component {

    constructor(props){
        super(props);
        this.state= {
            freelancer:{
                id: this.props.freelancer,
                date:this.props.selectedValue,
                stylistRate : '',
                educatorRate :'',
                isStylist:'',
                isEducator:'',
                calendarID:''
            },
            sessions:[],
            jobs:[],
            prices:[]

        }
    }
    componentDidMount=()=>{
      const {freelancer} =this.state;

      axios.get('http://localhost:8080/stylistCalendar/getAvailableSession', {
        params: {
           id : freelancer.id,
           date: freelancer.date
        }
      })
      .then(response => {
        console.log(response)
        
        let sessionsFromAPI = response.data.map(session => { return {value: session.workingSessionID, display: session.sessionName} })
        this.setState({ sessions : (sessionsFromAPI) });
        this.state.freelancer.stylistRate = response.data[0].stylistRate;
        this.state.freelancer.educatorRate = response.data[0].educatorRate;
        this.state.freelancer.isStylist = response.data[0].isStylist;
        this.state.freelancer.isEducator = response.data[0].isEducator;        
        this.state.freelancer.calendarID = response.data[0].id;
        console.log(this.state.freelancer)
        console.log(this.state.sessions)     
        this.getFreelancerJob(); 
        this.getFreelancerRate()   
      })
    }

    getFreelancerJob=()=>
    {
        const{freelancer} = this.state;
        const {jobs} = this.state;
        let array = [] //creates the clone of the state
        
        if(freelancer.isEducator=== 1 && freelancer.isStylist===1){
          this.state.jobs = [];
          array[0] = "Stylist";
          array[1] = "Educator";
          console.log(array)
          this.setState({jobs :(array)})
      }
      else if(freelancer.isEducator===1  && freelancer.isStylist===0){
          this.state.jobs = [];
          array[0] = "Educator";
          this.setState({jobs :array});
      }
      else if(freelancer.isStylist ===1 && freelancer.isEducator===0){
          this.state.jobs = [];
          array[0] = "Stylist";
          this.setState({jobs :array});
      }
        console.log(this.state.jobs)
    }
    getFreelancerRate=()=>{

      let array = [];
      const {freelancer} = this.state
      if(freelancer.isEducator=== 1 && freelancer.isStylist===1){
        this.state.prices = [];
        array[0] = "Stylist: "+freelancer.stylistRate;
        array[1] = "Educator: "+freelancer.educatorRate;
        console.log(array)
        this.setState({prices :(array)})
    }
    else if(freelancer.isEducator===1  && freelancer.isStylist===0){
        this.state.prices = [];
        array[0] = "Educator: "+freelancer.educatorRate;
        this.setState({prices :array});
    }
    else if(freelancer.isStylist ===1 && freelancer.isEducator===0){
        this.state.prices = [];
        array[0] = "Stylist: "+freelancer.stylistRate;
        this.setState({prices :array});
    }
      console.log(this.state.prices)
    }
    handleSubmit = (e) => {
      e.preventDefault();
        // console.log(this.state.freelancer.id)
        // console.log(this.state.freelancer.date)
        // console.log(this.state.session)
      this.props.form.validateFields((err, fieldsValue) => {
        if (!err) {
          this.addBooking()
        }
  
        console.log('Received values of form: ', fieldsValue);
      });
    }
    handleSelectChange = (value) => {
      console.log(value);
      this.props.form.setFieldsValue({
        note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
      });
    }
    handleJobChange = (value) => {
      console.log(value);
      if(value==="Stylist")
      {
        this.state.price = "125";
        console.log(this.state.price)
      }

      this.props.form.setFieldsValue({
        note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
      });
    }
    addBooking=_=>{
      const {user} = this.state;
     axios.post('http://localhost:8080/stylistBooking/bookCalendar', {
            stylistCalendarID:this.state.freelancer.calendarID,
            salownOwnerID : 2

       }).then(res => {
         console.log(res);
          this.updateStylistCalandar()
                
       }).catch(err=>{
         console.log(err);
       });
 }
 updateStylistCalandar =()=>{
   console.log("nknkbkbkb")
  axios.get('http://localhost:8080/stylistCalendar/changeAvalableStatus', {
    params: {
        id :this.state.freelancer.calendarID,
    },
  })
  .then(response=>{
    console.log(response);
    });

 }
    render() {
      const { getFieldDecorator } = this.props.form;
      const {sessions} =this.state
      const {jobs} =this.state;
      const {prices} = this.state;
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
      let optionItems = jobs.map((job)=><option key={job}>{job}</option>)
      let priceOptions = prices.map((price)=> <option key={price}>{price}</option>)
      return (
        <Form onSubmit={this.handleSubmit}>
          <Form.Item
          {...formItemLayout}
          label="Session"
          // labelCol={{ span: 5 }}
          // wrapperCol={{ span: 12 }}
        >
          {getFieldDecorator('session', {
            rules: [{ required: true, message: 'Please select Session!' }],
          })(
                <Select
                  placeholder="Select a option and change input text above"
                  onChange={this.handleSelectChange}
                >
                {this.state.sessions.map((session) =><Select.Option key ={session.value} value={session.value}>{session.display}</Select.Option>)}
{/* 
                  <Option value="male">male</Option>
                  <Option value="female">female</Option> */}
            </Select>
            
          )}
        </Form.Item>
        <Form.Item
        {...formItemLayout}
          label="Job"
          // labelCol={{ span: 5 }}
          // wrapperCol={{ span: 12 }}
        >
          {getFieldDecorator('job', {
            rules: [{ required: true, message: 'Please select job!' }],
          })(
            <Select
              placeholder="Select a option and change input text above"
              onChange={this.handleJobChange}
            >
                {optionItems}
            </Select>
          )}
        </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="Rate"
          >
            {getFieldDecorator('Rate')(
               <Select
               placeholder="Select a option and change input text above"
               onChange={this.handleJobChange}
             >
                 {priceOptions}
             </Select>
            )}         
          </Form.Item>
          <Form.Item
            wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: { span: 16, offset: 8 },
            }}
          >
            <Button type="primary" htmlType="submit">Submit</Button>
          </Form.Item>
        </Form>
      );
    }
  }
  
  const WrappedTimeRelatedForm = Form.create()(TimeRelatedForm);
  
  export default WrappedTimeRelatedForm