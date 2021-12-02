import React, {useEffect, useState} from 'react';
import Comments from "./Comments"
import {Card, Avatar, Comment, Button, Form, Input} from 'antd';
import {HeartOutlined, CommentOutlined, SendOutlined} from '@ant-design/icons';
import "./DetailedPost.css"
import { json } from 'body-parser';


function DetailedPost(props) {

    const [comment, setComment] = useState('')
    const [comments, setComments] = useState([])

    let data;

    const onSubmit = async() => {

        console.log(comment)

        const new_comment = {
            content : comment,
            user : localStorage.getItem("username"),
            post : props.details.name
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
            body : JSON.stringify({"username":user}),
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

    return (
        <div className="detailed-post-page">
            <Card
                title={<h2 className="playlist-name">{props.details.name}</h2>}
                cover={<div className="detailed-post-cover">
                    <div className="detailed-post-music-list">
                        <h2>Song 1: {props.details.music1}</h2>
                        <p>by artist: </p>
                        <br />
                        <h2>Song 2: {props.details.music2}</h2>
                        <p>by artist: </p>
                    </div>
                    <img className="detailed-post-album"
                         src="https://picsum.photos/300/200"/>
                </div>
                    }
            >

                <Card.Grid className="detailed-post-response" hoverable={false}>
                    <span className="detailed-post-like">
                        <Button type="text"
                                icon={<HeartOutlined className="detailed-post-like-icon"/>}/>
                        </span>
                    <span className="detailed-post-com">
                        <Button type="text"
                                icon={<CommentOutlined className="detailed-post-com-icon"/>}/>
                    </span>
                    <span className="detailed-post-send">
                        <Button type="text"
                                icon={<SendOutlined className="detailed-post-send-icon"/>}/>
                    </span>
                </Card.Grid>

                <Card.Grid className="detailed-post-comments" hoverable={false}>
                    <Comment
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
                    <div>{comments.map((each_comment)=>(
                                 <Comments comment = {each_comment}  />

                    ))}</div>
                </Card.Grid>
            </Card>
        </div>
    )

}

export default DetailedPost;