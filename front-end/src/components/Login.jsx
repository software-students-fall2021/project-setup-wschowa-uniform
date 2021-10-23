import { Button, Image } from "react-bootstrap"
import "./Login.css"
import logo from "../image/logo.jpg"
function Login() {
  return (
    <div className="login">
      <Image className="login_logo" src={logo} alt="Logo" roundedCircle />
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
