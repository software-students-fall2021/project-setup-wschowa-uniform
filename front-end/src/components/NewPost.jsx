import React, { useEffect, useState } from "react"
import "./NewPost.css"
import axios from "axios"


const NewPost = ({onAdd}) => {

const [playlistName, setPlaylistName] = React.useState('')
const [playlistLink, setPlaylistLink] = React.useState('')
const [playlistCaption, setPlaylistCaption] = React.useState('')

const onClick = (event) =>{
	console.log(event);
}

const onSubmit = (e)=>{
	e.preventDefault()
	if(!playlistName){
		alert('Please ad playlist name')
		return
	}

	if(!playlistLink){
		alert('Please ad playlist link')
		return
	}

	onAdd({
		playlistName, playlistLink, playlistCaption
	})

	setPlaylistName('')
	setPlaylistLink('')
	setPlaylistCaption('') 
}

// const addPost = async (newPost) =>{
//TODO: add db later to fetch data
// 	const res = await fetch('',{ 
// 		method = 'POST',
// 		headers : {
// 			'Content-Type' : 'application/json'
// 		},
// 		body : JSON.stringify(newPost)
// 	})

// 	const data = res.json()

// 	setPlaylistName([...playlistName, data])

// 	// setPlaylistName([...playlistName,newName])
// }


	return (

		<div className="parent">
			<h1>Spotify Music Sharing</h1>
			<form action="/upload" method="POST" encType="multipart/form-data">
			<div className="newPost" onSubmit={onSubmit} >
			<div>You have logged in as: User Name</div>
				<div>
					Playlist Name:  
					<input
						name="playlistName"
						className="nameInput"
						type="text"
						placeholder="Playlist Name Here ..."
						value = {playlistName} onChange={(e)=>{
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
						value = {playlistLink} onChange = {(e)=>{
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
						value = {playlistCaption} onChange= {(e)=>{
							setPlaylistCaption(e.target.value)
						}}
					/>
				</div>
				<div id="share">
				<input type="submit" onClick={onClick} value = "Save Post and Share" />
			</div>
			</div>
			</form>
		</div>
	)
}

export default NewPost
