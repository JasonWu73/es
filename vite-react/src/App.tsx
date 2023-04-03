import './App.scss';
import PostList from "./components/posts/PostList";
import {useEffect, useState} from "react";
import axios from "axios";

export default function App() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios({
            method: 'get',
            url: 'https://jsonplaceholder.typicode.com/posts'
        }).then(({data}) => setPosts(data));
    }, []);

    return (
        <div className="app">
            <PostList posts={posts}/>
        </div>
    );
};
