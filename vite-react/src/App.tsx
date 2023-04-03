import './App.scss';
import PostList from "./components/posts/PostList";
import {useEffect, useState} from "react";
import {Post} from "./model/post";
import {useHttp} from "./hooks/use-http";

export default function App() {
    const {loading, error, sendRequest} = useHttp();
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        // noinspection JSIgnoredPromiseFromCall
        sendRequest({
            method: 'get',
            url: 'https://jsonplaceholder.typicode.com/posts'
        }, setPosts);
    }, []);

    return (
        <div className="app">
            {loading && <p>Loading...</p>}
            {!loading && error && <p>{error}</p>}
            {!loading && !error && <PostList posts={posts}/>}
        </div>
    );
};
