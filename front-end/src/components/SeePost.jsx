import { React, useEffect, useState } from "react"
import axios from "axios"
import { Button } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import Comments from "./Comments"
import {Card, Avatar, Comment, Form, Input} from 'antd';
import{UserOutlined,RightSquareOutlined} from '@ant-design/icons'
import "./SeePost.css"

function SeePost(props) {
	const [data, setData] = useState({})
	const [user, setUser] = useState({})
	const [ownername, setOwnername] = useState("")
	const [uri, setUri] = useState("")
	const [name, setName] = useState("")
	const [comment, setComment] = useState('')
    const [comments, setComments] = useState([])


    const onSubmit = async() => {

        console.log(comment)

        const new_comment = {
            content : comment,
            user : localStorage.getItem("username"),
            post : name,
            like : 0
        }
        const request = {
            method : 'POST',
            body: JSON.stringify(new_comment),
            headers : {
                'Content-Type': 'application/json'
            }
        }

        try{
             fetch('/comment',request)
                .then(res=>res.json())
                .then(alert(`you have succesfully made a comment in the name of ${localStorage.getItem("username")}`))
        }
        catch(e){
            console.error(e.message)
        }

        // const {newComment} = values;
        // temporary there is no database to record the new comment
    }

    const fetchComment = async() =>{
        const user = localStorage.getItem("username");
        const request = {
            method : 'POST',
            body : JSON.stringify({"username":user,
                                    "post":name
                                }),
            headers : {
                'Content-Type': 'application/json'
            }
        }

        const res = await fetch('/comment/user',request)
        const comments = await res.json()
        return comments;
    }

    useEffect(()=>{
        const getComments = async() =>{
            const commentsLIST = await fetchComment();
            setComments(commentsLIST)
            console.log(comments)
        }
        getComments()
    }, [comments])


	let history = useHistory()
	const { parameter1 } = props.match.params
	const BASE_URL = "/seepost?id=" + parameter1
	const username = localStorage.getItem("username")
	const fetchdata = async () => {
		axios
			.get(BASE_URL)
			.then((res) => {
				setData(res.data)
				setUri(
					"https://open.spotify.com/embed/playlist/" + res.data.playlist_link
				)
				setUser(res.data.user)
				// setComments(res.data.comments)
				setName(res.data.playlist_name)
				setOwnername(res.data.user.username)
			})
			.catch((e) => {
				console.log(e.response)
			})
	}
	useEffect(async () => {
		fetchdata()
	}, [])

	const handleRoute = () => {
		history.push("/")
	}

	return (
		<div className="container">
            <Card>
            <div className="owner-info">
				<h2 className="title"><RightSquareOutlined />Title: {name}</h2>
				<h3 className="owner"><UserOutlined />Creater: {ownername}</h3>
			</div>
			<div id="playlist_embed" title="spotify">
				<iframe
					title="spotify embed"
					height="400"
					src={uri}
					frameBorder="0"
					allow="encrypted-media;"
				></iframe>
			</div>        
            </Card>

			<Card.Grid className="detailed-post-comments" hoverable={false}>
                    <Comment className="new_comment"
                        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo"/>}
                        content={<Form className="detailed-post-leave-comment" >
                            <Form.Item name="new-comment" >
                                <Input
                                    placeholder="Leave your comment..."
                                    onChange = {(e)=>setComment(e.target.value)}
                                />
                                <Button type="primary" htmlType="submit" onClick={onSubmit}>Submit</Button>
                            </Form.Item>
                        </Form>}
                    />
                    <div className="old_comment">{comments.map((each_comment)=>(
                                 <Comments comment = {each_comment}  />

                    ))}</div>
                </Card.Grid>
		</div>
	)
}

export default SeePost
