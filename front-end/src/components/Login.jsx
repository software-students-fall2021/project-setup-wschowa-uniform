import { Button, Image, Alert } from "react-bootstrap"
import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import axios from "axios"
import "./Login.css"
import logo from "../image/Logo.jpg"
function Login() {
	let history = useHistory()
	// create state variables to hold username and password
	const [response, setResponse] = useState({}) // the API will return an object with a JWT token, if the user logs in successfully
	const [alert, setAlert] = useState("")
	const [showAlert, setShowAlert] = useState(false)
	// if the user's logged-in status changes, save the token we receive from the server

	useEffect(() => {
		// if the user is logged-in, save the token to local storage
		if (response.success && response.token) {
			console.log(`User successfully logged in: ${response.username}`)
			localStorage.setItem("token", response.token) // store the token into localStorage
			history.push("/")
		}
	}, [response])

	const handleSubmit = async (e) => {
		// prevent the HTML form from actually submitting... we use React's javascript code instead
		e.preventDefault()
		try {
			// create an object with the data we want to send to the server
			const requestData = {
				username: e.target.username.value, // gets the value of the field in the submitted form with name='username'
				password: e.target.password.value, // gets the value of the field in the submitted form with name='password',
			}
			console.log(requestData)
			// send a POST request with the data to the server api to authenticate
			const response = await axios.post(`/login`, requestData)
			// store the response data into the data state variable
			console.log(`Server response: ${JSON.stringify(response.data, null, 0)}`)
			setShowAlert(false)
			setResponse(response.data)
			history.push("login")
		} catch (err) {
			// request failed... user entered invalid credentials
			setShowAlert(true)
			setAlert("You entered invalid credentials.")
		}
	}
	return (
		<div className="login">
			<Alert
				variant="danger"
				onClose={() => setShowAlert(false)}
				show={showAlert}
				dismissible
			>
				<p>{alert}</p>
			</Alert>
			<Image className="login_logo" src={logo} alt="Logo" roundedCircle />
			<section className="login_content">
				<form onSubmit={handleSubmit}>
					<label></label>
					<input
						className="login_input"
						type="text"
						name="username"
						placeholder="username"
					/>
					<br />
					<label></label>
					<input
						className="login_input"
						type="password"
						name="password"
						placeholder="password"
					/>
					<br />
					<Button
						className="login_button"
						type="submit"
						variant="outline-primary"
					>
						Login
					</Button>{" "}
				</form>
			</section>
			<div className="login_signup">
				<a href="/signup">Don't have an account?</a>
			</div>
		</div>
	)
}
export default Login
