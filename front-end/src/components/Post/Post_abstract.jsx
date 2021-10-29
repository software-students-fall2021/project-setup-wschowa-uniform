import "./Post_abstract.css"
import { Card, ListGroup, ListGroupItem } from "react-bootstrap"
import {useHistory} from "react-router-dom";

function Post_abstract(props) {
	const history = useHistory();
	const redirect = () => {
		history.push(`/seepost/${props.details.id}`);
	}
	return (
		<Card style={{ width: "18rem" }} onClick={redirect}>
			<Card.Body>
				<Card.Title>{props.details.name}</Card.Title>
				<Card.Text>{props.details.description}</Card.Text>
				<ListGroup className="list-group-flush">
					<ListGroupItem>{props.details.music1}</ListGroupItem>
					<ListGroupItem>{props.details.music2}</ListGroupItem>
				</ListGroup>
			</Card.Body>
		</Card>
	)
}
export default Post_abstract
