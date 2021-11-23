import "./Signup.css"
import { Image, Alert } from "react-bootstrap"
import { useState } from "react"
import { useHistory } from "react-router-dom"
import axios from "axios"

function Signup(props) {
	let history = useHistory()
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [repeatPassword, setRepeatPassword] = useState("")
	// const [birthday, setBirthday] = useState("")
	const [gender, setGender] = useState("")
	const [description, setDescription] = useState("")
	const [alert, setAlert] = useState("")
	const [showAlert, setShowAlert] = useState(false)
	// console.log("hi")
	const handleSubmit = async () => {
		// console.log(username)
		if (
			username === "" ||
			password === "" ||
			repeatPassword === "" ||
			// birthday === "" ||
			gender === "" ||
			description === ""
		) {
			setAlert("Every field is required")
			setShowAlert(true)
		} else if (password !== repeatPassword) {
			console.log(password)
			console.log(repeatPassword)
			setAlert("Passwords are not match")
			setShowAlert(true)
		} else {
			setShowAlert(false)
			console.log("everything ok")
			axios
				.post("/signup", {
					username: username,
					password: password,
					// birthday: birthday,
					gender: gender,
					description: description,
				})
				.then(function (response) {
					console.log(response)
					history.push("login")
				})
				.catch(function (error) {
					console.log(error)
					setShowAlert(true)
					setAlert(error)
				})
		}
	}
	return (
		<div className="signup_body">
			<Alert
				variant="danger"
				onClose={() => setShowAlert(false)}
				show={showAlert}
				dismissible
			>
				<p>{alert}</p>
			</Alert>
			{/* <Image
					className="signup_image"
					// src="https://picsum.photos/100/150"
					alt="profile picture"
					roundedCircle
				/> */}
			<div>
				<input
					className="signup_input"
					type="text"
					onChange={(e) => setUsername(e.target.value)}
					placeholder="Username"
				></input>
				<input
					className="signup_input"
					type="password"
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Password"
				></input>
				<input
					className="signup_input"
					name="password_retype"
					type="password"
					onChange={(e) => setRepeatPassword(e.target.value)}
					placeholder="Re-enter password"
				></input>
				{/* <input
					className="signup_input"
					name="birthday"
					type="text"
					onChange={(e) => setBirthday(e.target.value)}
					placeholder="Birthday: MM/DD/YYYY"
				></input> */}
				<input
					className="signup_input"
					type="text"
					name="gender"
					onChange={(e) => setGender(e.target.value)}
					placeholder="Gender Male/Female"
				></input>
				<textarea
					className="signup_input"
					name="description"
					onChange={(e) => setDescription(e.target.value)}
					placeholder="Maybe you want to introduce yourself here..."
					rows="4"
					cols="50"
				></textarea>
			</div>
			<button onClick={handleSubmit} class="btn btn-primary">
				Submit
			</button>
		</div>
	)
}
export default Signup
