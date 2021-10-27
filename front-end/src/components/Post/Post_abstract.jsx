import "./Post_abstract.css"
import { Card, ListGroup, ListGroupItem } from "react-bootstrap"

function Post_abstract(props) {
	return (
		<Card style={{ width: "18rem" }}>
			<Card.Body>
				<Card.Title>{props.details.name}</Card.Title>
				<Card.Text>{props.details.description}</Card.Text>
				<ListGroup className="list-group-flush">
					<ListGroupItem>{props.details.music1}</ListGroupItem>
					<ListGroupItem>{props.details.music2}</ListGroupItem>
				</ListGroup>
				<Card.Link href="/seepost">See Post</Card.Link>
			</Card.Body>
		</Card>
	)
}
export default Post_abstract
