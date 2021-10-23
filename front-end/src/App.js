import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import { Container } from "react-bootstrap"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"

import Login from "./components/Login"
import Signup from "./components/Signup"
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
        </Switch>
      </Container>
    </Router>
  )
}

export default App
