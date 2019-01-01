import React from 'react';
import {
  Form, Select, InputNumber, Switch, Radio,
  Slider, Button, Upload, Icon, Rate, Checkbox,
  Row, Col,List, Card, Input,Tag,Calendar 
} from 'antd';
import HeaderLayout from'./Header'
import axios from 'axios'
import './CSS/freelancerInfo.css'
import FreelancerInfoUpdateForm from './FreelancerProfileUpdate'
import moment from 'moment';
const { Option } = Select;

const { Meta } = Card;
class FreelancerInfo extends React.Component{
  constructor(props){
    super(props);
    this.state={
      value: moment(),
      selectedValue: moment(),
      freelancer:{
        id:this.props.freelancer,
        firstName:'',
        lastName:'',
        experience:'',
        bio:'',
        educatorRate:'',
        stylistRate:'',
      },
      job:[],
      booking:[]
    }
  }
 
  getStylistById=()=>    
  {
      const { freelancer} = this.state;
      console.log(freelancer.id)
    axios.get('http://localhost:8080/stylist/getstylistById', {
      params: {
         id:freelancer.id
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
      console.log(this.state.freelancer)
      
    })
   this.getFreelancerJob();
  }
  getFreelancerJob=()=>
  {
      const{freelancer} = this.state;
      const {job} = this.state;
      let array = this.state.job.slice(); //creates the clone of the state
      
      if(freelancer.isEducator=== 1 && freelancer.isStylist===1){
          this.state.job = [];
          array[0] = "Stylist";
          array[1] = "Educator";
          this.setState({job :array});
      }
      else if(freelancer.isEducator===1  && freelancer.isStylist===0){
          this.state.job = [];
          array[0] = "Educator";
          this.setState({job :array});
      }
      else if(freelancer.isStylist ===1 && freelancer.isEducator===0){
          this.state.job = [];
          array[0] = "Stylist";
          this.setState({job :array});
      }
      console.log(job)
  }
  componentDidMount=()=>
  {
    this.getStylistById();
    this.getBookingDates();
    
  }
  getBookingDates=()=>
  {
    const  {booking} = this.state
    const {freelancer} = this.state
    axios.get('http://localhost:8080/stylistBooking/getBookings', {
    params: {
       id:this.state.freelancer.id
    }
  })
  .then(response => {
    console.log(response.data)
    this.setState({booking:response.data})
    console.log(booking)

  })
    
  }

  getListData(value) {

    var valueDate=value.date();
    var valueMonth=value.month();
    var valueYear=value.year();

 
    var mydate=''
    var mysaloon='';
    var myslot=''
    var myelement=''
    var arr=[];
    var todate
    var tomonth
    var toyear
     this.state.booking.forEach(element=>{
         var date=new Date(element.date)
          todate=date.getDate();
         tomonth=date.getMonth();
         toyear=date.getFullYear();
      
         if(todate===valueDate && tomonth===valueMonth&&toyear===valueYear){
            
         mydate=todate;
         mysaloon=element.salon_name;
         myslot=element.sessionName;
         myelement=element
         arr.push(myelement) 
         console.log(mysaloon)
         }
     })
     return [mydate,mysaloon,myslot,arr,tomonth,toyear]

   }


 dateCellRender(value) {
     var arr
    
     arr=this.getListData(value)[3];  

     if(value.date()===this.getListData(value)[0] && value.month()===this.getListData(value)[4]&& value.year()===this.getListData(value)[5]){
         console.log('return date',this.getListData(value)[3])
       
         return(
             <div>

                 {
                     <List style={{ fontSize: 10 }} dataSource={arr}
                         renderItem={item => (

                             <List.Item >
                                 <label>{item.salon_name+" "+item.sessionName}</label>
                                 <label>{item.slot}</label>
                             </List.Item>
                         )}
                     />
                 }
             </div>
     );
    }
     }

  onPanelChange=(value, mode)=> {
    console.log(value, mode);
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

    const{freelancer} = this.state

    return(
      <div>
        <div>
            <HeaderLayout/>   
         </div>
         <div className="row no-gutters">
         <div className="col-3">
         <div className="profile">
         <Card
            // hoverable
            style={{ width: 450}}
             cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
            >
            <Meta
            title={"Name : "+freelancer.firstName+ " " + freelancer.lastName}
            description={"Experience : "+freelancer.experience}
             />
           </Card>   
         </div>
         </div>
        
         <div className="col-3">
         {/* <div className="info" > */}
         <div className="col-auto mr-auto" style={{paddingTop:"120px"}}>
         <FreelancerInfoUpdateForm/>
         </div>
           
         {/* </div> */}
           
         </div>
         <div className="col-6">
         <div className="info">
         <Calendar fullscreen={true} onPanelChange={this.onPanelChange} style={{background:"#c5c1c0 "}} disabledDate={this.disabledDate}  dateCellRender={e=>this.dateCellRender(e)}/>
         </div>
        
         </div>
         </div>
      </div>
      )
  }
}


export default FreelancerInfo;