import './App.scss';
import AddPost from "./components/post/AddPost";
import PostList from "./components/post/PostList";
import {Post} from "./model/post";
import {useEffect, useState} from "react";
import axios, {AxiosError} from "axios";

export default function App() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        setLoading(true);
        setError('');
        getPosts().then(([posts, err]) => {
            setLoading(false);
            if (err) {
                setError(err);
                return;
            }
            setPosts(posts!);
        })
    }, []);

    function handleAddPost(postToAdd: Post) {
        console.log('add post', postToAdd);
    }

    function handleFetchPost() {
        console.log('fetch posts');
    }

    return (
        <div className="app">
            <AddPost onAdd={handleAddPost}/>
            {loading && <p>Loading...</p>}
            {!loading && (error ? <p>{error}</p> : <PostList onFetch={handleFetchPost} posts={posts}/>)}
        </div>
    );
};

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
