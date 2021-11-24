import React, {Component} from 'react';
import axios from 'axios';



class Comments extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            comments: [],
            videoId: '',
            likes: 0,
            dislikes: 0,
            comment: ''
        }
    }

    componentDidMount(){
        this.getComments()
    }

    handleChange = (event) => {
        this.setState({
            comment: event.target.value
        })
    }

    getComments = async() => {
        let response = await axios.get('http://127.0.0.1:8000/comments/')
        this.setState({
            comments: response.data
        })
    }

    handleSubmit = async(event) => {
        event.preventDefault()
        let comment = {
            videoId: this.props.videoId,
            likes: this.state.likes,
            dislikes: this.state.dislikes,
            comment: this.state.comment
        }
        this.setState({
            comments: [...this.state.comments, comment]
        })
        await axios.post("http://127.0.0.1:8000/comments/", comment)
    }

    render() { 
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input name="comment" onChange={this.handleChange} value={this.state.comment}></input>
                    <button type="submit">Post Comment</button>
                </form>
                <div>
                    {this.state.comments.map(comment => {
                        if(comment.videoId === this.props.videoId){ 
                            return <p>{comment.comment}</p>
                        }
                    })}
                </div>
            </div>
        );
    }
}

export default Comments;