import React from 'react';
//import ReactDOM from 'react-dom';
import './CSS/search.css'
import axios from 'axios'
import { DatePicker } from 'antd';
import { List, Card,Rate } from 'antd';
import { Link } from 'react-router-dom'
const { Meta } = Card;

class SearchStylist extends React.Component{

    constructor(props){
        super(props);
        this.state ={
            freelancer : {
                isStylist:'',
                isEducator:'', 
                stylistRate:'',
                educatorRate:'',
                minValue:'',
                maxValue:'',
                firstName:'',
                experience:''               
    
            },
            stylistCalender:{
                date:'',
                session:'',
                isAvailable:'',
            },
            stylist:[],
            size:'large',
            value: 3,
            
        }
    }
       getStylistByJob=()=>
    {
        const {stylist} = this.state;
        axios.get('http://localhost:8080/stylist/getFreelancerByJob', {
            params: {
                isStylist : this.state.freelancer.isStylist,
                isEducator : this.state.freelancer.isEducator
            }
      })
      .then(response=>{
        console.log(response.data);
           this.setState({stylist : response.data})    
        });
        console.log(this.state.stylist);
    }
   
    getStylistByDate=()=>
    {      
      axios.get('http://localhost:8080/stylist/getAvailableStylistByDate', {
        params: {
            date : this.state.stylistCalender.date
        }
      })
      .then(response=> {
        console.log(response);
        this.setState({stylist : response.data})    
      })

    }

    getStylistBySession=()=>
    {
      axios.get('http://localhost:8080/stylist/getAvailableStylistBySession', {
        params: {
            date :this.state.stylistCalender.date,
            sessionId : this.state.stylistCalender.session
        }
      })
      .then(response=>{
        console.log(response.data);
           this.setState({stylist : response.data})    
        });
        console.log(this.state.stylist);
    }

    getStylistByDateSession=()=>
    {
      axios.get('http://localhost:8080/stylist/getAvailableStylistByDateSession', {
        params: {
            date: this.state.stylistCalender.date,
            sessionId : this.state.stylistCalender.session
        }
      })
      .then(response=>{
        console.log(response.data);
           this.setState({stylist : response.data})    
        });
        console.log(this.state.stylist);
    }
    getStylistByPrice=()=>
    {  
      axios.get('http://localhost:8080/stylist/getAvailableStylistByPrice', {
        params: {
            min : this.state.freelancer.minValue,
            max: this.state.freelancer.maxValue
        }
      })
      .then(response=>{
        console.log(response.data);
           this.setState({stylist : response.data})    
        });
        console.log(this.state.stylist);
    }
    getStylistsByJobDate=()=>{
        axios.get('http://localhost:8080/stylist/getAvailableStylistsByJobDate', {
        params: {
            date : this.state.stylistCalender.date,
            isStylist: this.state.freelancer.isStylist,
            isEducator :this.state.freelancer.isEducator
        }
      })
      .then(response=>{
        console.log(response.data);
           this.setState({stylist : response.data})    
        });
        console.log(this.state.stylist);
    }
    getStylistsByJobPrice=()=>{
        axios.get('http://localhost:8080/stylist/getAvailableStylistsByJobPrice', {
        params: {
            min : this.state.freelancer.minValue,
            max : this.state.freelancer.maxValue,
            isStylist: this.state.freelancer.isStylist,
            isEducator :this.state.freelancer.isEducator
        }
      })
      .then(response=>{
        console.log(response);
           this.setState({stylist : response.data})    
        });
        console.log(this.state.stylist);
    }
    
    handleJobChange=(event)=>
    {
        // console.log(event.target.value);
        const {freelancer} = this.state;
        
        if(event.target.value == "S"){
            console.log("l")
            freelancer.isEducator =0;
            freelancer.isStylist =1;
            
        }else if(event.target.value == "E"){
            console.log("p")
            freelancer.isStylist =0;
            freelancer.isEducator= 1;
        }
        else if(event.target.event == "D"){
            alert("Select Job");
        }
        console.log(this.state.freelancer)

    }

    handleDateChange=(date, dateString)=> 
    {
        const {stylistCalender} = this.state;
        console.log(date, dateString);
        stylistCalender.date = dateString;
        console.log(stylistCalender);
        

      }
      handleSessionChange =(event) =>
      {
          const {stylistCalender} = this.state;
          console.log(event.target.value);
          if(event.target.value == "session1")
          {
              stylistCalender.session = 1;
          }
          else if(event.target.value == "session2")
          {
              stylistCalender.session = 2;
          }
          else if(event.target.value == "session3")
          {
              stylistCalender.session = 3;
          }
          
      }
      handlePriceChange=(event)=>
      {
          const {freelancer} = this.state;
          console.log(event.target.value);
          if(event.target.value == "rate1")
          {
              freelancer.maxValue = 20;
              freelancer.minValue = 0;
          }
          else if(event.target.value == "rate2")
          {
              freelancer.maxValue = 50;
              freelancer.minValue = 20;
          }
          else if(event.target.value == "rate3")
          {
              freelancer.maxValue = 80;
              freelancer.minValue = 50;
          }
          console.log(freelancer);
      }

