import React from 'react';
import axios from 'axios';
import './RepliesDisplay.css'

const RepliesDisplay = (props) => {
    return(
        <div>
            {props.replies.map(reply => {
                if(props.commentId === reply.commentId){
                    return <div className="replies">
                        <p>{reply.reply}</p>
                    </div>
                }
            })}

        </div>
    )
} 

export default RepliesDisplay;