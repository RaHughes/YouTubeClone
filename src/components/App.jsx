import React, { Component } from 'react'; 
import axios from 'axios';
import SearchBar from './SearchBar/SearchBar';
import key from './key'
import SideBar from './SideBar/SideBar';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            replies: [],
            videoId: '',
            video: [],
            videos: []
        }
    }


componentDidMount(){
    this.getVideo()
}    

async  getVideo(){
    let response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=7lCDEYXw3mM&key=${key}&part=snippet,contentDetails,statistics,status`)
    console.log(response.data)
    this.setState({
        videoId: response.data.items[0].id,
        video: response.data.items[0]
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
        videoId: response.data.items[0].id.videoId,
        video:  response.data.items[0]
    })
}

    render(){
    return(
        <div>
            <SearchBar startSearch={this.getSearch}/>
            <h1>YouTube Clone</h1>
            <div className="row">
                <div className="col-8">
                   { if(this.state.video === []) {
                        <h2>this.state.video.snippet.title</h2>
                    } else {
                        <h2>Loading Please Wait</h2> 
                    }}
                    <iframe id="existing-iframe-example"
                    width="100%" height="600px"
                    src={`https://www.youtube.com/embed/${this.state.videoId}`}
                    frameBorder="0"></iframe>
                    <h4>{this.state.video.snippet.description}</h4>
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