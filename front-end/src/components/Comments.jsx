import React, { useState, createElement } from 'react';
import {Comment, Tooltip, Avatar, Form, Input, Button} from 'antd';
import moment from 'moment';
import { LikeFilled } from '@ant-design/icons';

function Comments({comment}) {
    const [likes, setLikes] = useState(0);
    const [action, setAction] = useState(null);

    const like = () => {
        setLikes(likes + 1);
        setAction('liked');
    };

    const reply = () => {
        setAction('reply');
    }

    const actions = [
        <span key="comment-basic-like" onClick={like}>Like</span>,
        <span key="comment-basic-share">Share</span>,
        <span key="comment-basic-like-icon" className="comment-like-icon"><LikeFilled/>{likes}</span>
    ];

    return (

        <Comment
            actions={actions}
            author={<a>{comment.user}</a>}
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
            content={
                <p>
                    {comment.content}
                </p>
            }
            datetime={
                <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                    <span>{moment().fromNow()}</span>
                </Tooltip>
            }
        />

    );

}

export default Comments
