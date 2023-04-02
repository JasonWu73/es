import classes from './AddPost.module.scss';
import Button from "../ui/Button";
import {Post} from "../../model/post";
import {FormEvent, useRef} from "react";
import {useHttp} from "../../hooks/use-http";

interface Props {
    onAdd: (addedPost: Post) => void;
}

export default function AddPost({onAdd}: Props) {
    const titleRef = useRef<HTMLInputElement>(null);
    const bodyRef = useRef<HTMLInputElement>(null);
    const {sendRequest} = useHttp();

    async function handleFormSubmit(event: FormEvent) {
        event.preventDefault();
        const title = titleRef.current!.value.trim();
        const body = bodyRef.current!.value.trim();
        const userId = 1000;
        const postToAdd = {title, body, userId};

        await sendRequest({
            method: 'post',
            url: 'https://jsonplaceholder.typicode.com/posts',
            params: postToAdd
        }, addPost.bind(null, postToAdd));
    }

    function addPost(addedPost: Post, {id: postId}: { id: number }) {
        onAdd({
            ...addedPost,
            id: postId + Math.random()
        });
    }

    return (
        <form onSubmit={handleFormSubmit} className={classes.form}>
            <div>
                <label htmlFor="title">Title</label>
                <input ref={titleRef} type="text" id="title"/>
            </div>
            <div>
                <label htmlFor="body">Body</label>
                <input ref={bodyRef} type="text" id="body"/>
            </div>
            <div>
                <Button>Add Post</Button>
            </div>
        </form>
    );
}
