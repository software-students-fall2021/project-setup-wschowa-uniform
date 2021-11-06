import React from "react"
import Form from "react-bootstrap/Form"
import { BrowserRouter as Link } from "react-router-dom"

export const EditProfile = (props) => {
	console.log({ props })

	return (
		<div>
			<Form>
				<Form.Group className="mb-3" controlId="formUserName">
					<Form.Label>User Name</Form.Label>
					<Form.Control type="name" placeholder="Enter Name" />
				</Form.Group>

				<Form.Group className="mb-3" controlId="formAge">
					<Form.Label>Age</Form.Label>
					<Form.Control type="age" placeholder="Enter Age" />
				</Form.Group>

				<Form.Group className="mb-3" controlId="formGender">
					<Form.Label>Gender</Form.Label>
					<Form.Control type="gender" placeholder="Enter Gender" />
				</Form.Group>

				<Form.Group className="mb-3" controlId="formDescription">
					<Form.Label>Description</Form.Label>
					<Form.Control type="desc" placeholder="Enter Description" />
				</Form.Group>

				<Link
					to={{
						pathname: "./Header",
						state: {
							name: "name",
							age: "age",
							gender: "gender",
							desc: "desc",
						},
					}}
				>
					<button>Submit</button>
				</Link>
			</Form>
		</div>
	)
}

export default EditProfile
