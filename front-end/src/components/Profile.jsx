import React from "react"
import {
	BrowserRouter as Link,
	Routes,
	Route,
	useHistory,
} from "react-router-dom"
import {Card} from "antd"
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
	const username = localStorage.getItem("username")
	const [edit, showEdit] = React.useState(false)
	const [butname, editButName] = React.useState("Edit Profile")
	const [file, selectedFile] = React.useState(null)
	const [data, setData] = useState([])
	const userId = 1 //this should be get from database, now just hard coded
	const [name, setName] = React.useState("")
	// const [lastname, setLastName] = React.useState("Last Name Here")
	const [age, setAge] = React.useState("")
	const [gender, setGender] = React.useState("")
	const [desc, setDesc] = React.useState("")

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
	const postData = async () => {
		if (edit) {
			console.log("post")
			console.log(gender)
			console.log(desc)
			if (gender === "male" || gender === "female") {
				console.log("percede")
				axios
					.post("/profile", {
						username: username,
						gender: gender,
						description: desc,
					})
					.then(function (response) {
						console.log(response)
					})
					.catch(function (error) {
						console.log(error)
					})
			}
		}
	}

	const overall = () => {
		postData()
		toggleEdit()
		buttonName()
	}

	//fetch the data from backend
	useEffect(() => {
		console.log(username)
		axios
			.get("/profile/posts", {
				params: {
					username: username,
				},
			})
			.then((res) => {
				console.log(res.data)
				setData(res.data)
			})
			.catch((e) => {
				console.log(e.response)
			})
		axios
			.get("/profile", {
				params: {
					username: username,
				},
			})
			.then((res) => {
				console.log(res.data)
				setName(res.data.username)
				setGender(res.data.gender)
				setDesc(res.data.description)
			})
			.catch((e) => {
				console.log(e.response)
			})
	}, [])
	const logout = () => {
		localStorage.removeItem("token")
		history.push("/")
	}
	return (
		<section>
			<div className="Profile">
				<Card>
				<h1>Profile</h1>
				{/* <div>
					<img src="https://picsum.photos/200" />
				</div> */}
				<p>Name: {username}</p>
				<p>Gender: {gender}</p>
				<p>{desc}</p>
				</Card>
			</div>
			<button onClick={overall}>{butname}</button>
			<p className={edit ? "" : "hidden"}>
				{/* <form className="first_name">
					<label>
						Enter your name:
						<input
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</label>
				</form> */}
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
					<Post_abstract className="post" key={item._id} details={item} />
				))}
			</section>
		</section>
	)
}

export default Profile
