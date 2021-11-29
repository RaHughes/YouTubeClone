import React, {Component} from 'react';
import axios from 'axios';
import Replies from '../Replies/Replies';
import CommentsDisplay from '../CommentsDisplay/CommentsDisplay';



class Comments extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            comments: [],
            videoId: '',
            comment: ''
        }
    }

    componentDidMount(){
        this.getComments()
        if(this.state.videoId === '') {
            this.getComments()
        } 
    }

    handleChange = (event) => {
        this.setState({
            comment: event.target.value
        })
    }

    getComments = async() => {
        let response = await axios.get('http://127.0.0.1:8000/comments/')
        let comments = response.data
        let filteredComments = []
        comments.forEach(comment => {
            if(comment.videoId === this.props.videoId) {
                filteredComments.push(comment)
            }
        })
        this.setState({
            videoId: this.props.videoId,
            comments: filteredComments
        })
    }

    handleSubmit = async(event) => {
        event.preventDefault()
        let comment = {
            videoId: this.props.videoId,
            likes: 0,
            dislikes: 0,
            comment: this.state.comment
        }
        this.setState({
            comments: [...this.state.comments, comment]
        })
        await axios.post("http://127.0.0.1:8000/comments/", comment)
    }

    increment = async(id, name) => {
        let newArr = this.state.comments
        let value;
        newArr.forEach(comment => {
            if(comment.id === id) {
                comment[name] += 1
                value = comment[name]
            }
        })
        this.setState({
            comments: newArr
        })
    await axios.patch(`http://127.0.0.1:8000/comments/${id}/`, { [name]: value })
 }

 render() { 
    return (
        <div>
            <form onSubmit={this.handleSubmit}>
                <input name="comment" onChange={this.handleChange} value={this.state.comment}></input>
                <button type="submit">Post Comment</button>
            </form>
            <div>
                <CommentsDisplay comments={this.props.comments} videoId={this.props.videoId}/>
            </div>
        </div>
    );
}
}


export default Comments;
