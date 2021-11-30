import "./Home.css"
import SearchBar from "./SearchBar"
import HomePagePost from "./HomePagePost"
import axios from "axios"
import { useState, useEffect, React } from "react"
function Home() {
	const [posts, setPosts] = useState([])
	useEffect(() => {
		async function fetchPosts() {
			console.log("fetch")
			//fetch the past posts data
			const result = await axios("/home")
			setPosts(result.data)
			console.log(posts)
		}
		fetchPosts()
	}, [])
	return (
		<div>
			{/* <SearchBar/> */}
			<section>
				{posts.map((item) => (
					<HomePagePost key={item.id} details={item} />
				))}
			</section>
		</div>
	)
}
export default Home
