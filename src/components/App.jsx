import React, { Component } from 'react'; 
import axios from 'axios';
import SearchBar from './SearchBar/SearchBar';
import key from './key'
import SideBar from './SideBar/SideBar';
import Comments from './Comments/Comments';



class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videoId: '',
            video: '',
            videos: [],
            comments: []
        }
    }


    componentDidMount(){
        this.getVideo()
        this.getComments()
    }    

    async  getVideo(){
        let response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=7lCDEYXw3mM&key=${key}&part=snippet,contentDetails,statistics,status`)
        this.setState({
            videoId: response.data.items[0].id,
            video: response.data.items[0]
        })
    }

    getSearch = async(search) => {
    let response = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&key=${key}&q=${search}`)
    this.setState({
        videos: response.data.items,
        videoId: response.data.items[0].id.videoId,
        video:  response.data.items[0]
    })
    this.getComments()
}

    async getComments() {
        console.log('Im working')
        let response = await axios.get('http://127.0.0.1:8000/comments/')
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

    render(){
    let title = 'Loading'
    let description ='Loading'
    if(this.state.video !== '') {
        title = this.state.video.snippet.title
        description = this.state.video.snippet.description
    }

    return(
        <div>
            <SearchBar startSearch={this.getSearch}/>
            <h1>YouTube Clone</h1>
            <div className="row">
                <div className="col-8">
                    <h2>{title}</h2>
                    <iframe id="existing-iframe-example"
                    width="100%" height="600px"
                    src={`https://www.youtube.com/embed/${this.state.videoId}`}
                    frameBorder="0"></iframe>
                    <h4>{description}</h4>
                    {<Comments videoId={this.state.videoId} comments={this.state.comments}/>}
                </div>
                <div className="col-4 d-flex justify-content-end" >
                    <SideBar videos={this.state.videos}/>
                </div>
            </div>
        </div>
        )
    }
}

export default App; 