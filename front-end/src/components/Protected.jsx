import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import axios from "axios"
// The component is only for testing
const Protected = (props) => {
	const history = useHistory()
	const jwtToken = localStorage.getItem("token") // the JWT token, if we have already received one and stored it in localStorage
	console.log(`JWT token: ${jwtToken}`) // debugging

	const [response, setResponse] = useState({}) // we expect the server to send us a simple object in this case
	const [isLoggedIn, setIsLoggedIn] = useState(jwtToken && true) // if we already have a JWT token in local storage, set this to true, otherwise false

	// try to load the protected data from the server when this component first renders
	useEffect(() => {
		// send the request to the server api, including the Authorization header with our JWT token in it
		axios
			.get(`/protected`, {
				headers: { Authorization: `JWT ${jwtToken}` }, // pass the token, if any, to the server
			})
			.then((res) => {
				setResponse(res.data) // store the response data
			})
			.catch((err) => {
				console.log(
					"The server rejected the request for this protected resource... we probably do not have a valid JWT token."
				)
				setIsLoggedIn(false) // update this state variable, so the component re-renders
			})
	}, []) // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div>
			<p>protected</p>
			<p> {response.message} </p>
		</div>
	)
}

export default Protected
