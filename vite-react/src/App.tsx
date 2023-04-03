import './App.scss';
import PostList from "./components/posts/PostList";
import {useEffect, useState} from "react";
import axios from "axios";

export default function App() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // noinspection JSIgnoredPromiseFromCall
        getPosts();

        async function getPosts() {
            const {data: posts} = await axios({
                method: 'get',
                url: 'https://jsonplaceholder.typicode.com/posts'
            });
            setPosts(posts);
        }
    }, []);

    return (
        <div className="app">
            <PostList posts={posts}/>
        </div>
    );
};
