import React from 'react'
import "./NewPost.css";

const NewPost = (props) => {
        return(
            <div>
                <h1>Spotify Music Sharing</h1>
                <div className="newPost">
                    <div><input name="playlistName" className="nameInput" type="text" placeholder="Playlist Name Here ..."/></div>
                    <div><input name="playlistLink" className="linkInput" type="url" placeholder="Pasta Playlist Link Here"/></div>
                    <div className = "spotifyPlaylist">spotify showcase will go here</div>
                    <div><input name="caption" className = "captionInput" type="text" placeholder="Write a Caption ..."/></div>
                </div>
                <div className="share">
                    <input name = "share" type="submit" value="share"></input>
                </div>
            </div>
        )
}

export default NewPost


