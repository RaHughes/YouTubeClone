import React, { Component } from 'react'; 
import axios from 'axios';
import SearchBar from './SearchBar/SearchBar';
import key from './key'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            replies: [],
            videoId: '',
            videos: []
        }
    }


componentDidMount(){
    this.getVideo()
}    

async  getVideo(){
    let response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=7lCDEYXw3mM&key=${key}&part=snippet,contentDetails,statistics,status`)
    this.setState({
        videoId: response.data.items[0].id
    })
}

async  getComments(){
    let response = await axios.get('http://127.0.0.1:8000/comments/')
    console.log(response.data)
} 

    getSearch = async(search) => {
    let response = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&key=${key}&q=${search}`)
    console.log(response.data)
    this.setState({
        videos: response.data.items,
        videoId: response.data.items[0].id.videoId
    })

}
    render(){
    return(
        <div>
            <SearchBar startSearch={this.getSearch}/>
            <h1>YouTube Clone</h1>
            <iframe id="existing-iframe-example"
            width="640" height="360"
            src={`https://www.youtube.com/embed/${this.state.videoId}`}
            frameBorder="0"></iframe>
        </div>
        )
    }

}

export default App; 