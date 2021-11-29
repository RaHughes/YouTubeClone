import React, {Component} from 'react';
import axios from 'axios';
import RepliesDisplay from '../RepliesDisplay/RepliesDisplay';



class Replies extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            reply: "",
            replies: []
        }
    }

    componentDidMount(){
        this.getReplies()
    }

    async getReplies(){
        let response = await axios.get(`http://127.0.0.1:8000/replies/`)
        this.setState({
            replies: response.data
        })
    }

    handleSubmit = async(event) => {
        event.preventDefault()
        let reply ={
            commentId: this.props.commentId,
            videoId: this.props.videoId,
            reply: this.state.reply
        }
        this.setState({
            replies: [...this.state.replies, reply]
        })
        await axios.post(`http://127.0.0.1:8000/replies/`, reply)
    }

    handleChange = (event) => {
        this.setState({
            reply: event.target.value
        })
    }

    render() { 
        return ( 
            <form onSubmit={this.handleSubmit}>
                <input onChange={this.handleChange} name="reply"></input>
                <button type="submit">Add Reply</button>
                <RepliesDisplay replies={this.state.replies} commentId={this.props.commentId}/>
            </form>
        );
    }
}

export default Replies;