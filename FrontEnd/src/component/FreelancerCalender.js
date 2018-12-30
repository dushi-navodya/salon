import React from 'react';
import { Calendar, Badge, Modal, DatePicker, TimePicker } from 'antd';
import './CSS/freelancerCalender.css'
import moment from 'moment';
import axios from 'axios'
import Booking from'./FreelancerBooking'


class FreelancerCalender extends React.Component{
    constructor(props){
        super(props);
        
        this.state={
          modal2Visible: false,
          value: moment(),
          selectedValue: moment(),
          freelancer:{
            id :this.props.freelancer,
            isStylist :'',
            isEducator : '',
            firstName : '',
            lastName : '',
            bio : '',
            experience: '',
            stylistRate : '',
            educatorRate:'',
        },
        bookingDetails : {

        },
        booking:[]
        }
    }
      
      
      onSelect = (value) => {
        const {freelancer}=this.state
        this.setState({
          value,
          selectedValue: value,
        });
        this.setModal2Visible(true)
        this.getAavailableSession()
      }
    
      onPanelChange = (value) => {
        this.setState({ value });
      }
      componentWillMount(){
        const { freelancer} = this.state;
      axios.get('http://localhost:8080/stylist/getstylistById', {
        params: {
           id:this.state.freelancer.id
        }
      })
      .then(response => {
        console.log(response.data[0]);
        this.setState({ freelancer: { ...this.state.freelancer, firstName: response.data[0].firstName } });
        this.setState({ freelancer: { ...this.state.freelancer, lastName: response.data[0].lastName } });
        this.setState({ freelancer: { ...this.state.freelancer, bio: response.data[0].bio } });
        this.setState({ freelancer: { ...this.state.freelancer, educatorRate: response.data[0].educatorRate } });
        this.setState({ freelancer: { ...this.state.freelancer, stylistRate: response.data[0].stylistRate } });
        this.setState({ freelancer: { ...this.state.freelancer, experience: response.data[0].experience } });
        // console.log(this.state.freelancer)
        
        
      })
     
      }
      getAavailableSession=()=>{
        const {selectedValue} = this.state
        var date = selectedValue && selectedValue.format('YYYY-MM-DD')
        console.log(date)
        console.log(this.state.freelancer.id)
        const{booking} = this.state
        const {freelancer} =this.state;

        axios.get('http://localhost:8080/stylistCalendar/getAvailableSession', {
          params: {
             id : freelancer.id,
             date: date
          }
        })
        .then(response => {
          console.log(response)
          this.state.booking = response.data
          console.log(this.state.booking) 
          
                  
        })
      }
      setModal2Visible(modal2Visible) {
        this.setState({ modal2Visible });
        console.log("kefh")
        console.log(this.state.booking) 
      }
    disabledDate=(current)=>{
        const {value} = this.state
        const {unavailableDates} = this.state
        // console.log(getAavailableDates)
        if (!current) {
          return false;
        }
        const date = moment();
        date.hour(0);
        date.minute(0);
        date.second(0);
        return current.valueOf() < date.valueOf();  // can not select days before today
    }
    
    render(){
      const { value, selectedValue } = this.state;
      const {size}= this.state
      const{freelancer} = this.state
      const {booking} = this.state
        return(
            <div>
                <Calendar value={value} onSelect={this.onSelect} onPanelChange={this.onPanelChange} size={size} disabledDate={this.disabledDate} style={{backgroundColor:"#F7882F",color:"black", padding:"10px"}}/>
                <Modal
                    style ={{background:"#F7882F", color:"black"}}
                    title={freelancer.firstName}
                    centered
                    visible={this.state.modal2Visible}
                    onOk={() => this.setModal2Visible(false)}
                    onCancel={() => this.setModal2Visible(false)}
                  >
                    <p>You selected date: {selectedValue && selectedValue.format('YYYY-MM-DD')}`</p>
                    {/* <p>some contents...</p>
                    <p>some contents...</p> */}
                    <Booking freelancer={freelancer.id} selectedValue={selectedValue && selectedValue.format('YYYY-MM-DD')} booking={booking}/>
                  </Modal>
            </div>
        )
    }

}

export default FreelancerCalender;