import React from "react"
import { Button, Descriptions } from "antd"
import { BrowserRouter as Link, Routes, Route } from "react-router-dom"
import axios from "axios"
import { useState, useEffect } from "react"
import Post_abstract from "./Post/Post_abstract"
import "./Profile.css"

const Profile = () => {
	const [edit, showEdit] = React.useState(false)
	const [butname, editButName] = React.useState("Edit Profile")
	const [file, selectedFile] = React.useState(null)
	const [data, setData] = useState([])

	const fileSelectedHandler = (event) => {
		selectedFile(event.target.files[0])
	}

	const toggleEdit = () => {
		showEdit(!edit)
		console.log(edit)
	}

	const buttonName = () => {
		if (edit === false) {
			editButName("Save Changes")
		} else {
			editButName("Edit Profile")
		}
	}

	const overall = () => {
		toggleEdit()
		buttonName()
	}

	const userId = 1 //this should be get from database, now just hard coded
	const [firstname, setFirstName] = React.useState("First Name Here")
	const [lastname, setLastName] = React.useState("Last Name Here")
	const [age, setAge] = React.useState("Age Here")
	const [gender, setGender] = React.useState("Gender Here")
	const [desc, setDesc] = React.useState("Description Here")
	//fetch the data from backend
	useEffect(() => {
		async function fetchData() {
			//fetch the past posts data
			const result = await axios("/profile/posts?id=" + userId)
			setData(result.data)
			//fectch the user information data
			const userInfo = await axios("/profile?id=" + userId)
			console.log(userInfo.data.age)
			setFirstName(userInfo.data.first_name)
			setAge(userInfo.data.age)
			setLastName(userInfo.data.last_name)
			setGender(userInfo.data.last_name)
			setDesc(userInfo.data.description)
		}
		fetchData()
	}, [])

	return (
		<section>
			<div className="Profile">
				<h1>Profile</h1>
				<div>
					<img src="https://picsum.photos/200" />
				</div>
				<p>
					Name: {firstname} + '' + {lastname}
				</p>
				<p>Age: {age}</p>
				<p>Gender: {gender}</p>
				<p>{desc}</p>
			</div>
			<button onClick={overall}>{butname}</button>
			<p className={edit ? "" : "hidden"}>
				<form className="first_name">
					<label>
						Enter your first name:
						<input
							type="text"
							value={firstname}
							onChange={(e) => setFirstName(e.target.value)}
						/>
					</label>
				</form>
				<form className="last_name">
					<label>
						Enter your last name:
						<input
							type="text"
							value={lastname}
							onChange={(e) => setLastName(e.target.value)}
						/>
					</label>
				</form>
				<form className="age">
					<label>
						Enter your age:
						<input
							type="text"
							value={age}
							onChange={(e) => setAge(e.target.value)}
						/>
					</label>
				</form>
				<form className="gender">
					<label>
						Enter your gender:
						<input
							type="text"
							value={gender}
							onChange={(e) => setGender(e.target.value)}
						/>
					</label>
				</form>
				<form className="description">
					<label>
						Enter your biograpghy:
						<input
							type="text"
							value={desc}
							onChange={(e) => setDesc(e.target.value)}
						/>
					</label>
				</form>
			</p>
			<h2 id="previous_post_header">Previous Posts</h2>
			<section className="posts">
				{data.map((item) => (
					<Post_abstract className="post" key={item.id} details={item} />
				))}
			</section>
		</section>
	)
}

export default Profile
