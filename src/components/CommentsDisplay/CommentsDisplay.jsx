import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Replies from '../Replies/Replies';
import './CommentsDisplay.css'

const CommentsDisplay = (props) => {
    const[comment,SetComment] = useState([])
    const[toggle, SetToggle] = useState()
    console.log(props)

    useEffect(()=>{
        
    },[props.videoId, toggle])

    const increment = async(id, name) => {
        let newArr = props.comments
        let value;
        newArr.forEach(comment => {
            if(comment.id === id) {
                comment[name] += 1
                value = comment[name]
            }
        })
        await axios.patch(`http://127.0.0.1:8000/comments/${id}/`, { [name]: value })
        SetToggle(!toggle)
        SetComment(newArr)
 }

    return(
        <div>
            {props.comments.map(comment => {
                        if(comment.videoId === props.videoId){ 
                            return <div className="comments" key={comment.id}>
                                    <p>{comment.comment}</p>
                                    <button name="likes" onClick={() => increment(comment.id, 'likes')}>👍</button>
                                    {<p>{comment.likes}</p>}
                                    <button name="dislikes" onClick={() => increment(comment.id, 'dislikes')}>👎</button>
                                    {<p>{comment.dislikes}</p>}
                                    <Replies key={comment.id} commentId={comment.id} videoId={props.videoId} />
                                    </div>
                        }
                    })}
        </div>
    )

}

export default CommentsDisplay