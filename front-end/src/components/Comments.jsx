import React, { useState, createElement } from "react"
import { Comment, Tooltip, Avatar, Form, Input, Button } from "antd"
import moment from "moment"
import { LikeFilled } from "@ant-design/icons"

function Comments(props) {
	const [likes, setLikes] = useState(0)
	const [action, setAction] = useState(null)

	const like = () => {
		setLikes(likes + 1)
		setAction("liked")
	}

	const reply = () => {
		setAction("reply")
	}

	const actions = [
		<span key="comment-basic-like" onClick={like}>
			Like
		</span>,
		<span key="comment-basic-reply-to">Reply to</span>,
		<span key="comment-basic-share">Share</span>,
		<span key="comment-basic-like-icon" className="comment-like-icon">
			<LikeFilled />
			{likes}
		</span>,
	]

	const name = props.details.user.username
	const content = props.details.content

	return (
		<Comment
			// actions={actions}
			author={<a>{name}</a>}
			avatar={
				<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
			}
			content={<p>{content}</p>}
			// datetime={
			// 	<Tooltip title={moment().format("YYYY-MM-DD HH:mm:ss")}>
			// 		<span>{moment().fromNow()}</span>
			// 	</Tooltip>
			// }
		/>
	)
}

export default Comments
