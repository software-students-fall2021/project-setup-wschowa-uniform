const { useEffect } = require("react")
const { useHistory } = require("react-router-dom")

const Logout = () => {
	let history = useHistory()
	// when this component loads, log out the user
	useEffect(() => {
		localStorage.removeItem("token")
		history.push("/")
	}, [])

	// navigate the user to the home page after logging them out
	return <></>
}

export default Logout
