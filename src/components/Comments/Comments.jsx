import React, {Component} from 'react';
import axios from 'axios';
import CommentsDisplay from '../CommentsDisplay/CommentsDisplay';



class Comments extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            comments: [],
            videoId: '',
            comment: '',
        }
    }

    componentDidMount(){
        this.getComments()
    }

    async getComments() {
        let response = await axios.get('http://127.0.0.1:8000/comments/')
        this.setState({
            videoId: this.props.videoId
        })
        this.filterComments(response.data)
    }

     filterComments(array){
         let filteredComments = []
         array.forEach(comment => {
             if(comment.videoId === this.state.videoId) {
                 console.log(comment)
                filteredComments.push(comment)
             }
        })
         this.setState({
             comments: filteredComments
         })
         console.log(filteredComments)
    }


    handleChange = (event) => {
        this.setState({
            comment: event.target.value
        })
    }

    handleSubmit = async(event) => {
        event.preventDefault()
        let comment = {
            videoId: this.state.videoId,
            likes: 0,
            dislikes: 0,
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
                    <CommentsDisplay comments={this.props.comments} videoId={this.props.videoId}/>
                </div>
            </div>
        );
    }
}

export default Comments;
