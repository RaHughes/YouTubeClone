import React from 'react'; 
import axios from 'axios';
import './SideBar.css'

const SideBar = (props) => {



    if(props.videos === []){
        return (
            <p>No Video Found</p>
        )
    }
    else{
        return(<div>
            {props.videos.map(video => {
                return <form className="videos" key={Math.random()} onSubmit={() => props.selectVideo(video.id.videoId, video)}>
                <button type="submit">Select Video</button>
                <iframe width="300" height="140" src={`https://www.youtube.com/embed/${video.id.videoId}`}>
                </iframe>
                </form>
            })}
            </div>
        )
    }
}

export default SideBar;