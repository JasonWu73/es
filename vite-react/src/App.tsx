import './App.scss';
import AddPost from "./components/post/AddPost";
import PostList from "./components/post/PostList";
import {Post} from "./model/post";
import {useEffect, useState} from "react";
import {useHttp} from "./hooks/use-http";

export default function App() {
    const [posts, setPosts] = useState<Post[]>([]);
    const {loading, error, sendRequest} = useHttp();

    useEffect(() => {
        sendRequest({
            method: 'get',
            url: 'https://jsonplaceholder.typicode.com/posts'
        }, setPosts).then();
    }, []);

    async function handleAddPost(addedPost: Post) {
        setPosts(prevPosts => [addedPost, ...prevPosts]);
    }

    async function handleFetchPost() {
        await sendRequest({
            method: 'get',
            url: 'https://jsonplaceholder.typicode.com/posts'
        }, setPosts);
    }

    return (
        <div className="app">
            <AddPost onAdd={handleAddPost}/>
            {loading && <p>Loading...</p>}
            {!loading && (error ? <p>{error}</p> : <PostList onFetch={handleFetchPost} posts={posts}/>)}
        </div>
    );
};
