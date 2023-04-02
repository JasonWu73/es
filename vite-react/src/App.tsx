import './App.scss';
import AddPost from "./components/post/AddPost";
import PostList from "./components/post/PostList";
import {Post} from "./model/post";
import {useEffect, useState} from "react";
import axios, {AxiosError} from "axios";
import useHttp from "./hooks/use-http";

export default function App() {
    const [posts, setPosts] = useState<Post[]>([]);
    const {loading, error, sendRequest} = useHttp({
        method: 'get',
        url: 'https://jsonplaceholder.typicode.com/posts'
    });

    useEffect(() => {
        sendRequest().then(result => {
            result && setPosts(result);
        });
    }, []);

    function handleAddPost(postToAdd: Post) {
        addPost(postToAdd).then(([addedPost, err]) => {
            if (err) {
                console.log(err)
                return;
            }
            setPosts(prevPosts => [addedPost!, ...prevPosts]);
        });
    }

    function handleFetchPost() {
        sendRequest().then(result => {
            result && setPosts(result);
        });
    }

    return (
        <div className="app">
            <AddPost onAdd={handleAddPost}/>
            {loading && <p>Loading...</p>}
            {!loading && (error ? <p>{error}</p> : <PostList onFetch={handleFetchPost} posts={posts}/>)}
        </div>
    );
};

async function addPost(post: Post): Promise<[Post | null, string | null]> {
    try {
        const {data: addedPost} = await axios({
            method: 'post',
            url: 'https://jsonplaceholder.typicode.com/posts',
            data: post
        });
        return [{...addedPost, id: Math.random().toString()}, null];
    } catch (err) {
        return [null, (err as AxiosError).message]
    }
}

async function getPosts(): Promise<[Post[] | null, string | null]> {
    try {
        const {data: posts} = await axios({
            method: 'get',
            url: 'https://jsonplaceholder.typicode.com/posts'
        });
        return [posts, null];
    } catch (err) {
        return [null, (err as AxiosError).message]
    }
}
