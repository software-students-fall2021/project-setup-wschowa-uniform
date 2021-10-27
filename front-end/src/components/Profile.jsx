import React from 'react'
import { Descriptions } from 'antd';
import {BrowserRouter as Link } from "react-router-dom";


const Profile = ({name,gender,age,desc}) => {
        return(
            <header className = 'header'>
              <Descriptions.Item className = 'pic' picture = "pfp">
                  <img src="https://picsum.photos/200"/></Descriptions.Item>
                <Descriptions title="User Info" bordered>
              <Descriptions.Item className='name' label="UserName">
                  {name}
                </Descriptions.Item>
              <Descriptions.Item className='gender' label="Gender">
                {gender}</Descriptions.Item>
                <Descriptions.Item className='age' label="Age">{age}</Descriptions.Item>
              <Descriptions.Item label="Stats">
                # Posts # Followings # Followers
                </Descriptions.Item>
              <Descriptions.Item className='desc' label="Description">
                {desc}
              </Descriptions.Item>
              </Descriptions>
            <Link to='./InfoAdd' >
              <button>Edit Profile</button>
              </Link>
            </header>

            ) 
}

Profile.defaultProps = {
  name : 'Name',
  gender : 'Gender',
  age : 'Age',
  desc : 'Description',
}

export default Profile