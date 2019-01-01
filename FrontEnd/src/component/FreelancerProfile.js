import React from 'react';
import { List, Card,Rate, Input,Tag, Button   } from 'antd';
import axios from 'axios'
import'./CSS/freelancerProfile.css'
import HeaderLayout from '../component/Header';
import FreelancerCalender from '../component/FreelancerCalender';


const { Meta } = Card;
const { TextArea } = Input;

  
class FreelancerProfile extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            freelancer:{
                id :this.props.location.data,
                isStylist :this.props.location.isStylist,
                isEducator : this.props.location.isEducator,
                firstName : '',
                lastName : '',
                bio : '',
                experience: '',
                stylistRate : '',
                educatorRate:''
            },
            job:[],
            size:'large',          
        }
    }
    getStylistById=()=>    
    {
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
        console.log(this.state.freelancer)
      })
     this.getFreelancerJob();
      }
    render(){
        const {freelancer} = this.state;
        const {job} = this.state;
        const {size} = this.state;
        return(
            <div>
                <HeaderLayout/>
            
                <div className="row no-gutters">
                    <div className="col-3">
                        <div className="profile">
                            <Card
                            hoverable
                            style={{ width: 450}}
                            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                            >
                                <Meta
                                title={"Name : "+freelancer.firstName+ " " + freelancer.lastName}
                                description={"Experience : "+freelancer.experience}
                                />
                            </Card>
                        </div>
                        <div style={{ margin: '10px 0' }} />
                            <div className="userBio">
                                 <TextArea placeholder="Stylist Bio" value={freelancer.bio}  autosize={{ minRows: 2, maxRows: 6 }}/>   
                            </div>     
                            <div >
                            <div > 
                                
                                <h4>Job Title :
                                <div className="row justify-content-around">
                                <div className="col-4"> 
                                    <List
                                    grid={{
                                    gutter: 16,  xs: 1, sm: 2, md: 2,lg: 2, xl: 2, xxl: 3,
                                    }}
                                    dataSource={job}
                                    renderItem={item => (
                                        <List.Item style={{float:'right'}}>
                                            <Tag backgroundcolor="#1a2930" color ="#1a2930"size={size} >{item}</Tag>
                                        </List.Item>
                        
                                    )}/>
                                    
                                </div>
                                </div>
                                </h4>
                            <div className="row justify-content-center">
                                <div className="col-4">                                
                                <Button type="primary" href="/viewBooking"size={size} style={{background:"#1a2930", borderBlockEndColor:"#f7ce3e", color:"#f7ce3e"}}>View Booking</Button>
                                </div>
                                </div>
                            </div>
                         </div>
                                
                        </div>                     
                     
                     <div className="col-9">
                        <div className="info">
                             <FreelancerCalender freelancer={freelancer.id}/>
                         </div>
                     </div>
                       
                </div>
                </div>
            


        )
    }
}
export default FreelancerProfile;