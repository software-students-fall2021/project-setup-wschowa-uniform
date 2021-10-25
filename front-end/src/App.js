import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import { Container } from "react-bootstrap"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"

import Login from "./components/Login"
import Signup from "./components/Signup"
import NewPost from "./component/NewPost"
import DetailedPost from "./components/DetailedPost";


function App() {
  return (
    <Router>
      <Container fluid="md">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/newpost">
            <NewPost />
          </Route>
          <Route path="/seepost">
            <DetailedPost />
          </Route>
        </Switch>
      </Container>
    </Router>
  )
}

export default App
