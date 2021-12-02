import "./HomePagePost.css"
import { useHistory } from "react-router-dom"
function HomePagePost(props) {
	const history = useHistory()
	const data = props.details
	const uri =
		"https://open.spotify.com/embed/playlist/" + props.details.playlist_link
	const seePost = () => {
		history.push(`/seepost/${data._id}`)
	}
	return (
		<div className="post_container" onClick={seePost}>
			<div className="post_content">
				{/* <div className="profile_pic_wrapper">
            <img src="" className="profile_pic" ></img>
            </div> 
            This is the pic which may be completed later...*/}
				<div className="playlist_title">{data.playlist_name}</div>

				<div className="playlist_username">{data.user.username}</div>

				<div className="playlist_embed">
					<iframe
						className="playlist_iframe"
						src={uri}
						frameBorder="0"
						allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
					></iframe>
				</div>
			</div>
		</div>
	)
}
export default HomePagePost
