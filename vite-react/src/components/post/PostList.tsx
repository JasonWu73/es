import classes from './PostList.module.scss';
import {Post} from "../../model/post";
import Button from "../ui/Button";

interface Props {
    posts: Post[];
    onFetch: () => void;
}

export default function PostList({posts, onFetch}: Props) {
    function handleFetchPostsClick() {
        onFetch();
    }

    return (
        <div className={classes.posts}>
            <div>
                <Button onClick={handleFetchPostsClick}>Fetch Posts</Button>
            </div>
            <ul>
                {posts.map(post => <PostItem key={post.id} post={post}/>)}
            </ul>
        </div>
    );
};

function PostItem({post}: { post: Post }) {
    return (
        <li>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
        </li>
    );
}
