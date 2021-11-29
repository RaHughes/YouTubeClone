import React from 'react';
import axios from 'axios';

const RepliesDisplay = (props) => {
    return(
        <div>
            {props.replies.map(reply => {
                if(props.commentId === reply.commentId){
                    return <div>
                        <p>{reply.reply}</p>
                    </div>
                }
            })}

        </div>
    )
} 

export default RepliesDisplay;