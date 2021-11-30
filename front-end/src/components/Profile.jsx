import React from "react"
import {
	BrowserRouter as Link,
	Routes,
	Route,
	useHistory,
} from "react-router-dom"
import axios from "axios"
import { useState, useEffect } from "react"
import Post_abstract from "./Post/Post_abstract"
import "./Profile.css"

const Profile = () => {
	const history = useHistory()
	// This part is for authentication, please don't alter
	// Unauthenticated User cannot enter the profile page
	// The username is unique and is stored in localStorage. It can be accessed by localStorage.getItem("username").
	const jwtToken = localStorage.getItem("token") // the JWT token, if we have already received one and stored it in localStorage
	console.log(`JWT token: ${jwtToken}`) // debugging

	const [isLoggedIn, setIsLoggedIn] = useState(jwtToken && true) // if we already have a JWT token in local storage, set this to true, otherwise false

	// try to load the protected data from the server when this component first renders
	useEffect(() => {
		// send the request to the server api, including the Authorization header with our JWT token in it
		axios
			.get(`/protected`, {
				headers: { Authorization: `JWT ${jwtToken}` }, // pass the token, if any, to the server
			})
			.then((res) => {})
			.catch((err) => {
				console.log(
					"The server rejected the request for this protected resource... we probably do not have a valid JWT token."
				)
				setIsLoggedIn(false) // update this state variable, so the component re-renders
				history.push("/login")
			})
	}, []) // eslint-disable-line react-hooks/exhaustive-deps
	//authentication part ends

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
			setFirstName(userInfo.data.first_name)
			setAge(userInfo.data.age)
			setLastName(userInfo.data.last_name)
			setGender(userInfo.data.gender)
			setDesc(userInfo.data.description)
		}
		async function postData() {
			axios
				.post("/profile", {
					first_name: data.first_name,
					age: data.age,
					gender: data.gender,
					last_name: data.last_name,
					description: data.description,
				})
				.then(function (response) {
					console.log(response)
				})
				.catch(function (error) {
					console.log(error)
				})
		}
		fetchData()
		postData()
	}, [])
	const logout = () => {
		localStorage.removeItem("token")
		history.push("/")
	}
	return (
		<section>
			<div className="Profile">
				<h1>Profile</h1>
				<div>
					<img src="https://picsum.photos/200" />
				</div>
				<p>
					Name: {firstname} {lastname}
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
			<button onClick={logout}>Log out</button>
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
