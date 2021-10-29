import {useEffect, useState} from "react";
import axios from "axios";
import DetailedPost from "./DetailedPost";


function SeePost(props) {
    const [data, setData] = useState([])

    useEffect(() => {
        async function fetchData() {
            const result = await axios(
                "https://my.api.mockaroo.com/post.json?key=99391580"
            )
            setData(result.data)
        }
        fetchData()
    }, [])

    const {parameter1} = props.match.params;

    return (
        <div>
        {
            data.map((item) => {
                if(item.id == parameter1) {
                    return (<DetailedPost className="post" key={item.id} details={item} />)
                }
                return null;
            })
        }
        </div>
    )
}

export default SeePost;