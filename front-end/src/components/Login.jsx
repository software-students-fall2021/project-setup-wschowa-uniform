import { Button } from "react-bootstrap"
import "./Login.css"
function Login() {
  return (
    <div className="login">
      <h1>Log in</h1>
      <div className="login_body">
        <div>
          <input
            className="login_input"
            type="text"
            placeholder="Username"
          ></input>
          <input
            className="login_input"
            type="password"
            placeholder="Password"
          ></input>
        </div>
        <Button className="login_button" variant="outline-primary" href="/">
          Log in
        </Button>{" "}
        <div>
          <a className="login_signup" href="/signup">
            create an account
          </a>
        </div>
      </div>
    </div>
  )
}
export default Login
