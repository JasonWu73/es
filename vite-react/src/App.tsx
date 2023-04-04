import './App.scss';
import PostList from "./components/posts/PostList";
import {useEffect, useState} from "react";
import {Post} from "./model/post";
import {useHttp} from "./hooks/use-http";
import Card from './components/ui/card/Card';
import Button from "./components/ui/button/Button";
import SimpleInput from "./components/form/SimpleInput";

export default function App() {
    const {loading, error, sendRequest} = useHttp();
    const [posts, setPosts] = useState<Post[]>([]);
    const [showInput, setShowInput] = useState(true);

    useEffect(() => {
        // noinspection JSIgnoredPromiseFromCall
        sendRequest({
            method: 'get',
            url: 'https://jsonplaceholder.typicode.com/posts'
        }, setPosts);
    }, []);

    function handleClick() {
        setShowInput(prevShowInput => !prevShowInput);
    }

    return (
        <div className="app">
            <Button onClick={handleClick}>My Button</Button>
            {showInput && <SimpleInput/>}
            <Card>
                {loading && <p>Loading...</p>}
                {!loading && error && <p>{error}</p>}
                {!loading && !error && <PostList posts={posts}/>}
            </Card>
        </div>
    );
};
