import { React, useEffect, useState } from "react"
import axios from "axios"
import { Button } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import Comments from "./Comments"
import "./SeePost.css"

function SeePost(props) {
	const [data, setData] = useState({})
	const [user, setUser] = useState({})
	const [ownername, setOwnername] = useState("")
	const [uri, setUri] = useState("")
	const [comments, setComments] = useState([])
	const [name, setName] = useState("")
	const [content, setContent] = useState("")

	let history = useHistory()
	const { parameter1 } = props.match.params
	const BASE_URL = "/seepost?id=" + parameter1
	const username = localStorage.getItem("username")
	const fetchdata = async () => {
		axios
			.get(BASE_URL)
			.then((res) => {
				setData(res.data)
				setUri(
					"https://open.spotify.com/embed/playlist/" + res.data.playlist_link
				)
				setUser(res.data.user)
				setComments(res.data.comments)
				setName(res.data.playlist_name)
				setOwnername(res.data.user.username)
			})
			.catch((e) => {
				console.log(e.response)
			})
	}
	useEffect(async () => {
		fetchdata()
	}, [])
	const handleRoute = () => {
		history.push("/")
	}
	const handleSubmit = async () => {
		axios
			.post(BASE_URL, {
				username: username,
				content: content,
			})
			.then(function (res) {
				// console.log(res)
				console.log("success")
				// history.go(0)
				setContent("")
				fetchdata()
			})
			.catch(function (e) {
				console.log(e.response)
			})
	}
	// console.log(data)
	// console.log(user)
	// console.log(comments)
	// console.log(username)
	return (
		<div className="container">
			<div className="owner-info">
				<h2 className="title">Title: {name}</h2>
				<h3 className="owner">Creater: {ownername}</h3>
			</div>
			<div id="playlist_embed" title="spotify">
				<iframe
					title="spotify embed"
					height="400"
					src={uri}
					frameBorder="0"
					allow="encrypted-media;"
				></iframe>
			</div>
			<section className="addComments">
				<textarea
					className="input"
					name="description"
					onChange={(e) => setContent(e.target.value)}
					placeholder="Maybe you want to comment here..."
					rows="4"
					cols="50"
				></textarea>
				<button className="button" onClick={handleSubmit}>
					Submit
				</button>
			</section>
			<section className="comments">
				{comments.map((item) => (
					<Comments key={item._id} details={item} />
				))}
			</section>
		</div>
	)
}

export default SeePost
