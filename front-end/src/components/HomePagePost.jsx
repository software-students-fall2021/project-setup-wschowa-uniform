
import "./HomePagePost.css"
function HomePagePost() {
  return (
    <div className="post_container">
        <div className="post_content">
            <div className="profile_pic_wrapper">
            <img src="" className="profile_pic" ></img>
            </div>
                <div className="playlist_title">
                    Playlist Name
                </div>
                
                <div className="playlist_username">
                    posted by User
                </div>

                <div className="playlist_embed">
                <iframe className="playlist_iframe" src="https://open.spotify.com/embed/playlist/37i9dQZF1DWWjGdmeTyeJ6" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
                </div>
        </div>
    </div>
);
}
export default HomePagePost