import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import { Container } from "react-bootstrap"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"

import Login from "./components/Login"
import Signup from "./components/Signup"
import NewPost from "./components/NewPost"
import Header from "./components/Header"
import Profile from "./components/Profile"
import Home from "./components/Home"
import SeePost from "./components/SeePost"
import Logout from "./components/Logout"
// import Protected from "./components/Protected"

function App() {
	return (
		<div>
			<div id="header">
				<Header />
			</div>

			<Router>
				<Container fluid="md">
					<Switch>
						<Route path="/" exact>
							<Home />
						</Route>
						<Route path="/login">
							<Login />
						</Route>
						{/* this is for testing */}
						{/* <Route path="/protected">
							<Protected />
						</Route> */}
						<Route path="/logout">
							<Logout />
						</Route>
						<Route path="/signup">
							<Signup />
						</Route>
						<Route path="/newpost">
							<NewPost />
						</Route>
						<Route
							path="/seepost/:parameter1"
							render={(props) => <SeePost {...props} />}
						/>
						<Route path="/profile">
							<Profile />
						</Route>
					</Switch>
				</Container>
			</Router>
		</div>
	)
}

export default App
