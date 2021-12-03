import "./Post_abstract.css"
import { Card, ListGroup, ListGroupItem } from "react-bootstrap"
import { useHistory } from "react-router-dom"

function Post_abstract(props) {
	// console.log(props.details.id)
	const history = useHistory()
	const redirect = () => {
		history.push(`/seepost/${props.details._id}`)
	}
	return (
		<Card style={{ width: "30rem" }} onClick={redirect}>
			<Card.Body>
				<Card.Title>{props.details.playlist_name}</Card.Title>
				<Card.Text>{props.details.caption}</Card.Text>
			</Card.Body>
		</Card>
	)
}
export default Post_abstract
