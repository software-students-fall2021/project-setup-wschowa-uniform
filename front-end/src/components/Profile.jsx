import React from "react"
import { Button, Descriptions } from "antd"
import { BrowserRouter as Link } from "react-router-dom"
import axios from "axios"
import { useState, useEffect } from "react"
import Post_abstract from "./Post/Post_abstract"
import "./Profile.css"

const Profile = ({ name, gender, age, desc }) => {
	const [data, setData] = useState([])

	useEffect(() => {
		async function fetchData() {
			const result = await axios(
				"https://my.api.mockaroo.com/post.json?key=99391580"
			)
			setData(result.data)
		}
		fetchData()
	}, [])
	return (
		<header className="header">
			<Descriptions.Item className="pic" picture="pfp">
				<img src="https://picsum.photos/200" />
			</Descriptions.Item>
			<Descriptions title="User Info" bordered>
				<Descriptions.Item className="name" label="UserName">
					{name}
				</Descriptions.Item>
				<Descriptions.Item className="gender" label="Gender">
					{gender}
				</Descriptions.Item>
				<Descriptions.Item className="age" label="Age">
					{age}
				</Descriptions.Item>
				<Descriptions.Item label="Stats">
					# Posts # Followings # Followers
				</Descriptions.Item>
				<Descriptions.Item className="desc" label="Description">
					{desc}
				</Descriptions.Item>
			</Descriptions>
			<Button type="primary" href="/editProfile">
				Edit Profile
			</Button>
			<h2>Previous Posts</h2>
			<section className="posts">
				{data.map((item) => (
					<Post_abstract className="post" key={item.id} details={item} />
				))}
			</section>
		</header>
	)
}

Profile.defaultProps = {
	name: "Name",
	gender: "Gender",
	age: "Age",
	desc: "Description",
}

export default Profile
