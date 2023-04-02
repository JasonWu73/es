import classes from './AddPost.module.scss';
import Button from "../ui/Button";
import {Post} from "../../model/post";
import {FormEvent, useRef} from "react";

interface Props {
    onAdd: (postToAdd: Post) => void;
}

export default function AddPost({onAdd}: Props) {
    const titleRef = useRef<HTMLInputElement>(null);
    const bodyRef = useRef<HTMLInputElement>(null);

    function handleFormSubmit(event: FormEvent) {
        event.preventDefault();
        const title = titleRef.current!.value.trim();
        const body = bodyRef.current!.value.trim();
        const userId = 101;
        onAdd({title, body, userId});
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
