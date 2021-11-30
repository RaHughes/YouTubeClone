import React from 'react'; 
import axios from 'axios';

const SideBar = (props) => {



    if(props.videos === []){
        return (
            <p>No Video Found</p>
        )
    }
    else{
        return(<div>
            {props.videos.map(video => {
                return <form key={Math.random()} onSubmit={() => props.selectVideo(video.id.videoId, video)}> 
                <iframe width="400" height="320" src={`https://www.youtube.com/embed/${video.id.videoId}`}>
                </iframe>
                <button type="submit">Select Video</button>
                </form>
            })}
            </div>
        )
    }
}

export default SideBar;