      filterFreelancer=()=>{
          const{freelancer} = this.state;
          const{stylistCalender} = this.state;
        console.log("ghjkab")

        if(freelancer.isStylist === "" && freelancer.isEducator === "" && freelancer.minValue === "" && freelancer.maxValue === "" && stylistCalender.date === "" && stylistCalender.session ==="")
        {
            alert("Please Select Job");
        }
        else if((freelancer.isStylist != "" || freelancer.isEducator != "") && stylistCalender.date != "")
        {
            this.getStylistsByJobDate();
        }
        else if((freelancer.isStylist != "" || freelancer.isEducator != "") && (freelancer.maxValue != ""&& freelancer.minValue != ""))
        {
            this.getStylistsByJobPrice();
        }
        else if(stylistCalender.date != "" && stylistCalender.session !="")
        {
            this.getStylistByDateSession();
        }
        else if(freelancer.isStylist != "" || freelancer.isEducator != "" )
        {
            
            this.getStylistByJob();
        }
        else if(freelancer.minValue != "" || freelancer.maxValue != "")
        {            
            this.getStylistByPrice()
        }
        else if(stylistCalender.date != "")
        {
            this.getStylistByDate()
        }
        else if(stylistCalender.session !="")
        {
            this.getStylistBySession();
        }
       
        this.setSearch();
    }

    setSearch=()=>{
        this.props.setSearch(this.state)
    }

    handleChange = (value) => {
        this.setState({ value });
      }
    render(){
        const { value } = this.state;
        const {freelancer} = this.state;
        const {stylist} = this.state;
        const { size } = this.state;
        return(
            <div>
            <div className ="design">
                <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"></link>
                <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
                <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    
                <div className="container-fluid bg-container ">
                    <div className="row align-items-center justify-content-center">
                                        <div className="col-md-2 pt-3">
                                        <div className="form-group ">
                                            <select id="stylistJobs " className="form-control" onChange ={this.handleJobChange} defaultValue="D">
                                                <option value ="D" disabled>Job Description</option>
                                                <option value="S">Stylist</option>
                                                <option value="E">Educator</option>
                                            </select>
                                        </div>
                                        </div>
                                        <div className="col-md-2 pt-3">
                                        <div className="form-group">
                                        <DatePicker size={size} onChange={this.handleDateChange}/>
                                        </div>
                                        </div>
                                        <div className="col-md-2 pt-3">
                                            <div className="form-group">
                                            <select id="session" className="form-control" defaultValue="D" onChange={this.handleSessionChange}>
                                            <option  value ="D" disabled>Session</option>
                                                <option value="session1">08.00 a.m. - 12.00 p.m.</option>
                                                <option value="session2">01.00 p.m. - 05.00 p.m.</option>
                                                <option  value="session3">06.00 p.m. - 10.00 p.m.</option>
                                            </select>
                                            </div>
                                        </div>
                                        <div className="col-md-2 pt-3">
                                            <div className="form-group">
                                            <select id="inputState" className="form-control" defaultValue="D" onChange={this.handlePriceChange}>
                                                <option value="D" disabled>Price Rate</option>
                                                <option value="rate1">$0 - $20</option>
                                                <option value="rate2">$20 - $50</option>
                                                <option value="rate3">$50 -$80</option>                                        
                                            </select>
                                            </div>
                                        </div>
                                        <div className="col-md-2">
                                        <button type="button" className="search" onClick={this.filterFreelancer}>Search</button>
                                        </div>
                                    </div>
                </div>
                </div>
                <List
                className="col-6"
                grid={{
                gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3,
                }}
                dataSource={stylist}
                renderItem={item => (
                <Link key={item.id} to={{ pathname: "/freelancerProfile", data: item.id, isStylist: item.isStylist, isEducator: item.isEducator }}>
              <List.Item >
              <Card title={item.firstName} className="col-auto mr-auto" style={{background:"#F7882F"}}>
                <Card cover={<img alt="example" src="https://cdn2.iconfinder.com/data/icons/avatar-2/512/iri_girl_face-512.png" className="col"/>} >
                                                <Meta title={"Name : "+item.firstName+" " +item.lastName}/>
                                                <Meta title={"Experience: "+item.experience} />
                                                <Meta title={"StylistRate : "+item.stylistRate} />
                                                <Meta title={"EducatorRate : "+item.educatorRate} />
                                                {/* <span>
                                                  <Rate disabled onChange={this.handleChange} value={value} />
                                                  {value && <span className="ant-rate-text">{value} stars</span>}
                                              </span> */}
                                            </Card>
              </Card> 

              </List.Item>
              </Link>
            )}
          />
                </div>
               
        )
    }
    

}


export default SearchStylist;