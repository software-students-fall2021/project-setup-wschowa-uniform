import React, {useEffect, useState} from 'react';
import Comments from "./Comments"
import {Card, Avatar, Comment, Button, Form, Input} from 'antd';
import {HeartOutlined, CommentOutlined, SendOutlined} from '@ant-design/icons';
import "./DetailedPost.css"

function DetailedPost(props) {

    const onFinish = (values) => {
        console.log("the comment is:", values);
        const {newComment} = values;
        // temporary there is no database to record the new comment
    }

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
                        content={<Form className="detailed-post-leave-comment" onFinish={onFinish}>
                            <Form.Item name="new-comment">
                                <Input
                                    placeholder="Leave your comment..."
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">Submit</Button>
                            </Form.Item>
                        </Form>}
                    />
                    <Comments />
                    <Comments />
                </Card.Grid>
            </Card>
        </div>
    )

}

export default DetailedPost;