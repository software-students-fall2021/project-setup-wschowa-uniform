import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import { Container } from "react-bootstrap"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"

import Login from "./components/Login"
import Signup from "./components/Signup"
import NewPost from "./components/NewPost"
import DetailedPost from "./components/DetailedPost";
import Header from "./components/Header";
import Profile from "./components/Profile"
import EditProfile from "./componenets/EditProfile"


function App() {
  return (
      <div>
        <Header/>
        <Router>
          <Container fluid="md">
            <Switch>
              <Route path="/login">
                <Login/>
              </Route>
              <Route path="/signup">
                <Signup/>
              </Route>
              <Route path="/newpost">
                <NewPost/>
              </Route>
              <Route path="/seepost">
                <DetailedPost/>
              </Route>
              <Route path="/profile">
                <Profile />
              </Route>
              <Route path="/editprofile">
                <EditProfile />
              </Route>
            </Switch>
          </Container>
        </Router>
      </div>
  )
}

export default App
