import { List, Card,Rate } from 'antd';
import React from 'react';
import axios from 'axios'

const { Meta } = Card;
const data = [
  {
    title: 'Title 1',
    value:2
  },
  // {
  //   title: 'Title 2',
  // },
  // {
  //   title: 'Title 3',
  // },
  // {
  //   title: 'Title 4',
  // },
  // {
  //   title: 'Title 5',
  // },
  // {
  //   title: 'Title 6',
  // },
];
class Freelancers extends React.Component{
  
  constructor(props){
    super(props)
    this.state = {
      value: 3,
    }
  
  }
  getStylistByJob=()=>
    {
        axios.get('http://localhost:8080/stylist/getFreelancerByJob', {
            params: {
                isStylist : this.props.search.freelancer.isStylist,
                isEducator : this.props.search.freelancer.isEducator
            }
      })
      .then(function (response) {
        console.log(response);
      })

      
    }
 
  handleChange = (value) => {
    this.setState({ value });
  }
  getStylistDetails=()=>{

  }
  
 render()
  {
    const { value } = this.state;
    console.log(this.props.search);
    
      return(
          <List
            grid={{
              gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3,
            }}
            dataSource={data}
            renderItem={item => (
              <List.Item>
              <Card title={item.title}>
                <Card cover={<img alt="example" src="https://pngimage.net/wp-content/uploads/2018/05/avatar-profile-png-2.png" />} >
                                                <Meta title={item.first_name + " " + item.last_name} />
                                                <Meta title={item.email} />
                                                <Meta title={item.phone} />
                                                <Meta title={item.city} />
                                                <Meta title={item.price} />
                                                <span>
                                                  <Rate disabled onChange={this.handleChange} value={value} />
                                                  {value && <span className="ant-rate-text">{value} stars</span>}
                                              </span>
                                            </Card>
              </Card> 

              </List.Item>
            )}
          />
        );
  
  }
}


export default Freelancers;
