import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import "./NewPost.css"
import axios from "axios"
import {Space,Select, Input, Cascader,Button} from 'antd' 
import { SettingOutlined } from '@ant-design/icons';


const NewPost = ({ onAdd }) => {

	const { TextArea } = Input;



	const history = useHistory()
	// This part is for authentication, please don't alter
	// Unauthenticated User cannot enter the new post page
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

	const [playlistName, setPlaylistName] = useState("")
	const [playlistLink, setPlaylistLink] = useState("")
	const [playlistCaption, setPlaylistCaption] = useState("")
	const user = localStorage.getItem("username");

	const addNewPost = (name,link,caption) => {
		const link_trim = link.split('/')[4];
		const user = localStorage.getItem("username");
		const new_post = {
			user : user,
			playlistName: name,
			playlistLink: link_trim,
			playlistCaption: caption
		}
		fetch('/newpost',{
			method : 'POST',
			body : JSON.stringify(new_post),
			headers : {
                'Content-Type': 'application/json'
            }		
		})
		.then(alert('you have succesfully created a new post'))
		console.log(new_post)
	}


	const onSubmit = (e) => {
		e.preventDefault()
		if (!playlistName) {
			alert("Please ad playlist name")
			return
		}

		if (!playlistLink) {
			alert("Please ad playlist link")
			return
		}

		addNewPost(
			playlistName,
			playlistLink,
			playlistCaption,
		)

		setPlaylistName("")
		setPlaylistLink("")
		setPlaylistCaption("")
	}

	return (
		<div className="parent">
			<h1>Spotify Music Sharing</h1>
			<form onSubmit={onSubmit}>
				<div className="newPost" >
					<div>You have logged in as: {user}</div>
					<div>
						Playlist Name:
						<input
							name="playlistName"
							className="nameInput"
							type="text"
							placeholder="Playlist Name Here ..."
							value={playlistName}
							onChange={(e) => {
								setPlaylistName(e.target.value)
							}}
						/>
					</div>
					<div>
						Playlist Link:
						<input
							name="playlistLink"
							className="linkInput"
							type="url"
							placeholder="Pasta Playlist Link Here"
							value={playlistLink}
							onChange={(e) => {
								setPlaylistLink(e.target.value)
							}}
						/>
						
					</div>

					<div>
						Caption:
						<input
							name="caption"
							className="captionInput"
							type="text"
							placeholder="Write a Caption ..."
							value={playlistCaption}
							onChange={(e) => {
								setPlaylistCaption(e.target.value)
							}}
						/>
					</div>

					<div id="share">
						<input type="submit" value="Save Post and Share" />
					</div>
				</div>
			</form>
		</div>
	)
}

export default NewPost
