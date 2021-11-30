import "./HomePagePost.css"

function HomePagePost(props) {
	const uri =
		"https://open.spotify.com/embed/playlist/" + props.details.playlist_link
	return (
		<div className="post_container">
			<div className="post_content">
				{/* <div className="profile_pic_wrapper">
            <img src="" className="profile_pic" ></img>
            </div> 
            This is the pic which may be completed later...*/}
				<div className="playlist_title">{props.details.playlist_name}</div>

				<div className="playlist_username">{props.details.user.username}</div>

				<div className="playlist_embed">
					<iframe
						className="playlist_iframe"
						src={uri}
						frameBorder="0"
						allowfullscreen=""
						allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
					></iframe>
				</div>
			</div>
		</div>
	)
}
export default HomePagePost
