import "./Signup.css"
import { Image, Button } from "react-bootstrap"
function Signup() {
  return (
    <div className="signup_body">
      <Image
        className="signup_image"
        src="https://picsum.photos/100/150"
        alt="profile picture"
        roundedCircle
      />
      <div>
        <input
          className="signup_input"
          type="text"
          placeholder="Username"
        ></input>
        <input
          className="signup_input"
          type="password"
          placeholder="Password"
        ></input>
        <input
          className="signup_input"
          type="password"
          placeholder="Re-enter password"
        ></input>
        <input
          className="signup_input"
          type="text"
          placeholder="Birthday: MM/DD/YYYY"
        ></input>
        <input
          className="signup_input"
          type="text"
          placeholder="Gender H/F"
        ></input>
        <textarea
          className="signup_input"
          placeholder="Maybe you want to introduce yourself here..."
          rows="4"
          cols="50"
        ></textarea>
      </div>
      <Button className="login_button" variant="outline-primary" href="/">
        Done
      </Button>{" "}
    </div>
  )
}
export default Signup
